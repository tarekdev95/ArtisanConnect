import { Link } from "react-router-dom";
import "../styles/Paiement.css";

function Paiement() {
  return (
    <div className="paiement-page">

      <div className="paiement-card">

        <h1>💳 Paiement</h1>

        <p>Choisissez votre méthode de paiement :</p>

        <label>
          <input type="radio" name="payment" />
          💳 Carte bancaire
        </label>

        <label>
          <input type="radio" name="payment" />
          🅿️ PayPal
        </label>

        <label>
          <input type="radio" name="payment" />
          💶 Espèces
        </label>

        <Link to="/facture">
          <button className="pay-btn">
            Confirmer le paiement
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Paiement;