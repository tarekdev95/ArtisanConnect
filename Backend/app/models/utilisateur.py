from datetime import date, datetime

from sqlalchemy import String, Boolean, Date, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.database import Base


class RoleUtilisateur(str, enum.Enum):
    artisan = "artisan"
    client = "client"
    admin = "admin"


class Utilisateur(Base):
    __tablename__ = "utilisateur"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nom: Mapped[str] = mapped_column(String(100))
    prenom: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    mot_de_passe_hache: Mapped[str] = mapped_column(String(255))
    date_de_naissance: Mapped[date | None] = mapped_column(Date, nullable=True)
    role: Mapped[RoleUtilisateur] = mapped_column(SAEnum(RoleUtilisateur, name="role_utilisateur"), default=RoleUtilisateur.client)
    date_de_creation: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    active: Mapped[bool] = mapped_column(Boolean, default=True)

    artisan: Mapped["Artisan | None"] = relationship(back_populates="utilisateur", uselist=False)
    client: Mapped["Client | None"] = relationship(back_populates="utilisateur", uselist=False)
    administrateur: Mapped["Administrateur | None"] = relationship(back_populates="utilisateur", uselist=False)
