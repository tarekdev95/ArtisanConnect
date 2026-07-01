# ArtisanConnect

Plateforme web de mise en relation entre clients et artisans locaux (électriciens, plombiers, peintres, menuisiers). Les clients peuvent rechercher des artisans, consulter leurs profils, réserver une intervention et obtenir une facture récapitulative.

---

## Table des matières

- [Aperçu](#aperçu)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation et lancement](#installation-et-lancement)
- [Variables d'environnement](#variables-denvironnement)
- [Structure du projet](#structure-du-projet)
- [Routes Frontend](#routes-frontend)
- [API Backend](#api-backend)
- [Base de données](#base-de-données)
- [Comptes de test](#comptes-de-test)
- [Développement local (sans Docker)](#développement-local-sans-docker)

---

## Aperçu

ArtisanConnect permet à :

- **Un client** de s'inscrire, parcourir les artisans disponibles (avec filtres par spécialité et localisation), réserver un artisan pour une intervention et recevoir une facture.
- **Un artisan** de créer son profil, renseigner ses disponibilités et gérer ses réservations.
- **Un administrateur** de superviser la plateforme.

---

## Architecture

```
┌─────────────────┐     HTTP / nginx proxy      ┌──────────────────┐
│  Frontend React │ ─────────────────────────── │  Backend FastAPI  │
│  (Vite + nginx) │          /api/*              │  (Uvicorn)        │
│  port 81        │                             │  port 8001 (host) │
└─────────────────┘                             └────────┬─────────┘
                                                         │ asyncpg
                                                ┌────────▼─────────┐
                                                │   PostgreSQL 16   │
                                                │   port 5432       │
                                                └──────────────────┘
```

Les trois services tournent dans des conteneurs Docker orchestrés par Docker Compose.

---

## Technologies

### Frontend

| Outil | Version | Rôle |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 | Bundler / dev server |
| React Router DOM | 7 | Routage SPA |
| React Leaflet | 5 | Carte interactive |
| React Icons | 5 | Icônes |
| nginx | alpine | Serveur de production |

### Backend

| Outil | Version | Rôle |
|---|---|---|
| FastAPI | ≥ 0.115 | Framework API REST |
| Uvicorn | ≥ 0.30 | Serveur ASGI |
| SQLAlchemy (asyncio) | ≥ 2.0 | ORM async |
| asyncpg | ≥ 0.29 | Driver PostgreSQL async |
| Alembic | ≥ 1.13 | Migrations de base de données |
| Pydantic v2 | ≥ 2.9 | Validation des données |
| python-jose | ≥ 3.3 | Génération / vérification JWT |
| bcrypt | ≥ 4.0 | Hachage des mots de passe |

### Infrastructure

| Outil | Rôle |
|---|---|
| Docker | Conteneurisation |
| Docker Compose | Orchestration multi-services |
| PostgreSQL 16 | Base de données relationnelle |

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et démarré
- Git

---

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd ArtisanConnect
```

### 2. Démarrer la stack Docker

```bash
docker compose up -d
```

Cette commande :
- Démarre PostgreSQL et applique le schéma SQL initial (`Backend/create_schema.sql`)
- Démarre le backend FastAPI (port 8001 sur l'hôte)
- Construit et démarre le frontend nginx (port 81 sur l'hôte)

### 3. Accéder à l'application

| Service | URL |
|---|---|
| Application web | http://localhost:81 |
| API REST (Swagger UI) | http://localhost:8001/docs |
| API REST (ReDoc) | http://localhost:8001/redoc |
| Base de données | localhost:5432 / base : `artisanconnect` |

### 4. Peupler la base de données (optionnel)

Pour insérer 10 artisans de démonstration :

```bash
# Depuis la racine du projet, avec le venv Python activé
venv/Scripts/python.exe Backend/seed_artisans.py
```

### 5. Arrêter la stack

```bash
docker compose down
```

Pour également supprimer les données persistantes :

```bash
docker compose down -v
```

---

## Variables d'environnement

Copier `Backend/.env.example` en `Backend/.env` et adapter les valeurs :

```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/artisanconnect
SECRET_KEY=votre-cle-secrete-longue-et-aleatoire
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=["http://localhost:3000", "http://localhost"]
```

> En production, générer une clé secrète robuste : `openssl rand -hex 32`

---

## Structure du projet

```
ArtisanConnect/
├── docker-compose.yml
├── Backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── alembic/               # Migrations Alembic
│   ├── seed_artisans.py       # Script de peuplement initial
│   └── app/
│       ├── main.py            # Point d'entrée FastAPI
│       ├── config.py          # Configuration (Pydantic Settings)
│       ├── database.py        # Moteur SQLAlchemy async
│       ├── models/            # Modèles SQLAlchemy
│       │   ├── utilisateur.py
│       │   ├── artisan.py
│       │   ├── client.py
│       │   ├── administrateur.py
│       │   ├── reservation.py
│       │   ├── disponibilite.py
│       │   └── avis.py
│       ├── schemas/           # Schémas Pydantic (request / response)
│       ├── routers/           # Endpoints organisés par ressource
│       ├── services/          # Logique métier
│       └── core/
│           ├── security.py    # JWT + hachage bcrypt
│           └── dependencies.py
└── Frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── vite.config.js
    └── src/
        ├── App.jsx             # Routeur principal
        ├── main.jsx
        ├── api/
        │   └── client.js       # Client HTTP (fetch wrapper)
        ├── contexts/
        │   └── AuthContext.jsx # Contexte d'authentification JWT
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── Hero.jsx
        │   └── HowItWorks.jsx
        ├── PAGES/
        │   ├── Dashboard.jsx       # Page d'accueil
        │   ├── Artisans.jsx        # Annuaire des artisans
        │   ├── Profile.jsx         # Profil d'un artisan
        │   ├── Map.jsx             # Carte interactive (Leaflet)
        │   ├── Reservation.jsx     # Formulaire de réservation
        │   ├── Facture.jsx         # Récapitulatif après réservation
        │   ├── CommentCaMarche.jsx # Page explicative
        │   ├── Contact.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
        └── styles/                 # CSS par composant / page
```

---

## Routes Frontend

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil | Public |
| `/artisans` | Annuaire des artisans | Public |
| `/profile/:id` | Profil d'un artisan | Public |
| `/map` | Carte interactive | Public |
| `/comment-ca-marche` | Comment ça marche | Public |
| `/contact` | Contact | Public |
| `/login` | Connexion | Public |
| `/register` | Inscription | Public |
| `/reservation/:artisanId` | Formulaire de réservation | Authentifié (client) |
| `/facture` | Facture récapitulative | Authentifié (client) |

---

## API Backend

Base URL : `http://localhost:8001`

### Authentification — `/api/auth`

| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Créer un compte (client ou artisan) |
| `POST` | `/api/auth/login` | Connexion — retourne un JWT Bearer |
| `GET` | `/api/auth/me` | Profil de l'utilisateur connecté |

### Artisans — `/api/artisans`

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/artisans` | Liste des artisans (filtres : spécialité, ville) |
| `GET` | `/api/artisans/{id}` | Détail d'un artisan |
| `PUT` | `/api/artisans/{id}` | Modifier son profil artisan |

### Réservations — `/api/reservations`

| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/reservations` | Créer une réservation |
| `GET` | `/api/reservations` | Lister ses réservations |
| `GET` | `/api/reservations/{id}` | Détail d'une réservation |
| `PATCH` | `/api/reservations/{id}` | Mettre à jour le statut |

### Autres ressources

| Préfixe | Description |
|---|---|
| `/api/clients` | Gestion des profils clients |
| `/api/disponibilites` | Créneaux de disponibilité des artisans |
| `/api/avis` | Avis et notes laissés par les clients |

> Documentation interactive complète disponible sur http://localhost:8001/docs

---

## Base de données

La base `artisanconnect` est automatiquement initialisée au premier démarrage via `Backend/create_schema.sql`.

### Modèle de données

```
utilisateur (id, email, mot_de_passe_hash, prenom, nom, role, telephone, adresse, ville)
    │
    ├── artisan (id, utilisateur_id, specialite, description, tarif_horaire, note_moyenne, latitude, longitude)
    │       ├── disponibilite (id, artisan_id, jour, heure_debut, heure_fin)
    │       └── avis (id, artisan_id, client_id, note, commentaire, date_avis)
    │
    ├── client (id, utilisateur_id)
    │       └── reservation (id, client_id, artisan_id, date_debut, date_fin, prix, statut)
    │
    └── administrateur (id, utilisateur_id)
```

Rôles possibles pour `utilisateur.role` : `client`, `artisan`, `admin`.

---

## Comptes de test

### Artisans insérés par `seed_artisans.py`

| Prénom Nom | Spécialité | Email | Mot de passe |
|---|---|---|---|
| Jean Dupont | Électricien | jean.dupont@artisan.com | Artisan123! |
| Marie Laurent | Électricienne | marie.laurent@artisan.com | Artisan123! |
| Pierre Martin | Électricien | pierre.martin@artisan.com | Artisan123! |
| Sophie Dubois | Plombière | sophie.dubois@artisan.com | Artisan123! |
| Lucas Bernard | Plombier | lucas.bernard@artisan.com | Artisan123! |
| Emma Petit | Plombière | emma.petit@artisan.com | Artisan123! |
| Thomas Moreau | Peintre | thomas.moreau@artisan.com | Artisan123! |
| Camille Simon | Peintre | camille.simon@artisan.com | Artisan123! |
| Nicolas Leroy | Menuisier | nicolas.leroy@artisan.com | Artisan123! |
| Julie Roux | Menuisière | julie.roux@artisan.com | Artisan123! |

---

## Développement local (sans Docker)

### Backend

```bash
# Créer et activer le venv
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/macOS

# Installer les dépendances
pip install -r Backend/requirements.txt

# Configurer les variables d'environnement
copy Backend\.env.example Backend\.env
# Éditer Backend/.env avec les valeurs correctes

# Lancer le serveur de développement
cd Backend
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd Frontend
npm install
npm run dev       # Vite dev server → http://localhost:3000
```

> Le proxy Vite redirige `/api/*` vers `http://localhost:8000`. Le backend doit donc tourner sur le port 8000 en développement local.

### Migrations Alembic

```bash
cd Backend

# Créer une nouvelle migration
alembic revision --autogenerate -m "description"

# Appliquer les migrations
alembic upgrade head

# Revenir en arrière d'une version
alembic downgrade -1
```
