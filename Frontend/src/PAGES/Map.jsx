import { Link } from "react-router-dom";
import "../styles/Map.css";

function Map() {
  return (
    <div className="map-page">

      <h1>📍 Localisation de l'artisan</h1>

      <p>
        La carte interactive sera disponible dans la prochaine version.
      </p>

      <div className="map-placeholder">
        🗺️ Google Maps
      </div>

      <Link to="/artisans">
        <button className="back-map-btn">
          ⬅ Retour aux artisans
        </button>
      </Link>

    </div>
  );
}

export default Map;