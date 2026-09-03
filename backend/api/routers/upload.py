import os
import uuid
from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from api.security import get_current_admin

router = APIRouter(prefix='/upload', tags=['upload'])

CurrentUser = Annotated[dict, Depends(get_current_admin)]

ALLOWED_TYPES = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
}

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post('/imagem', status_code=HTTPStatus.CREATED)
async def upload_imagem(file: UploadFile = File(...), current_user: CurrentUser = None):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Tipo de arquivo nao suportado. Aceitos: jpg, png, webp',
        )

    ext = ALLOWED_TYPES[file.content_type]
    filename = f'{uuid.uuid4().hex}{ext}'
    filepath = os.path.join(UPLOAD_DIR, filename)

    content = await file.read()

    max_size = 5 * 1024 * 1024  # 5MB
    if len(content) > max_size:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Arquivo muito grande. Tamanho maximo: 5MB',
        )

    with open(filepath, 'wb') as f:
        f.write(content)

    url = f'/uploads/{filename}'

    return {'url': url, 'filename': filename}
