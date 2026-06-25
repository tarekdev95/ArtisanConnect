import { Link } from "react-router-dom";
import "../styles/Facture.css";

function Facture() {
  return (
    <div className="facture-page">

      <div className="facture-card">

        <h1>🧾 Facture</h1>

        <hr />

        <p><strong>Client :</strong> Fatima</p>

        <p><strong>Artisan :</strong> Karim</p>

        <p><strong>Service :</strong> Menuiserie</p>

        <p><strong>Date :</strong> 26/06/2026</p>

        <p><strong>Montant :</strong> 120 €</p>

        <p><strong>Paiement :</strong> Carte bancaire</p>

        <h2 className="success">
          ✅ Paiement confirmé
        </h2>

        <Link to="/">
          <button className="home-btn">
            Retour à l'accueil
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Facture;