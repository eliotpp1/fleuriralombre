import { useState } from "react";

export default function Sunflower() {
  const [isHovered1, setIsHovered1] = useState(false); // État pour le premier span
  const [isHovered2, setIsHovered2] = useState(false); // État pour le second span

  return (
    <section className="sunflower" id="sunflower">
      <div className="sunflower-content">
        <h2 className="sunflower-title">
          Dans l'Ombre de vos{" "}
          <span
            className="hoverInstrumentRed"
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            {isHovered1 ? "fleurs" : "projets"}
          </span>{" "}
        </h2>
        <p>
          La mission de Fleurir’A l’Ombre est de mettre en lumière vos idées
          afin de donner vie à des projets concrets. Nous mettons l’accent sur
          la créativité et l’authenticité avec une attention particulière à
          chaque détail pour raconter votre histoire au travers de réalisations
          uniques. C’est dans l’ombre de votre vision que nous feront germer les
          graines de vos futurs{" "}
          <span
            className="hoverInstrumentRed"
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            {isHovered2 ? "fleurs" : "projets"}
          </span>
          .
        </p>
      </div>
      <img
        src="/images/tournesol.png"
        alt="Sunflower"
        className="sunflower-image"
      />
    </section>
  );
}
