import "../styles/Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">

      <h2>Avis de nos clients</h2>

      <div className="testimonial-grid">

        {/* Card 1 */}
        <div className="testimonial-card">

          <div className="testimonial-stars">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="testimonial-text">
            "Excellent artisan, travail rapide et professionnel."
          </p>

          <div className="testimonial-line"></div>

          <img
            className="testimonial-avatar"
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="Fatima"
          />

          <h3 className="testimonial-name">Fatima</h3>

        </div>

        {/* Card 2 */}
        <div className="testimonial-card">

          <div className="testimonial-stars">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="testimonial-text">
            "Très satisfait de la réservation et du paiement."
          </p>

          <div className="testimonial-line"></div>

          <img
            className="testimonial-avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Ahmed"
          />

          <h3 className="testimonial-name">Ahmed</h3>

        </div>

        {/* Card 3 */}
        <div className="testimonial-card">

          <div className="testimonial-stars">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="testimonial-text">
            "Application très simple à utiliser."
          </p>

          <div className="testimonial-line"></div>

          <img
            className="testimonial-avatar"
            src="https://randomuser.me/api/portraits/women/63.jpg"
            alt="Sofia"
          />

          <h3 className="testimonial-name">Sofia</h3>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;