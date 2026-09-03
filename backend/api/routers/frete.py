from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from api.services.correios import calcular_frete, peso_taxavel, validar_dimensoes

router = APIRouter(prefix='/frete', tags=['frete'])

# DF (70/71 e parte de 73) e cidades do Entorno atendidas localmente (72/73).
# Para esses CEPs a loja não deve consultar nem expor dados dos Correios.
CEP_DF_ENTORNO_PREFIXOS = ('70', '71', '72', '73')

class CalcularFreteRequest(BaseModel):
    cepDestino: str
    psObjeto: Optional[int] = None  # se não enviar, soma dos produtos
    comprimento: Optional[int] = 20
    largura: Optional[int] = 15
    altura: Optional[int] = 10
    tpObjeto: Optional[int] = 2
    vlDeclarado: Optional[float] = None
    coProduto: Optional[str] = None
    # para cálculo por carrinho: lista de produto_ids + qtd
    itens: Optional[list[dict]] = None

@router.post('/calcular')
async def calcular(req: CalcularFreteRequest):
    try:
        cep_num = "".join(c for c in req.cepDestino if c.isdigit())
        if len(cep_num) != 8:
            raise ValueError("CEP destino deve ter 8 dígitos")

        # Entrega local não depende de peso, cubagem ou consulta aos Correios.
        if cep_num.startswith(CEP_DF_ENTORNO_PREFIXOS):
            return {
                "cepDestino": req.cepDestino,
                "entregaLocal": True,
                "brasilia": True,
                "opcoes": [
                    {"servico": "Retirada no local", "coProduto": "RETIRADA", "valor": 0, "prazo": 0, "obs": "Grátis"},
                    {"servico": "Uber Delivery", "coProduto": "UBER", "valor": 0, "prazo": 0, "obs": "Valor combinado após a compra"},
                ],
                "aviso": "Para DF e Entorno, escolha retirada no local ou Uber Delivery.",
            }

        # Se itens enviados, calcula peso/dimensões agregados (simplificado: maior caixa + soma pesos)
        if req.itens:
            # itens: [{peso_gramas, comprimento, largura, altura, quantidade}]
            total_peso = 0
            max_c = req.comprimento or 20
            max_l = req.largura or 15
            max_a = 0
            for it in req.itens:
                qtd = it.get('quantidade',1)
                total_peso += (it.get('peso_gramas',500) * qtd)
                max_a += (it.get('altura',10) * qtd)  # empilha altura
                max_c = max(max_c, it.get('comprimento',20))
                max_l = max(max_l, it.get('largura',15))
            ps = total_peso
            comp, larg, alt = max_c, max_l, min(max_a,100)
        else:
            ps = req.psObjeto or 1000
            comp, larg, alt = req.comprimento, req.largura, req.altura

        validar_dimensoes(comp,larg,alt)
        taxavel = peso_taxavel(ps, comp,larg,alt)

        # Se sem credenciais, retorna mock para teste
        from api.settings import settings
        if not settings.CORREIOS_USER:
            # mock: R$ 18 + 0.02 por grama taxavel + prazo 5 dias
            mock_valor = round(18 + (taxavel/1000)*4,2)
            return {
                "cepDestino": req.cepDestino,
                "pesoReal": ps,
                "pesoCubadoKg": round((comp*larg*alt)/6000,2),
                "pesoTaxavel": taxavel,
                "dimensoes": {"comp":comp,"larg":larg,"alt":alt},
                "mock": True,
                "opcoes": [
                    {"servico":"PAC","coProduto":"04510","valor":mock_valor,"prazo":5},
                    {"servico":"SEDEX","coProduto":"04014","valor":round(mock_valor*1.6,2),"prazo":2},
                ]
            }

        res = await calcular_frete(req.cepDestino, ps, comp, larg, alt, req.tpObjeto or 2, req.vlDeclarado, req.coProduto)
        return {"cepDestino": req.cepDestino, "pesoTaxavel": taxavel, **res, "mock": False}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
