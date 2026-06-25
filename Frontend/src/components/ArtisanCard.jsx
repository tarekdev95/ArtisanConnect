import { Link } from "react-router-dom";
import "../styles/ArtisanCard.css";

function ArtisanCard({
  id,
  image,
  icon,
  nom,
  metier,
  ville,
  note,
}) {
  return (
    <div className="card-artisan">

      <img
        src={image}
        alt={nom}
        className="artisan-img"
      />

      <h2>
        {icon} {nom}
      </h2>

      <h4>{metier}</h4>

      <p>📍 {ville}</p>

      <div className="stars">
        ⭐⭐⭐⭐⭐ <span>{note}</span>
      </div>

      <Link to={`/profile/${id}`}>
        <button>Voir profil</button>
      </Link>

    </div>
  );
}

export default ArtisanCard;