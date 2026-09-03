from http import HTTPStatus
from typing import Annotated

import asyncpg
from fastapi import APIRouter, Depends, HTTPException

from fastapi import BackgroundTasks

from api.auxiliares import gerar_codigo_unico
from api.database import get_db
from api.services.notificacao import notificar_rastreio
from api.schemas.pedidos_schemas import (
    FilterPedidos,
    Message,
    PedidosList,
    PedidosResponseSchema,
    PedidosSchema,
    PedidosUpdate,
)
from api.security import get_current_admin, get_current_user

database_loja = Annotated[asyncpg.Connection, Depends(get_db)]
CurrentUser = Annotated[dict, Depends(get_current_user)]
CurrentAdmin = Annotated[dict, Depends(get_current_admin)]


router = APIRouter(prefix='/pedidos', tags=['pedidos'])


@router.post('/', status_code=HTTPStatus.CREATED, response_model=PedidosResponseSchema)
async def create_pedido(pedido: PedidosSchema, db: database_loja, current_user: CurrentUser):

    id_pedido = await gerar_codigo_unico(db)

    try:
        entrega_tipo = getattr(pedido, 'entrega_tipo', 'Correios') or 'Correios'
        insert_query = """
        INSERT INTO pedidos (cliente_id, status, endereco_entrega, id_pedido, valor_total, entrega_tipo)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id, cliente_id, status, endereco_entrega, id_pedido, valor_total, codigo_rastreio, data_envio, transportadora, entrega_tipo
        """

        result = await db.fetchrow(insert_query, pedido.cliente_id, pedido.status, pedido.endereco_entrega, id_pedido, pedido.valor_total, entrega_tipo)

    except asyncpg.UniqueViolationError:
        raise HTTPException(status_code=HTTPStatus.CONFLICT, detail='Já existe um pedido em processamento, aguarde um pouco.')

    pedido_resp = dict(result) if result else {}

    # Sem pagamento confirmado, NAO retorna o protocolo do pedido
    # (nem o frontend deve exibir mensagem de sucesso antes da aprovacao).
    if pedido_resp.get('status', '').lower() == 'pendente':
        pedido_resp.pop('id_pedido', None)

    return pedido_resp


@router.get('/', response_model=PedidosList)
async def get_pedidos(db: database_loja, filtrar: FilterPedidos = Depends(), cliente_id: int | None = None):
    query = 'SELECT id, cliente_id, status, endereco_entrega, id_pedido, valor_total, codigo_rastreio, data_envio, transportadora, entrega_tipo FROM pedidos WHERE 1=1'

    params = []
    params_index = 1

    target_cliente_id = cliente_id or getattr(filtrar, 'cliente_id', None)

    if target_cliente_id:
        query += f' AND cliente_id = ${params_index}'
        params.append(target_cliente_id)
        params_index += 1

    if filtrar.status:
        query += f' AND status ILIKE ${params_index}'
        params.append(f'%{filtrar.status}')
        params_index += 1

    if filtrar.endereco_entrega:
        query += f' AND endereco_entrega ILIKE ${params_index}'
        params.append(f'%{filtrar.endereco_entrega}')
        params_index += 1

    if filtrar.id_pedido:
        query += f' AND id_pedido ILIKE ${params_index}'
        params.append(f'{filtrar.id_pedido}')
        params_index += 1

    if filtrar.valor_total:
        query += f' AND valor_total = ${params_index}'
        params.append(filtrar.valor_total)
        params_index += 1

    query += f' OFFSET ${params_index} LIMIT ${params_index + 1}'

    params.append(filtrar.offset)
    params.append(filtrar.limit)

    result = await db.fetch(query, *params)

    pedidos = [dict(row) for row in result]

    return {'pedidos': pedidos}


@router.get('/meus', response_model=PedidosList)
async def get_meus_pedidos(db: database_loja, current_user: CurrentUser):
    """Lista somente os pedidos associados ao e-mail do usuário autenticado."""
    query = """
        SELECT p.id, p.cliente_id, p.status, p.endereco_entrega, p.id_pedido,
               p.valor_total, p.codigo_rastreio, p.data_envio,
               p.transportadora, p.entrega_tipo
        FROM pedidos p
        INNER JOIN clientes c ON c.id = p.cliente_id
        WHERE LOWER(c.email) = LOWER($1)
        ORDER BY p.id DESC
    """
    pedidos = await db.fetch(query, current_user['username'])
    return {'pedidos': [dict(pedido) for pedido in pedidos]}


@router.patch('/{id_pedido}', response_model=PedidosResponseSchema, status_code=HTTPStatus.OK)
async def update_pedido(
    db: database_loja,
    current_user: CurrentUser,
    pedido: PedidosUpdate,
    id_pedido: str,
    background_tasks: BackgroundTasks,
):
    pedido_db = await db.fetchrow('SELECT id FROM pedidos WHERE id_pedido = $1', id_pedido)

    if not pedido_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Pedido não encontrado, aguarde um instante e tente novamente.',
        )

    update_data = pedido.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail='Nenhum campo inserido na atualização.')

    set_clauses = []
    params = []
    params_index = 1

    for field, value in update_data.items():
        set_clauses.append(f'{field} = ${params_index}')
        params.append(value)
        params_index += 1

    # Se enviar codigo_rastreio, marca como Enviado e registra data_envio
    if 'codigo_rastreio' in update_data and update_data['codigo_rastreio']:
        if 'status' not in update_data:
            set_clauses.append(f'status = ${params_index}')
            params.append('Enviado')
            params_index += 1
        set_clauses.append('data_envio = NOW()')

    params.append(id_pedido)

    set_query = ','.join(set_clauses)
    query = f"""
        UPDATE pedidos
        SET {set_query}
        WHERE id_pedido = ${params_index}
        RETURNING id, cliente_id, status, endereco_entrega, id_pedido, valor_total, codigo_rastreio, data_envio, transportadora, entrega_tipo
    """

    result = await db.fetchrow(query, *params)

    if result is None:
        raise HTTPException(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            detail='Falha ao atualizar o produto.',
        )

    pedido_dict = dict(result)
    # Envio automático do código de rastreio (regra atual: ao preencher codigo_rastreio)
    if update_data.get("codigo_rastreio"):
        try:
            cliente = await db.fetchrow("SELECT id, nome, email, telefone FROM clientes WHERE id = $1", pedido_dict["cliente_id"])
            if cliente:
                background_tasks.add_task(notificar_rastreio, dict(cliente), pedido_dict)
        except Exception:
            pass

    return pedido_dict


@router.delete('/{id_pedido}', response_model=Message, status_code=HTTPStatus.OK)
async def deletar_pedido(
    id_pedido: str,
    db: database_loja,
    current_user: CurrentAdmin,
):

    pedido_db = await db.fetchrow('SELECT id FROM pedidos WHERE id_pedido = $1', id_pedido)

    if not pedido_db:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail='Pedido não encontrado.')

    await db.execute('DELETE FROM pedidos WHERE id = $1', pedido_db['id'])

    return {'message': 'Pedido deletado.'}
