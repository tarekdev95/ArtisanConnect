import "../App.css";

function Login() {
  return (
    <div className="container">
      <div className="card">
        <h1>ArtisanConnect</h1>
        <p>Connexion</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />

        <button>Se connecter</button>
      </div>
    </div>
  );
}

export default Login;