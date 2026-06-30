"""Seed script: insere 10 artisans de profils varies (electricien, plombier, peintre, menuisier).

Usage: python seed_artisans.py
"""
import asyncio

from app.database import async_session
from app.core.security import hash_password
from app.models.utilisateur import Utilisateur, RoleUtilisateur
from app.models.artisan import Artisan

ARTISANS = [
    dict(nom="Lefevre", prenom="Marc", email="marc.lefevre@artisanconnect.fr",
         specialite="Electricien", ville="Lyon", telephone="0612345601",
         note_moyenne=4.8, verifie=True,
         description="Electricien certifie, specialiste en renovation electrique et mise aux normes."),
    dict(nom="Girard", prenom="Sophie", email="sophie.girard@artisanconnect.fr",
         specialite="Electricien", ville="Marseille", telephone="0612345602",
         note_moyenne=4.5, verifie=True,
         description="Installation electrique neuve, domotique et depannage urgent 7j/7."),
    dict(nom="Bonnet", prenom="Karim", email="karim.bonnet@artisanconnect.fr",
         specialite="Electricien", ville="Toulouse", telephone="0612345603",
         note_moyenne=4.2, verifie=False,
         description="Jeune artisan electricien, tarifs competitifs pour particuliers."),
    dict(nom="Moreau", prenom="Julien", email="julien.moreau@artisanconnect.fr",
         specialite="Plombier", ville="Lyon", telephone="0612345604",
         note_moyenne=4.9, verifie=True,
         description="Plombier chauffagiste avec 15 ans d'experience, depannage rapide."),
    dict(nom="Petit", prenom="Camille", email="camille.petit@artisanconnect.fr",
         specialite="Plombier", ville="Bordeaux", telephone="0612345605",
         note_moyenne=4.6, verifie=True,
         description="Installation sanitaire, recherche de fuite et renovation salle de bain."),
    dict(nom="Roux", prenom="Antoine", email="antoine.roux@artisanconnect.fr",
         specialite="Plombier", ville="Nantes", telephone="0612345606",
         note_moyenne=4.0, verifie=False,
         description="Intervention rapide pour depannage plomberie et installation chaudiere."),
    dict(nom="Fournier", prenom="Lea", email="lea.fournier@artisanconnect.fr",
         specialite="Peintre", ville="Paris", telephone="0612345607",
         note_moyenne=4.7, verifie=True,
         description="Peintre en batiment, finitions soignees, decoration interieure et exterieure."),
    dict(nom="Simon", prenom="Hugo", email="hugo.simon@artisanconnect.fr",
         specialite="Peintre", ville="Lille", telephone="0612345608",
         note_moyenne=4.3, verifie=False,
         description="Peinture, enduits decoratifs et pose de papier peint pour particuliers et pros."),
    dict(nom="Lambert", prenom="Nadia", email="nadia.lambert@artisanconnect.fr",
         specialite="Menuisier", ville="Strasbourg", telephone="0612345609",
         note_moyenne=4.9, verifie=True,
         description="Menuiserie sur mesure, agencement interieur, pose de cuisines et placards."),
    dict(nom="David", prenom="Thomas", email="thomas.david@artisanconnect.fr",
         specialite="Menuisier", ville="Nice", telephone="0612345610",
         note_moyenne=4.1, verifie=True,
         description="Fabrication et pose de portes, fenetres et terrasses en bois."),
]

DEFAULT_PASSWORD = "Artisan123!"


async def seed() -> None:
    async with async_session() as session:
        created = 0
        for data in ARTISANS:
            utilisateur = Utilisateur(
                nom=data["nom"],
                prenom=data["prenom"],
                email=data["email"],
                mot_de_passe_hache=hash_password(DEFAULT_PASSWORD),
                role=RoleUtilisateur.artisan,
            )
            session.add(utilisateur)
            await session.flush()  # obtenir utilisateur.id

            artisan = Artisan(
                id_utilisateur=utilisateur.id,
                specialite=data["specialite"],
                description=data["description"],
                telephone=data["telephone"],
                note_moyenne=data["note_moyenne"],
                ville=data["ville"],
                verifie=data["verifie"],
            )
            session.add(artisan)
            created += 1

        await session.commit()
        print(f"{created} artisans inseres avec succes (mot de passe par defaut: {DEFAULT_PASSWORD}).")


if __name__ == "__main__":
    asyncio.run(seed())
