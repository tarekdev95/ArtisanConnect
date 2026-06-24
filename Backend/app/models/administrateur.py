from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Administrateur(Base):
    __tablename__ = "administrateur"

    id_utilisateur: Mapped[int] = mapped_column(ForeignKey("utilisateur.id", ondelete="CASCADE"), primary_key=True)

    utilisateur: Mapped["Utilisateur"] = relationship(back_populates="administrateur")
