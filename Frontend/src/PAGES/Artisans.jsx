import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import "../App.css";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.artisans
      .list()
      .then(setArtisans)
      .catch((err) => setError(err.message || "Impossible de charger les artisans"))
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (specialite) => {
    const s = specialite?.toLowerCase() || "";
    if (s.includes("plomb")) return "🔧";
    if (s.includes("peint")) return "🎨";
    if (s.includes("electr") || s.includes("électr")) return "⚡";
    if (s.includes("menuis")) return "🪚";
    return "🔨";
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>ArtisanConnect</h2>
        <Link to="/">
          <button>Accueil</button>
        </Link>
      </nav>

      <h1 className="title-page">Nos Artisans</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="cards">
        {loading ? (
          <p style={{ textAlign: "center", width: "100%" }}>Chargement...</p>
        ) : artisans.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>Aucun artisan trouvé</p>
        ) : (
          artisans.map((artisan) => (
            <div className="card-artisan" key={artisan.id_utilisateur}>
              <h3>
                {getIcon(artisan.specialite)}{" "}
                {artisan.utilisateur.prenom} {artisan.utilisateur.nom}
              </h3>
              <p>
                {artisan.specialite} - {artisan.ville || "Non renseigné"}
              </p>
              <Link to={`/profile/${artisan.id_utilisateur}`}>
                <button>Voir profil</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Artisans;
