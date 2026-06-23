# 🎨 ArtisanConnect

> **Valorisation des talents locaux** — La plateforme qui connecte artisans, musiciens et créateurs avec leur public.

---

## 📖 À propos

**ArtisanConnect** est une plateforme communautaire dédiée aux artisans, musiciens et créateurs locaux. Elle leur offre les outils numériques nécessaires pour se faire connaître, gérer leurs réservations et développer leur activité — tout en préservant les savoir-faire traditionnels et en soutenant l'économie locale.

---

## ✨ Fonctionnalités

### 👤 Profils Artisans
- Portfolio intégré avec photos et vidéos
- Galerie de réalisations
- Présentation détaillée des savoir-faire et spécialités

### 📅 Réservation en ligne
- Système de réservation avec agenda partagé
- Gestion des disponibilités en temps réel
- Notifications automatiques pour les artisans et les clients

### 📍 Géolocalisation
- Recherche d'artisans à proximité
- Carte interactive des créateurs locaux
- Filtrage par catégorie, distance et disponibilité

### ⭐ Avis & Communauté
- Système d'avis clients vérifiés
- Blog communautaire pour partager techniques et astuces
- Espace d'échange entre artisans

### 🧾 Facturation simplifiée
- Module de facturation intégré
- Génération automatique de devis et factures
- Suivi des paiements

---

## 🌍 Impact social

| Objectif | Description |
|----------|-------------|
| 🏘️ Économie locale | Soutenir les artisans et créateurs de proximité |
| 🏺 Savoir-faire | Préserver et valoriser les métiers traditionnels |
| 🤝 Lien social | Créer des connections entre créateurs et leur communauté |

---


## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone lien_du_projet.git
cd artisanconnect
```

### 2. Installation du Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### 3. Installation du Backend FastAPI

Ouvrir un nouveau terminal :

```bash
cd backend

# Créer l'environnement virtuel
python -m venv venv
```

#### Activation de l'environnement

Windows :

```bash
venv\Scripts\activate
```

Linux / macOS :

```bash
source venv/bin/activate
```

#### Installer les dépendances

```bash
pip install -r requirements.txt
```

#### Configurer les variables d'environnement

Créer un fichier `.env` :

#### Lancer le serveur FastAPI

```bash
uvicorn app.main:app --reload
```

### 4. Documentation API

Swagger UI :

```text
http://localhost:8000/docs
```

ReDoc :

```text
http://localhost:8000/redoc
```

### 5. Base de données (si PostgreSQL)

Créer une base de données :

```sql
CREATE DATABASE artisanconnect;
```

Appliquer les migrations

## 🛠️ Technologies utilisées

- **Frontend** : React
- **Backend** : FastAPi
- **Base de données** : Postgresql
