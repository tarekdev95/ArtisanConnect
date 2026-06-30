import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HowItWorks.css";
import "../styles/CommentCaMarche.css";

function CommentCaMarche() {
  return (
    <div className="howitworks-page">
      <Navbar />

      <section className="howitworks-hero">
        <h1 className="section-title">Comment ça marche ?</h1>
        <p>
          ArtisanConnect met en relation particuliers et artisans qualifiés
          en quelques clics, que vous cherchiez un professionnel ou que vous
          proposiez vos services.
        </p>
      </section>

      <section className="how-section">
        <h2>Pour les clients</h2>

        <div className="steps">
          <div className="step-card">
            <div className="step-icon">🔎</div>
            <h3>Rechercher</h3>
            <p>Cherchez un artisan près de chez vous par métier ou par ville.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">👨‍🔧</div>
            <h3>Choisir</h3>
            <p>Comparez les profils, les spécialités et les avis clients.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">📅</div>
            <h3>Réserver</h3>
            <p>Choisissez une date, une heure et confirmez votre réservation.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">💳</div>
            <h3>Payer</h3>
            <p>Paiement sécurisé et facture générée automatiquement.</p>
          </div>
        </div>
      </section>

      <section className="how-section how-section-alt">
        <h2>Pour les artisans</h2>

        <div className="steps">
          <div className="step-card">
            <div className="step-icon">📝</div>
            <h3>Inscrivez-vous</h3>
            <p>Créez votre compte artisan en quelques minutes.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">🛠️</div>
            <h3>Complétez votre profil</h3>
            <p>Renseignez votre spécialité, votre ville et votre description.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">📩</div>
            <h3>Recevez des demandes</h3>
            <p>Les clients vous trouvent et réservent directement vos créneaux.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">⭐</div>
            <h3>Soyez payé</h3>
            <p>Réalisez les travaux et récoltez des avis pour développer votre activité.</p>
          </div>
        </div>
      </section>

      <section className="howitworks-cta">
        <h2>Prêt à commencer ?</h2>
        <Link to="/register">
          <button>Créer un compte</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default CommentCaMarche;
