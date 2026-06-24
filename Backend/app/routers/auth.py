from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.utilisateur import (
    UtilisateurCreate,
    UtilisateurResponse,
    Token,
    LoginRequest,
)
from app.services.auth_service import register_user, authenticate_user
from app.core.dependencies import get_current_user
from app.models.utilisateur import Utilisateur

router = APIRouter()


@router.post("/register", response_model=UtilisateurResponse, status_code=201)
async def register(user_data: UtilisateurCreate, db: AsyncSession = Depends(get_db)):
    user = await register_user(db, user_data)
    return user


@router.post("/login", response_model=Token)
async def login(credentials: LoginRequest, db: AsyncSession = Depends(get_db)):
    token = await authenticate_user(db, credentials.email, credentials.mot_de_passe)
    return Token(access_token=token)


@router.get("/me", response_model=UtilisateurResponse)
async def get_me(current_user: Utilisateur = Depends(get_current_user)):
    return current_user
