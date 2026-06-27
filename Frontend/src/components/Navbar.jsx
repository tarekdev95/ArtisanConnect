import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.css";
import { FaHammer } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FaHammer className="logo-icon" />
        <span className="logo-text">
          Artisan<span>Connect</span>
        </span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/artisans">Artisans</Link></li>
        <li><a href="#how">Comment ça marche</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-buttons">
        {user ? (
          <>
            <span style={{ color: "#fff", marginRight: "0.5rem" }}>
              {user.prenom} {user.nom}
            </span>
            <button className="login-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Connexion</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">Inscription</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
