import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaHammer } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
    <FaHammer className="logo-icon" />

    <span className="logo-text">
        Artisan<span>Connect</span>
    </span>
</Link>

      {/* Menu */}
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/artisans">Artisans</Link></li>
        <li><a href="#how">Comment ça marche</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">
            Connexion
          </button>
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Inscription
          </button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;