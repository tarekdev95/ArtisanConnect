from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Client(Base):
    __tablename__ = "client"

    id_utilisateur: Mapped[int] = mapped_column(ForeignKey("utilisateur.id", ondelete="CASCADE"), primary_key=True)
    telephone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    adresse: Mapped[str | None] = mapped_column(String(255), nullable=True)

    utilisateur: Mapped["Utilisateur"] = relationship(back_populates="client")
    reservations: Mapped[list["Reservation"]] = relationship(back_populates="client", cascade="all, delete-orphan")
    avis: Mapped[list["Avis"]] = relationship(back_populates="client", cascade="all, delete-orphan")
