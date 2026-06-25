import { useState } from "react";
import { artisans } from "../data/artisans";

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

  const filteredArtisans = artisans.filter((artisan) => {

    const matchSearch =
      artisan.nom.toLowerCase().includes(search.toLowerCase()) ||
      artisan.ville.toLowerCase().includes(search.toLowerCase()) ||
      artisan.metier.toLowerCase().includes(search.toLowerCase());

    const matchMetier =
      metier === "" || artisan.metier === metier;

    return matchSearch && matchMetier;
  });

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
      />

      <div className="cards">

        {filteredArtisans.map((artisan) => (

          <ArtisanCard
            key={artisan.id}
            id={artisan.id}
            image={artisan.image}
            nom={artisan.nom}
            metier={artisan.metier}
            ville={artisan.ville}
            note={artisan.note}
            icon={
              artisan.metier === "Plombier"
                ? "🔧"
                : artisan.metier === "Peintre"
                ? "🎨"
                : artisan.metier === "Électricien"
                ? "⚡"
                : "🪚"
            }
          />

        ))}

      </div>

      <WhyChooseUs />

      <HowItWorks />

      <Testimonials />

      <Footer />

    </div>
  );
}

export default Dashboard;