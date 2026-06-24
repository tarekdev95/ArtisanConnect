from datetime import date, time

from sqlalchemy import Date, Time, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Disponibilite(Base):
    __tablename__ = "disponibilite"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    artisan_id: Mapped[int] = mapped_column(ForeignKey("artisan.id_utilisateur", ondelete="CASCADE"))
    date: Mapped[date] = mapped_column(Date)
    debut: Mapped[time] = mapped_column(Time)
    fin: Mapped[time] = mapped_column(Time)
    isdisponible: Mapped[bool] = mapped_column(Boolean, default=True)

    artisan: Mapped["Artisan"] = relationship(back_populates="disponibilites")
