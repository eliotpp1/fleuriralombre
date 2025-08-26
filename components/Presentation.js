import { useState } from "react";

export default function Presentation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="presentation" id="presentation">
      <div className="presentation-content">
        <h2 className="studio-title">Studio</h2>
        <h2 className="multidisciplinaire-title">MULTIDISCIPLINAIRE</h2>

        <div className="location">
          <h3 className="location-city">Montréal</h3>
          <div
            className="arrow-container-presentation"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="arrow-presentation"></div>
          </div>
          <h3 className={`location-city ${isHovered ? "shifted" : ""}`}>
            Tahiti
          </h3>
        </div>
      </div>
    </section>
  );
}
