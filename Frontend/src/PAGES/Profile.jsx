import { useParams, Link } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const { id } = useParams();

  const artisans = {
    1: {
      nom: "Ahmed",
      metier: "Plombier",
      icon: "🔧",
      ville: "Paris",
      tel: "06 12 34 56 78",
      note: "4.9",
      services: [
        "Réparation sanitaire",
        "Salle de bain",
        "Fuite d'eau",
      ],
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },

    2: {
      nom: "Mohamed",
      metier: "Peintre",
      icon: "🎨",
      ville: "Lyon",
      tel: "06 11 22 33 44",
      note: "4.8",
      services: [
        "Peinture intérieure",
        "Peinture extérieure",
        "Décoration",
      ],
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },

    3: {
      nom: "Youssef",
      metier: "Électricien",
      icon: "⚡",
      ville: "Marseille",
      tel: "06 55 66 77 88",
      note: "4.9",
      services: [
        "Installation électrique",
        "Dépannage",
        "Tableaux électriques",
      ],
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },

    4: {
      nom: "Karim",
      metier: "Menuisier",
      icon: "🪚",
      ville: "Lille",
      tel: "06 99 88 77 66",
      note: "4.7",
      services: [
        "Meubles sur mesure",
        "Portes",
        "Cuisine",
      ],
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  };

  const artisan = artisans[id];

  if (!artisan) {
    return (
      <div className="artisan-page">
        <h1>Artisan introuvable</h1>

        <Link to="/">
          <button className="back-btn">
            Retour
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="artisan-page">

      <div className="artisan-card">

        <img
          src={artisan.image}
          alt={artisan.nom}
          className="profile-image"
        />

        <h1>{artisan.nom}</h1>

        <h3>
          <span className="metier-icon">{artisan.icon}</span>
          {artisan.metier}
        </h3>

        <p>📍 {artisan.ville}</p>

        <p>📞 {artisan.tel}</p>

        <p>⭐ {artisan.note}</p>

        <div className="services">
          {artisan.services.map((service, index) => (
            <p key={index}>✔ {service}</p>
          ))}
        </div>

       <div className="profile-buttons">

  <Link to="/reservation">
    <button className="contact-btn">
      📅 Réserver
    </button>
  </Link>


</div>
          <Link to="/map">
            <button className="map-btn">
              🗺 Voir sur la carte
            </button>
          </Link>

        </div>

        <Link to="/">
          <button className="back-btn">
            ⬅ Retour à l'accueil
          </button>
        </Link>

      </div>

   
  );
}

export default Profile;