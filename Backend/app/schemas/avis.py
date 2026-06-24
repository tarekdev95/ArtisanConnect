from datetime import datetime
from pydantic import BaseModel, Field


class AvisBase(BaseModel):
    artisan_id: int
    description: str | None = None
    note: float = Field(ge=0, le=5)


class AvisCreate(AvisBase):
    pass


class AvisUpdate(BaseModel):
    description: str | None = None
    note: float | None = Field(default=None, ge=0, le=5)


class AvisResponse(AvisBase):
    id: int
    client_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
