from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.core.dependencies import get_current_active_artisan
from app.models.utilisateur import Utilisateur
from app.models.disponibilite import Disponibilite
from app.schemas.disponibilite import (
    DisponibiliteCreate,
    DisponibiliteUpdate,
    DisponibiliteResponse,
)

router = APIRouter()


@router.post("/", response_model=DisponibiliteResponse, status_code=201)
async def create_disponibilite(
    data: DisponibiliteCreate,
    current_user: Utilisateur = Depends(get_current_active_artisan),
    db: AsyncSession = Depends(get_db),
):
    dispo = Disponibilite(
        artisan_id=current_user.id,
        date=data.date,
        debut=data.debut,
        fin=data.fin,
        isdisponible=data.isdisponible,
    )
    db.add(dispo)
    await db.flush()
    return dispo


@router.get("/artisan/{artisan_id}", response_model=list[DisponibiliteResponse])
async def list_disponibilites(
    artisan_id: int,
    disponible_only: bool = Query(False),
    db: AsyncSession = Depends(get_db),
):
    query = select(Disponibilite).where(Disponibilite.artisan_id == artisan_id)
    if disponible_only:
        query = query.where(Disponibilite.isdisponible.is_(True))
    result = await db.execute(query)
    return list(result.scalars().all())


@router.put("/{dispo_id}", response_model=DisponibiliteResponse)
async def update_disponibilite(
    dispo_id: int,
    data: DisponibiliteUpdate,
    current_user: Utilisateur = Depends(get_current_active_artisan),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Disponibilite).where(
            Disponibilite.id == dispo_id,
            Disponibilite.artisan_id == current_user.id,
        )
    )
    dispo = result.scalar_one_or_none()
    if not dispo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Disponibilité non trouvée")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(dispo, field, value)

    await db.flush()
    return dispo


@router.delete("/{dispo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_disponibilite(
    dispo_id: int,
    current_user: Utilisateur = Depends(get_current_active_artisan),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Disponibilite).where(
            Disponibilite.id == dispo_id,
            Disponibilite.artisan_id == current_user.id,
        )
    )
    dispo = result.scalar_one_or_none()
    if not dispo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Disponibilité non trouvée")

    await db.delete(dispo)
    await db.flush()
