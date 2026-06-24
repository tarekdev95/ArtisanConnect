from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.core.dependencies import get_current_active_client, get_current_admin
from app.models.utilisateur import Utilisateur
from app.models.client import Client
from app.schemas.client import ClientResponse, ClientUpdate

router = APIRouter()


@router.get("/me", response_model=ClientResponse)
async def get_my_profile(
    current_user: Utilisateur = Depends(get_current_active_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Client)
        .options(selectinload(Client.utilisateur))
        .where(Client.id_utilisateur == current_user.id)
    )
    client = result.scalar_one_or_none()
    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profil client non trouvé")
    return client


@router.put("/me", response_model=ClientResponse)
async def update_my_profile(
    data: ClientUpdate,
    current_user: Utilisateur = Depends(get_current_active_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Client)
        .options(selectinload(Client.utilisateur))
        .where(Client.id_utilisateur == current_user.id)
    )
    client = result.scalar_one_or_none()
    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profil client non trouvé")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(client, field, value)

    await db.flush()
    return client


@router.get("/", response_model=list[ClientResponse])
async def list_clients(
    _admin: Utilisateur = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Client).options(selectinload(Client.utilisateur)))
    return list(result.scalars().all())


@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_client(
    client_id: int,
    _admin: Utilisateur = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Client).where(Client.id_utilisateur == client_id))
    client = result.scalar_one_or_none()
    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client non trouvé")

    await db.delete(client)
    await db.flush()
