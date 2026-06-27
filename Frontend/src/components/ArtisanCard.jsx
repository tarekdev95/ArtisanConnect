import { Link } from "react-router-dom";
import "../styles/ArtisanCard.css";

function ArtisanCard({
  id,
  icon,
  nom,
  metier,
  ville,
  note,
  description,
}) {
  return (
    <div className="card-artisan">
      <h2>
        {icon} {nom}
      </h2>

      <h4>{metier}</h4>

      <p>📍 {ville || "Non renseigné"}</p>

      <div className="stars">
        ⭐ <span>{typeof note === "number" ? note.toFixed(1) : note}</span>
      </div>

      {description && (
        <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>
          {description}
        </p>
      )}

      <Link to={`/profile/${id}`}>
        <button>Voir profil</button>
      </Link>
    </div>
  );
}

export default ArtisanCard;
