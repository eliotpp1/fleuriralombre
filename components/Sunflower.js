import { useState } from "react";

export default function Sunflower() {
  return (
    <section className="sunflower" id="sunflower">
      <div className="sunflower-content">
        <h2 className="sunflower-title">
          <span className="title-main">Dans l'Ombre</span>
          <span className="title-sub">de vos projets</span>
        </h2>
        <p>
          La mission de Fleurir’A l’Ombre est de mettre en lumière vos idées
          afin de donner vie à des projets concrets. Nous mettons l’accent sur
          la créativité et l’authenticité avec une attention particulière à
          chaque détail pour raconter votre histoire au travers de réalisations
          uniques. C’est dans l’ombre de votre vision que nous feront germer les
          graines de vos futurs projets.
        </p>
      </div>
      <img
        src="/images/tournesol_red.png"
        alt="Sunflower"
        className="sunflower-image"
      />
    </section>
  );
}
