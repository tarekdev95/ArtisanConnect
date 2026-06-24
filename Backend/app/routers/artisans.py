from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.core.dependencies import get_current_active_artisan, get_current_admin
from app.models.utilisateur import Utilisateur
from app.schemas.artisan import ArtisanResponse, ArtisanUpdate, ArtisanListResponse
from app.services.artisan_service import get_artisans, get_artisan_by_id

router = APIRouter()


@router.get("/", response_model=list[ArtisanListResponse])
async def list_artisans(
    ville: str | None = Query(None),
    specialite: str | None = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    artisans = await get_artisans(db, ville=ville, specialite=specialite, skip=skip, limit=limit)
    return artisans


@router.get("/{artisan_id}", response_model=ArtisanResponse)
async def get_artisan(artisan_id: int, db: AsyncSession = Depends(get_db)):
    artisan = await get_artisan_by_id(db, artisan_id)
    if not artisan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artisan non trouvé")
    return artisan


@router.put("/me", response_model=ArtisanResponse)
async def update_my_profile(
    data: ArtisanUpdate,
    current_user: Utilisateur = Depends(get_current_active_artisan),
    db: AsyncSession = Depends(get_db),
):
    artisan = await get_artisan_by_id(db, current_user.id)
    if not artisan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profil artisan non trouvé")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(artisan, field, value)

    await db.flush()
    return artisan


@router.patch("/{artisan_id}/verify", response_model=ArtisanResponse)
async def verify_artisan(
    artisan_id: int,
    _admin: Utilisateur = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    artisan = await get_artisan_by_id(db, artisan_id)
    if not artisan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artisan non trouvé")

    artisan.verifie = True
    await db.flush()
    return artisan


@router.delete("/{artisan_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_artisan(
    artisan_id: int,
    _admin: Utilisateur = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    artisan = await get_artisan_by_id(db, artisan_id)
    if not artisan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artisan non trouvé")

    await db.delete(artisan)
    await db.flush()
