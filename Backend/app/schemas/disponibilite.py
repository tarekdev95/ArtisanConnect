import datetime
from pydantic import BaseModel


class DisponibiliteBase(BaseModel):
    date: datetime.date
    debut: datetime.time
    fin: datetime.time
    isdisponible: bool = True


class DisponibiliteCreate(DisponibiliteBase):
    pass


class DisponibiliteUpdate(BaseModel):
    date: datetime.date | None = None
    debut: datetime.time | None = None
    fin: datetime.time | None = None
    isdisponible: bool | None = None


class DisponibiliteResponse(DisponibiliteBase):
    id: int
    artisan_id: int

    model_config = {"from_attributes": True}
