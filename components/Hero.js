import { useEffect } from "react";
import ModelViewer from "./ModelViewer";

export default function Hero() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    hero.classList.add("visible");
  }, []);

  return (
    <section className="hero">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/images/background-animated.webm" type="video/webm" />
      </video>
      <div className="hero-content">
        <ModelViewer />
      </div>
      <div className="hero-footer">
        <span>FLEURIR’A</span> <span>L’OMBRE</span>
      </div>
    </section>
  );
}
