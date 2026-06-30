import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (motDePasse !== confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    try {
      await register({
        nom,
        prenom,
        email,
        mot_de_passe: motDePasse,
        role,
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>ArtisanConnect</h1>
        <p className="card-subtitle">Inscription</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <br /><br />

          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
          <br /><br />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br /><br />

          <label htmlFor="role">Rôle</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: "0.5rem", width: "100%" }}
          >
            <option value="client">Client</option>
            <option value="artisan">Artisan</option>
          </select>
          <br /><br />

          <label htmlFor="motDePasse">Mot de passe</label>
          <input
            id="motDePasse"
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
          <br /><br />

          <label htmlFor="confirmMotDePasse">Confirmer mot de passe</label>
          <input
            id="confirmMotDePasse"
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirmMotDePasse}
            onChange={(e) => setConfirmMotDePasse(e.target.value)}
            required
          />
          <br /><br />

          <button type="submit" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p style={{ marginTop: "1rem" }}>
          Déjà un compte ?{" "}
          <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
