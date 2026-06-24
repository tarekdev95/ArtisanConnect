from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.core.dependencies import get_current_active_client, get_current_active_artisan, get_current_user
from app.models.utilisateur import Utilisateur, RoleUtilisateur
from app.models.reservation import Reservation
from app.schemas.reservation import ReservationCreate, ReservationUpdate, ReservationResponse
from app.services.reservation_service import (
    create_reservation,
    get_reservations_for_artisan,
    get_reservations_for_client,
)

router = APIRouter()


@router.post("/", response_model=ReservationResponse, status_code=201)
async def create_new_reservation(
    data: ReservationCreate,
    current_user: Utilisateur = Depends(get_current_active_client),
    db: AsyncSession = Depends(get_db),
):
    reservation = await create_reservation(db, current_user.id, data)
    return reservation


@router.get("/me", response_model=list[ReservationResponse])
async def get_my_reservations(
    current_user: Utilisateur = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if current_user.role == RoleUtilisateur.artisan:
        return await get_reservations_for_artisan(db, current_user.id)
    elif current_user.role == RoleUtilisateur.client:
        return await get_reservations_for_client(db, current_user.id)

    result = await db.execute(select(Reservation))
    return list(result.scalars().all())


@router.get("/{reservation_id}", response_model=ReservationResponse)
async def get_reservation(
    reservation_id: int,
    current_user: Utilisateur = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Réservation non trouvée")

    if current_user.role == RoleUtilisateur.client and reservation.client_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès interdit")
    if current_user.role == RoleUtilisateur.artisan and reservation.artisan_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès interdit")

    return reservation


@router.put("/{reservation_id}", response_model=ReservationResponse)
async def update_reservation(
    reservation_id: int,
    data: ReservationUpdate,
    current_user: Utilisateur = Depends(get_current_active_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Reservation).where(
            Reservation.id == reservation_id,
            Reservation.client_id == current_user.id,
        )
    )
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Réservation non trouvée")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(reservation, field, value)

    await db.flush()
    return reservation


@router.delete("/{reservation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_reservation(
    reservation_id: int,
    current_user: Utilisateur = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Réservation non trouvée")

    if current_user.role == RoleUtilisateur.client and reservation.client_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès interdit")
    if current_user.role == RoleUtilisateur.artisan and reservation.artisan_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès interdit")

    await db.delete(reservation)
    await db.flush()
