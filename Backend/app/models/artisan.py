from sqlalchemy import String, Boolean, Float, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Artisan(Base):
    __tablename__ = "artisan"

    id_utilisateur: Mapped[int] = mapped_column(ForeignKey("utilisateur.id", ondelete="CASCADE"), primary_key=True)
    specialite: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    telephone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    note_moyenne: Mapped[float] = mapped_column(Float, default=0.0)
    ville: Mapped[str | None] = mapped_column(String(100), nullable=True)
    verifie: Mapped[bool] = mapped_column(Boolean, default=False)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)

    utilisateur: Mapped["Utilisateur"] = relationship(back_populates="artisan")
    disponibilites: Mapped[list["Disponibilite"]] = relationship(back_populates="artisan", cascade="all, delete-orphan")
    reservations: Mapped[list["Reservation"]] = relationship(back_populates="artisan", cascade="all, delete-orphan")
    avis: Mapped[list["Avis"]] = relationship(back_populates="artisan", cascade="all, delete-orphan")
