import { useState, useEffect } from "react";
import { api } from "../api/client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SearchBar from "../components/SearchBar";
import ArtisanCard from "../components/ArtisanCard";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [metier, setMetier] = useState("");
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async (params = {}) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.artisans.list(params);
      setArtisans(data);
    } catch (err) {
      setError(err.message || "Impossible de charger les artisans");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = {};
    if (search) params.ville = search;
    if (metier) params.specialite = metier;
    fetchArtisans(params);
  };

  const getIcon = (specialite) => {
    const s = specialite?.toLowerCase() || "";
    if (s.includes("plomb")) return "🔧";
    if (s.includes("peint")) return "🎨";
    if (s.includes("electr") || s.includes("électr")) return "⚡";
    if (s.includes("menuis")) return "🪚";
    return "🔨";
  };

  return (
    <div className="dashboard">
      <Navbar />
      <Hero />
      <Stats />

      <SearchBar
        search={search}
        setSearch={setSearch}
        metier={metier}
        setMetier={setMetier}
        onSearch={handleSearch}
      />

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="cards">
        {loading ? (
          <p style={{ textAlign: "center", width: "100%" }}>Chargement...</p>
        ) : artisans.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>Aucun artisan trouvé</p>
        ) : (
          artisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id_utilisateur}
              id={artisan.id_utilisateur}
              nom={`${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}`}
              metier={artisan.specialite}
              ville={artisan.ville}
              note={artisan.note_moyenne}
              description={artisan.description}
              icon={getIcon(artisan.specialite)}
            />
          ))
        )}
      </div>

      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Dashboard;
