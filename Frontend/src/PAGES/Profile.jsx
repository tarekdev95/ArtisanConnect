import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import "../styles/Profile.css";

function Profile() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all([
      api.artisans.get(id),
      api.avis.forArtisan(id),
    ])
      .then(([artisanData, avisData]) => {
        setArtisan(artisanData);
        setAvis(avisData);
      })
      .catch((err) => setError(err.message || "Artisan introuvable"))
      .finally(() => setLoading(false));
  }, [id]);

  const getIcon = (specialite) => {
    const s = specialite?.toLowerCase() || "";
    if (s.includes("plomb")) return "🔧";
    if (s.includes("peint")) return "🎨";
    if (s.includes("electr") || s.includes("électr")) return "⚡";
    if (s.includes("menuis")) return "🪚";
    return "🔨";
  };

  if (loading) {
    return (
      <div className="artisan-page">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="artisan-page">
        <h1>{error || "Artisan introuvable"}</h1>
        <Link to="/">
          <button className="back-btn">Retour</button>
        </Link>
      </div>
    );
  }

  const fullName = `${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}`;

  return (
    <div className="artisan-page">
      <div className="artisan-card">
        <h1>{fullName}</h1>

        <h3>
          <span className="metier-icon">{getIcon(artisan.specialite)}</span>
          {artisan.specialite}
        </h3>

        <p>📍 {artisan.ville || "Non renseigné"}</p>

        {artisan.telephone && <p>📞 {artisan.telephone}</p>}

        <p>⭐ {artisan.note_moyenne.toFixed(1)}</p>

        {artisan.description && (
          <div className="services">
            <p>{artisan.description}</p>
          </div>
        )}

        {avis.length > 0 && (
          <div className="services" style={{ marginTop: "1rem" }}>
            <h3>Avis ({avis.length})</h3>
            {avis.map((a) => (
              <div key={a.id} style={{ borderBottom: "1px solid #eee", padding: "0.5rem 0" }}>
                <p>⭐ {a.note}/5</p>
                {a.description && <p>{a.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="profile-buttons">
          <Link to={`/reservation/${artisan.id_utilisateur}`}>
            <button className="contact-btn">📅 Réserver</button>
          </Link>
        </div>

        <Link to="/map">
          <button className="map-btn">🗺 Voir sur la carte</button>
        </Link>
      </div>

      <Link to="/">
        <button className="back-btn">⬅ Retour à l'accueil</button>
      </Link>
    </div>
  );
}

export default Profile;
