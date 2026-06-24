from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from app.models.artisan import Artisan
from app.models.avis import Avis


async def get_artisans(
    db: AsyncSession,
    ville: str | None = None,
    specialite: str | None = None,
    skip: int = 0,
    limit: int = 20,
) -> list[Artisan]:
    query = select(Artisan).options(selectinload(Artisan.utilisateur))

    if ville:
        query = query.where(Artisan.ville.ilike(f"%{ville}%"))
    if specialite:
        query = query.where(Artisan.specialite.ilike(f"%{specialite}%"))

    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return list(result.scalars().all())


async def get_artisan_by_id(db: AsyncSession, artisan_id: int) -> Artisan | None:
    result = await db.execute(
        select(Artisan)
        .options(selectinload(Artisan.utilisateur))
        .where(Artisan.id_utilisateur == artisan_id)
    )
    return result.scalar_one_or_none()


async def update_artisan_rating(db: AsyncSession, artisan_id: int) -> None:
    result = await db.execute(
        select(func.avg(Avis.note)).where(Avis.artisan_id == artisan_id)
    )
    avg_note = result.scalar()
    if avg_note is not None:
        artisan_result = await db.execute(
            select(Artisan).where(Artisan.id_utilisateur == artisan_id)
        )
        artisan = artisan_result.scalar_one_or_none()
        if artisan:
            artisan.note_moyenne = round(float(avg_note), 2)
            await db.flush()
