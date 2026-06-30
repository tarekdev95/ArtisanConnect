import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* LEFT */}
      <div className="hero-content">

        <span className="hero-badge">
          ⭐ Plateforme N°1 des artisans
        </span>

        <h1>
          Trouvez le meilleur <span>artisan</span> près de chez vous
        </h1>

        <p>
          ArtisanConnect vous permet de trouver rapidement des artisans
          qualifiés, comparer leurs profils et réserver en toute sécurité.
        </p>

        <div className="hero-buttons">

          <Link to="/artisans">
            <button className="btn-primary">
              🔍 Trouver un artisan
            </button>
          </Link>

          <Link to="/register">
            <button className="btn-secondary">
              👷 Devenir artisan
            </button>
          </Link>

        </div>

      </div>

      {/* RIGHT */}
      <div className="hero-right">

        <img
          src={heroImage}
          alt="Artisan"
        />

      </div>

    </section>
  );
}

export default Hero;