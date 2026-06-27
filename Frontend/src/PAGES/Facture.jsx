import { Link, useLocation } from "react-router-dom";
import "../styles/Facture.css";

function Facture() {
  const location = useLocation();
  const { reservation, artisanNom, specialite } = location.state || {};

  if (!reservation) {
    return (
      <div className="facture-page">
        <div className="facture-card">
          <h1>🧾 Facture</h1>
          <p>Aucune réservation trouvée.</p>
          <Link to="/">
            <button className="home-btn">Retour à l'accueil</button>
          </Link>
        </div>
      </div>
    );
  }

  const dateDebut = new Date(reservation.date_debut).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateFin = new Date(reservation.date_fin).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="facture-page">
      <div className="facture-card">
        <h1>🧾 Facture</h1>

        <hr />

        <p><strong>Réservation n° :</strong> {reservation.id}</p>

        <p><strong>Artisan :</strong> {artisanNom}</p>

        {specialite && <p><strong>Service :</strong> {specialite}</p>}

        <p><strong>Début :</strong> {dateDebut}</p>

        <p><strong>Fin :</strong> {dateFin}</p>

        <p><strong>Montant :</strong> {reservation.prix} €</p>

        <h2 className="success">✅ Réservation confirmée</h2>

        <Link to="/">
          <button className="home-btn">Retour à l'accueil</button>
        </Link>
      </div>
    </div>
  );
}

export default Facture;
