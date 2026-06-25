import { Link } from "react-router-dom";
import "../styles/Reservation.css";

function Reservation() {
  return (
    <div className="reservation-page">

      <div className="reservation-card">

        <h1>📅 Réservation</h1>

        <input type="text" placeholder="Nom complet" />

        <input type="tel" placeholder="Téléphone" />

        <input type="date" />

        <input type="time" />

        <textarea
          placeholder="Décrivez votre demande..."
          rows="5"
        ></textarea>

        <Link to="/paiement">
          <button className="confirm-btn">
            Continuer vers le paiement
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Reservation;