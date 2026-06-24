from datetime import date, datetime
from pydantic import BaseModel, EmailStr

from app.models.utilisateur import RoleUtilisateur


class UtilisateurBase(BaseModel):
    nom: str
    prenom: str
    email: EmailStr
    date_de_naissance: date | None = None


class UtilisateurCreate(UtilisateurBase):
    mot_de_passe: str
    role: RoleUtilisateur = RoleUtilisateur.client


class UtilisateurUpdate(BaseModel):
    nom: str | None = None
    prenom: str | None = None
    email: EmailStr | None = None
    date_de_naissance: date | None = None
    active: bool | None = None


class UtilisateurResponse(UtilisateurBase):
    id: int
    role: RoleUtilisateur
    date_de_creation: datetime
    active: bool

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: int | None = None
    role: RoleUtilisateur | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    mot_de_passe: str
