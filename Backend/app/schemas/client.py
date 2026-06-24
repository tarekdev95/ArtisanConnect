from pydantic import BaseModel

from app.schemas.utilisateur import UtilisateurResponse


class ClientBase(BaseModel):
    telephone: str | None = None
    adresse: str | None = None


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    telephone: str | None = None
    adresse: str | None = None


class ClientResponse(ClientBase):
    id_utilisateur: int
    utilisateur: UtilisateurResponse

    model_config = {"from_attributes": True}
