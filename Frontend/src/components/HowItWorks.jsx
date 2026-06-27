import "../styles/HowItWorks.css";

function HowItWorks() {

  return (

    <section className="how-section">

      <h2>Comment ça marche ?</h2>

      <div className="steps">

        <div className="step-card">
          <div className="step-icon">🔎</div>
          <h3>Rechercher</h3>
          <p>Cherchez un artisan près de chez vous.</p>
        </div>

        <div className="step-card">
          <div className="step-icon">👨‍🔧</div>
          <h3>Choisir</h3>
          <p>Comparez les profils et les avis.</p>
        </div>

        <div className="step-card">
          <div className="step-icon">📅</div>
          <h3>Réserver</h3>
          <p>Choisissez une date et une heure.</p>
        </div>

        <div className="step-card">
          <div className="step-icon">💳</div>
          <h3>Payer</h3>
          <p>Paiement sécurisé et facture PDF.</p>
        </div>

      </div>

    </section>

  );

}

export default HowItWorks;