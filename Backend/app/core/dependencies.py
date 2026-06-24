from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.core.security import decode_access_token
from app.models.utilisateur import Utilisateur, RoleUtilisateur

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> Utilisateur:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Identifiants invalides",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception

    user_id: int | None = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    result = await db.execute(select(Utilisateur).where(Utilisateur.id == int(user_id)))
    user = result.scalar_one_or_none()
    if user is None or not user.active:
        raise credentials_exception

    return user


async def get_current_active_artisan(
    current_user: Utilisateur = Depends(get_current_user),
) -> Utilisateur:
    if current_user.role != RoleUtilisateur.artisan:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès réservé aux artisans",
        )
    return current_user


async def get_current_active_client(
    current_user: Utilisateur = Depends(get_current_user),
) -> Utilisateur:
    if current_user.role != RoleUtilisateur.client:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès réservé aux clients",
        )
    return current_user


async def get_current_admin(
    current_user: Utilisateur = Depends(get_current_user),
) -> Utilisateur:
    if current_user.role != RoleUtilisateur.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès réservé aux administrateurs",
        )
    return current_user
