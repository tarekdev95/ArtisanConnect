import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import "../App.css";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [metier, setMetier] = useState("");

  const fetchArtisans = (params = {}) => {
    setLoading(true);
    setError("");
    api.artisans
      .list(params)
      .then(setArtisans)
      .catch((err) => setError(err.message || "Impossible de charger les artisans"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  const handleSearch = () => {
    const params = {};
    if (search) params.ville = search;
    if (metier) params.specialite = metier;
    fetchArtisans(params);
  };

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
      <Navbar />

      <h1 className="title-page">Nos Artisans</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        metier={metier}
        setMetier={setMetier}
        onSearch={handleSearch}
      />

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

      <Footer />
    </div>
  );
}

export default Artisans;
