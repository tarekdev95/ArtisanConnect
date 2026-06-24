from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from app.models.reservation import Reservation
from app.models.artisan import Artisan
from app.schemas.reservation import ReservationCreate


async def create_reservation(
    db: AsyncSession,
    client_id: int,
    data: ReservationCreate,
) -> Reservation:
    artisan_result = await db.execute(
        select(Artisan).where(Artisan.id_utilisateur == data.artisan_id)
    )
    if not artisan_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Artisan non trouvé",
        )

    if data.date_debut >= data.date_fin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La date de début doit être antérieure à la date de fin",
        )

    overlap_result = await db.execute(
        select(Reservation).where(
            and_(
                Reservation.artisan_id == data.artisan_id,
                Reservation.date_debut < data.date_fin,
                Reservation.date_fin > data.date_debut,
            )
        )
    )
    if overlap_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="L'artisan a déjà une réservation sur ce créneau",
        )

    reservation = Reservation(
        artisan_id=data.artisan_id,
        client_id=client_id,
        date_debut=data.date_debut,
        date_fin=data.date_fin,
        prix=data.prix,
    )
    db.add(reservation)
    await db.flush()
    return reservation


async def get_reservations_for_artisan(
    db: AsyncSession, artisan_id: int
) -> list[Reservation]:
    result = await db.execute(
        select(Reservation).where(Reservation.artisan_id == artisan_id)
    )
    return list(result.scalars().all())


async def get_reservations_for_client(
    db: AsyncSession, client_id: int
) -> list[Reservation]:
    result = await db.execute(
        select(Reservation).where(Reservation.client_id == client_id)
    )
    return list(result.scalars().all())
