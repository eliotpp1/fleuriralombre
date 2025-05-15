import { useEffect } from "react";
import Menu from "./Menu";
import ModelViewer from "./ModelViewer";

export default function Hero() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    hero.classList.add("visible");
  }, []);

  return (
    <section className="hero">
      {/* Croix dans chaque coin */}
      <div className="corner top-left">
        <div className="bar-horizontal"></div>
        <div className="bar-vertical"></div>
      </div>
      <div className="corner top-right">
        <div className="bar-horizontal"></div>
        <div className="bar-vertical"></div>
      </div>
      <div className="corner bottom-left">
        <div className="bar-horizontal"></div>
        <div className="bar-vertical"></div>
      </div>
      <div className="corner bottom-right">
        <div className="bar-horizontal"></div>
        <div className="bar-vertical"></div>
      </div>
      <Menu />
      <div className="hero-content">
        <ModelViewer />
      </div>
      <div className="hero-footer">Fleurir’A l’Ombre</div>
    </section>
  );
}
