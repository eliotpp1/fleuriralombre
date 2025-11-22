import { useState } from "react";

export default function Sunflower() {
  return (
    <section className="sunflower" id="sunflower">
      <div className="sunflower-content">
        <h2 className="sunflower-title">
          <span className="title-main">L'Ombre de</span>
          <span className="title-sub">vos projets</span>
        </h2>
        <p>
          L’ombre de la fleur est trop souvent ignorée, pourtant elle révèle toute la part singulière du caractère de la fleur, celle qui la rend véritablement remarquable. Notre mission est de comprendre votre Ombre, ce qui constitue la réalité profonde de votre entreprise et de vos projets afin de raconter votre histoire au travers de réalisations authentiques et uniques.
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
