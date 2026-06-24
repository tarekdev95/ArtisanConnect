from datetime import datetime
from pydantic import BaseModel


class ReservationBase(BaseModel):
    artisan_id: int
    date_debut: datetime
    date_fin: datetime
    prix: float


class ReservationCreate(ReservationBase):
    pass


class ReservationUpdate(BaseModel):
    date_debut: datetime | None = None
    date_fin: datetime | None = None
    prix: float | None = None


class ReservationResponse(ReservationBase):
    id: int
    client_id: int

    model_config = {"from_attributes": True}
