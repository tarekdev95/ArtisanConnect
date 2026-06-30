import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Contact.css";

function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
    setNom("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <Navbar />

      <section className="contact-section">
        <h1 className="section-title">Contactez-nous</h1>

        <div className="contact-container">
          <div className="contact-infos">
            <h2>Nos coordonnées</h2>
            <p>📧 contact@artisanconnect.com</p>
            <p>📞 +33 6 12 34 56 78</p>
            <p>📍 Paris, France</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {envoye && (
              <p className="contact-success">
                Votre message a bien été envoyé, merci !
              </p>
            )}

            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              type="text"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Votre message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button type="submit">Envoyer</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;