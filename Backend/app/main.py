from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import engine, Base
from app.routers import auth, artisans, clients, disponibilites, reservations, avis

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="ArtisanConnect API",
    description="Plateforme connectant artisans, musiciens et créateurs locaux avec leur public",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentification"])
app.include_router(artisans.router, prefix="/api/artisans", tags=["Artisans"])
app.include_router(clients.router, prefix="/api/clients", tags=["Clients"])
app.include_router(disponibilites.router, prefix="/api/disponibilites", tags=["Disponibilités"])
app.include_router(reservations.router, prefix="/api/reservations", tags=["Réservations"])
app.include_router(avis.router, prefix="/api/avis", tags=["Avis"])


@app.get("/", tags=["Root"])
async def root():
    return {"message": "Bienvenue sur l'API ArtisanConnect"}
