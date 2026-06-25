import "../styles/WhyChooseUs.css";

function WhyChooseUs() {
  return (
    <section className="why-section">

      <h2>Pourquoi choisir ArtisanConnect ?</h2>

      <div className="why-grid">

        <div className="why-card">
          <span>✔️</span>
          <h3>Artisans vérifiés</h3>
          <p>Tous nos artisans sont vérifiés avant leur inscription.</p>
        </div>

        <div className="why-card">
          <span>💳</span>
          <h3>Paiement sécurisé</h3>
          <p>Paiement en ligne 100% sécurisé.</p>
        </div>

        <div className="why-card">
          <span>📅</span>
          <h3>Réservation rapide</h3>
          <p>Réservez votre artisan en quelques clics.</p>
        </div>

        <div className="why-card">
          <span>📄</span>
          <h3>Facturation automatique</h3>
          <p>Recevez votre facture PDF immédiatement.</p>
        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;