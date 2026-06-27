import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">
          <h2>🔨 ArtisanConnect</h2>
          <p>
            Trouvez rapidement un artisan qualifié près de chez vous.
          </p>
        </div>

        <div className="footer-links">
          <h3>Navigation</h3>

          <Link to="/">Accueil</Link>
          <Link to="/artisans">Artisans</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>📧 contact@artisanconnect.com</p>
          <p>📞 +33 6 12 34 56 78</p>
          <p>📍 Paris, France</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 ArtisanConnect - Tous droits réservés.
      </p>

    </footer>
  );
}

export default Footer;