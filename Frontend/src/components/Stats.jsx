import { Link } from "react-router-dom";
import "../styles/Stats.css";

function Stats() {
  return (
    <section className="stats">

      <div className="stat-card">
        <h2>10K+</h2>
        <p>Clients satisfaits</p>
      </div>

      <div className="stat-card">
        <h2>5K+</h2>
        <p>Artisans</p>
      </div>

      <div className="stat-card">
        <h2>20+</h2>
        <p>Métiers</p>
      </div>

      <div className="stat-card">
        <h2>98%</h2>
        <p>Satisfaction</p>
      </div>

    </section>
  );
}

export default Stats;