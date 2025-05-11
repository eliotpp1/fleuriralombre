"use client";

import { useEffect } from "react";
import ThreeScene from "./ThreeScene";

export default function Hero() {
  useEffect(() => {
    // Ajoute la classe 'visible' pour l'animation
    const hero = document.querySelector(".hero");
    hero.classList.add("visible");
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <ThreeScene />
      </div>
    </section>
  );
}
