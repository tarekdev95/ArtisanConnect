import "../App.css";

function Register() {
  return (
    <div className="container">
      <div className="card">
        <h1>ArtisanConnect</h1>
        <p>Inscription</p>

        <input type="text" placeholder="Nom complet" />
        <br /><br />

        <input type="email" placeholder="Email" />
        <br /><br />

        <input type="tel" placeholder="Téléphone" />
        <br /><br />

        <input type="password" placeholder="Mot de passe" />
        <br /><br />

        <input type="password" placeholder="Confirmer mot de passe" />
        <br /><br />

        <button>S'inscrire</button>
      </div>
    </div>
  );
}

export default Register;