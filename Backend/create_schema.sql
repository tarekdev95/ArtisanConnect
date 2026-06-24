-- ============================================
-- ArtisanConnect — PostgreSQL Database Schema
-- ============================================

-- Enum type for user roles
CREATE TYPE role_utilisateur AS ENUM ('artisan', 'client', 'admin');

-- 1. utilisateur (base user table)
CREATE TABLE utilisateur (
    id              SERIAL PRIMARY KEY,
    nom             VARCHAR(100)          NOT NULL,
    prenom          VARCHAR(100)          NOT NULL,
    email           VARCHAR(255)          NOT NULL UNIQUE,
    mot_de_passe_hache VARCHAR(255)       NOT NULL,
    date_de_naissance DATE,
    role            role_utilisateur      NOT NULL DEFAULT 'client',
    date_de_creation TIMESTAMP            NOT NULL DEFAULT NOW(),
    active          BOOLEAN               NOT NULL DEFAULT TRUE
);

CREATE INDEX ix_utilisateur_id    ON utilisateur (id);
CREATE INDEX ix_utilisateur_email ON utilisateur (email);

-- 2. artisan (extends utilisateur)
CREATE TABLE artisan (
    id_utilisateur  INTEGER PRIMARY KEY
                    REFERENCES utilisateur (id) ON DELETE CASCADE,
    specialite      VARCHAR(200)          NOT NULL,
    description     TEXT,
    telephone       VARCHAR(20),
    note_moyenne    DOUBLE PRECISION      NOT NULL DEFAULT 0.0,
    ville           VARCHAR(100),
    verifie         BOOLEAN               NOT NULL DEFAULT FALSE,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION
);

-- 3. client (extends utilisateur)
CREATE TABLE client (
    id_utilisateur  INTEGER PRIMARY KEY
                    REFERENCES utilisateur (id) ON DELETE CASCADE,
    telephone       VARCHAR(20),
    adresse         VARCHAR(255)
);

-- 4. administrateur (extends utilisateur)
CREATE TABLE administrateur (
    id_utilisateur  INTEGER PRIMARY KEY
                    REFERENCES utilisateur (id) ON DELETE CASCADE
);

-- 5. disponibilite (artisan availability slots)
CREATE TABLE disponibilite (
    id              SERIAL PRIMARY KEY,
    artisan_id      INTEGER               NOT NULL
                    REFERENCES artisan (id_utilisateur) ON DELETE CASCADE,
    date            DATE                  NOT NULL,
    debut           TIME                  NOT NULL,
    fin             TIME                  NOT NULL,
    isdisponible    BOOLEAN               NOT NULL DEFAULT TRUE
);

CREATE INDEX ix_disponibilite_id ON disponibilite (id);

-- 6. reservation (booking between client & artisan)
CREATE TABLE reservation (
    id              SERIAL PRIMARY KEY,
    artisan_id      INTEGER               NOT NULL
                    REFERENCES artisan (id_utilisateur) ON DELETE CASCADE,
    client_id       INTEGER               NOT NULL
                    REFERENCES client (id_utilisateur) ON DELETE CASCADE,
    date_debut      TIMESTAMP             NOT NULL,
    date_fin        TIMESTAMP             NOT NULL,
    prix            DOUBLE PRECISION      NOT NULL
);

CREATE INDEX ix_reservation_id ON reservation (id);

-- 7. avis (reviews from client to artisan)
CREATE TABLE avis (
    id              SERIAL PRIMARY KEY,
    artisan_id      INTEGER               NOT NULL
                    REFERENCES artisan (id_utilisateur) ON DELETE CASCADE,
    client_id       INTEGER               NOT NULL
                    REFERENCES client (id_utilisateur) ON DELETE CASCADE,
    description     TEXT,
    note            DOUBLE PRECISION      NOT NULL,
    created_at      TIMESTAMP             NOT NULL DEFAULT NOW()
);

CREATE INDEX ix_avis_id ON avis (id);
