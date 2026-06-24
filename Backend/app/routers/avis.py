from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.core.dependencies import get_current_active_client, get_current_user
from app.models.utilisateur import Utilisateur
from app.models.avis import Avis
from app.schemas.avis import AvisCreate, AvisUpdate, AvisResponse
from app.services.artisan_service import update_artisan_rating

router = APIRouter()


@router.post("/", response_model=AvisResponse, status_code=201)
async def create_avis(
    data: AvisCreate,
    current_user: Utilisateur = Depends(get_current_active_client),
    db: AsyncSession = Depends(get_db),
):
    avis = Avis(
        artisan_id=data.artisan_id,
        client_id=current_user.id,
        description=data.description,
        note=data.note,
    )
    db.add(avis)
    await db.flush()
    await update_artisan_rating(db, data.artisan_id)
    return avis


@router.get("/artisan/{artisan_id}", response_model=list[AvisResponse])
async def list_avis_for_artisan(
    artisan_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Avis).where(Avis.artisan_id == artisan_id))
    return list(result.scalars().all())


@router.get("/{avis_id}", response_model=AvisResponse)
async def get_avis(
    avis_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Avis).where(Avis.id == avis_id))
    avis = result.scalar_one_or_none()
    if not avis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Avis non trouvé")
    return avis


@router.put("/{avis_id}", response_model=AvisResponse)
async def update_avis(
    avis_id: int,
    data: AvisUpdate,
    current_user: Utilisateur = Depends(get_current_active_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Avis).where(Avis.id == avis_id, Avis.client_id == current_user.id)
    )
    avis = result.scalar_one_or_none()
    if not avis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Avis non trouvé")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(avis, field, value)

    await db.flush()
    await update_artisan_rating(db, avis.artisan_id)
    return avis


@router.delete("/{avis_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_avis(
    avis_id: int,
    current_user: Utilisateur = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Avis).where(Avis.id == avis_id))
    avis = result.scalar_one_or_none()
    if not avis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Avis non trouvé")

    if current_user.role.value == "client" and avis.client_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès interdit")

    artisan_id = avis.artisan_id
    await db.delete(avis)
    await db.flush()
    await update_artisan_rating(db, artisan_id)
