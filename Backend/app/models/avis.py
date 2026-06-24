from datetime import datetime

from sqlalchemy import Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Avis(Base):
    __tablename__ = "avis"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    artisan_id: Mapped[int] = mapped_column(ForeignKey("artisan.id_utilisateur", ondelete="CASCADE"))
    client_id: Mapped[int] = mapped_column(ForeignKey("client.id_utilisateur", ondelete="CASCADE"))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    note: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    artisan: Mapped["Artisan"] = relationship(back_populates="avis")
    client: Mapped["Client"] = relationship(back_populates="avis")
