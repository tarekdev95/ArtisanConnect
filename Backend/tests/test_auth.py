import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.database import Base, get_db
from app.main import app

DATABASE_URL = "sqlite+aiosqlite://"

engine_test = create_async_engine(DATABASE_URL, echo=False)
async_session_test = async_sessionmaker(engine_test, class_=AsyncSession, expire_on_commit=False)


async def override_get_db():
    async with async_session_test() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


app.dependency_overrides[get_db] = override_get_db


@pytest_asyncio.fixture(autouse=True)
async def setup_database():
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_register_client(client: AsyncClient):
    response = await client.post(
        "/api/auth/register",
        json={
            "nom": "Dupont",
            "prenom": "Jean",
            "email": "jean@example.com",
            "mot_de_passe": "motdepasse123",
            "role": "client",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "jean@example.com"
    assert data["role"] == "client"
    assert "mot_de_passe" not in data
    assert "mot_de_passe_hache" not in data


@pytest.mark.asyncio
async def test_register_artisan(client: AsyncClient):
    response = await client.post(
        "/api/auth/register",
        json={
            "nom": "Martin",
            "prenom": "Sophie",
            "email": "sophie@example.com",
            "mot_de_passe": "motdepasse123",
            "role": "artisan",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["role"] == "artisan"


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    user_data = {
        "nom": "Dupont",
        "prenom": "Jean",
        "email": "jean@example.com",
        "mot_de_passe": "motdepasse123",
        "role": "client",
    }
    await client.post("/api/auth/register", json=user_data)
    response = await client.post("/api/auth/register", json=user_data)
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient):
    await client.post(
        "/api/auth/register",
        json={
            "nom": "Dupont",
            "prenom": "Jean",
            "email": "jean@example.com",
            "mot_de_passe": "motdepasse123",
            "role": "client",
        },
    )
    response = await client.post(
        "/api/auth/login",
        json={"email": "jean@example.com", "mot_de_passe": "motdepasse123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    await client.post(
        "/api/auth/register",
        json={
            "nom": "Dupont",
            "prenom": "Jean",
            "email": "jean@example.com",
            "mot_de_passe": "motdepasse123",
            "role": "client",
        },
    )
    response = await client.post(
        "/api/auth/login",
        json={"email": "jean@example.com", "mot_de_passe": "mauvais"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me_authenticated(client: AsyncClient):
    await client.post(
        "/api/auth/register",
        json={
            "nom": "Dupont",
            "prenom": "Jean",
            "email": "jean@example.com",
            "mot_de_passe": "motdepasse123",
            "role": "client",
        },
    )
    login_resp = await client.post(
        "/api/auth/login",
        json={"email": "jean@example.com", "mot_de_passe": "motdepasse123"},
    )
    token = login_resp.json()["access_token"]

    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["email"] == "jean@example.com"


@pytest.mark.asyncio
async def test_get_me_unauthenticated(client: AsyncClient):
    response = await client.get("/api/auth/me")
    assert response.status_code == 401
