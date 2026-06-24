from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Reservation(Base):
    __tablename__ = "reservation"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    artisan_id: Mapped[int] = mapped_column(ForeignKey("artisan.id_utilisateur", ondelete="CASCADE"))
    client_id: Mapped[int] = mapped_column(ForeignKey("client.id_utilisateur", ondelete="CASCADE"))
    date_debut: Mapped[datetime] = mapped_column(DateTime)
    date_fin: Mapped[datetime] = mapped_column(DateTime)
    prix: Mapped[float] = mapped_column(Float)

    artisan: Mapped["Artisan"] = relationship(back_populates="reservations")
    client: Mapped["Client"] = relationship(back_populates="reservations")
