from pydantic import BaseModel

from app.schemas.utilisateur import UtilisateurResponse


class ArtisanBase(BaseModel):
    specialite: str
    description: str | None = None
    telephone: str | None = None
    ville: str | None = None
    latitude: float | None = None
    longitude: float | None = None


class ArtisanCreate(ArtisanBase):
    pass


class ArtisanUpdate(BaseModel):
    specialite: str | None = None
    description: str | None = None
    telephone: str | None = None
    ville: str | None = None
    latitude: float | None = None
    longitude: float | None = None


class ArtisanResponse(ArtisanBase):
    id_utilisateur: int
    note_moyenne: float
    verifie: bool
    utilisateur: UtilisateurResponse

    model_config = {"from_attributes": True}


class ArtisanListResponse(ArtisanBase):
    id_utilisateur: int
    note_moyenne: float
    verifie: bool
    utilisateur: UtilisateurResponse

    model_config = {"from_attributes": True}
