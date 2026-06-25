import { Link } from "react-router-dom";
import "../App.css";

function Artisans() {
  return (
    <div className="dashboard">

      <nav className="navbar">
        <h2>ArtisanConnect</h2>

        <Link to="/">
          <button>Accueil</button>
        </Link>
      </nav>

      <h1 className="title-page">Nos Artisans</h1>

      <div className="cards">

        <div className="card-artisan">
          <h3>🔧 Ahmed</h3>
          <p>Plombier - Paris</p>

          <Link to="/profile/1">
            <button>Voir profil</button>
          </Link>
        </div>

        <div className="card-artisan">
          <h3>🎨 Mohamed</h3>
          <p>Peintre - Lyon</p>

          <Link to="/profile/2">
            <button>Voir profil</button>
          </Link>
        </div>

        <div className="card-artisan">
          <h3>⚡ Youssef</h3>
          <p>Électricien - Marseille</p>

          <Link to="/profile/3">
            <button>Voir profil</button>
          </Link>
        </div>

        <div className="card-artisan">
          <h3>🪚 Karim</h3>
          <p>Menuisier - Lille</p>

          <Link to="/profile/4">
            <button>Voir profil</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Artisans;