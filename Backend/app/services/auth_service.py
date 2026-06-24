from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.utilisateur import Utilisateur, RoleUtilisateur
from app.models.artisan import Artisan
from app.models.client import Client
from app.models.administrateur import Administrateur
from app.schemas.utilisateur import UtilisateurCreate
from app.core.security import hash_password, verify_password, create_access_token


async def register_user(db: AsyncSession, user_data: UtilisateurCreate) -> Utilisateur:
    result = await db.execute(select(Utilisateur).where(Utilisateur.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un compte avec cet email existe déjà",
        )

    user = Utilisateur(
        nom=user_data.nom,
        prenom=user_data.prenom,
        email=user_data.email,
        mot_de_passe_hache=hash_password(user_data.mot_de_passe),
        date_de_naissance=user_data.date_de_naissance,
        role=user_data.role,
    )
    db.add(user)
    await db.flush()

    if user_data.role == RoleUtilisateur.artisan:
        db.add(Artisan(id_utilisateur=user.id, specialite="À définir"))
    elif user_data.role == RoleUtilisateur.client:
        db.add(Client(id_utilisateur=user.id))
    elif user_data.role == RoleUtilisateur.admin:
        db.add(Administrateur(id_utilisateur=user.id))

    await db.flush()
    return user


async def authenticate_user(db: AsyncSession, email: str, password: str) -> str:
    result = await db.execute(select(Utilisateur).where(Utilisateur.email == email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.mot_de_passe_hache):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
        )

    if not user.active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Compte désactivé",
        )

    token = create_access_token(data={"sub": str(user.id), "role": user.role.value})
    return token
