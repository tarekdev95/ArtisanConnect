import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../api/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Reservation.css";

function Reservation() {
  const { artisanId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [artisan, setArtisan] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [prix, setPrix] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artisanId) {
      api.artisans
        .get(artisanId)
        .then(setArtisan)
        .catch(() => {});
    }
  }, [artisanId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Vous devez être connecté pour réserver");
      return;
    }

    if (!dateDebut || !heureDebut || !dateFin || !heureFin || !prix) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      const reservation = await api.reservations.create({
        artisan_id: parseInt(artisanId),
        date_debut: `${dateDebut}T${heureDebut}:00`,
        date_fin: `${dateFin}T${heureFin}:00`,
        prix: parseFloat(prix),
      });

      navigate("/facture", {
        state: {
          reservation,
          artisanNom: artisan
            ? `${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}`
            : `Artisan #${artisanId}`,
          specialite: artisan?.specialite,
        },
      });
    } catch (err) {
      setError(err.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  const artisanNom = artisan
    ? `${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}`
    : "";

  return (
    <div className="reservation-page">
      <Navbar />

      <div className="reservation-card">
        <h1>📅 Réservation</h1>

        {artisanNom && (
          <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>
            Artisan : {artisanNom}
            {artisan?.specialite && ` — ${artisan.specialite}`}
          </p>
        )}

        {!user && (
          <p style={{ color: "orange", marginBottom: "1rem" }}>
            <Link to="/login">Connectez-vous</Link> pour effectuer une réservation
          </p>
        )}

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Date de début</label>
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />

          <label>Heure de début</label>
          <input
            type="time"
            value={heureDebut}
            onChange={(e) => setHeureDebut(e.target.value)}
            required
          />

          <label>Date de fin</label>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            required
          />

          <label>Heure de fin</label>
          <input
            type="time"
            value={heureFin}
            onChange={(e) => setHeureFin(e.target.value)}
            required
          />

          <label>Prix (€)</label>
          <input
            type="number"
            placeholder="Prix en euros"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            min="0"
            step="0.01"
            required
          />

          <button
            type="submit"
            className="confirm-btn"
            disabled={loading || !user}
          >
            {loading ? "Réservation en cours..." : "Confirmer la réservation"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Reservation;
