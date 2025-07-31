"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const positions = [
  { x: "-200%", y: "-80%" },
  { x: "100%", y: "-40%" },
  { x: "-40%", y: "60%" },
  { x: "50%", y: "-150%" },
];

export default function NosProjets({ projects }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateScreenSize = () => setIsDesktop(window.innerWidth >= 1300);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    if (isDesktop) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isDesktop]);

  const range = 1000;
  const overlap = 0.5; // 50% d'overlap entre images
  const reversedProjects = [...projects].reverse();
  const fadeStart = (reversedProjects.length - 2.5) * range;
  const fadeRange = 300; // distance scroll pour faire apparaître le texte

  const textOpacity = Math.min(
    Math.max((scrollY - fadeStart) / fadeRange, 0),
    1
  );

  return (
    <>
      {/* <Menu /> */}
      <main className="nosprojets-section" style={{ position: "relative" }}>
        <h1 className="nosprojets-title">Projets</h1>

        {reversedProjects.map((project, index) => {
          const start = index * range * overlap;
          const progress = Math.min(Math.max((scrollY - start) / range, 0), 1);

          const isLast = index === reversedProjects.length - 1;

          if (isLast) {
            // Image fullscreen en background
            const opacity = progress;

            return (
              <motion.img
                key={index}
                src={project.image}
                alt={project.title}
                className="nosprojets-image-fullscreen"
                style={{
                  opacity,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                  zIndex: 1000,
                  pointerEvents: "none",
                }}
              />
            );
          }

          const opacity = 1 - Math.abs(progress - 0.5) * 2;
          const scale = 0.5 + (1 - Math.abs(progress - 0.5) * 2);
          const translateY = -100 * (progress - 0.5);
          const pos = positions[index % positions.length];

          return (
            <motion.img
              key={index}
              src={project.image}
              alt={project.title}
              className="nosprojets-image"
              style={{
                opacity,
                transform: `translate(${pos.x}, ${pos.y}) translateY(${translateY}px) scale(${scale})`,
                zIndex: opacity > 0.2 ? 10 : 1,
              }}
            />
          );
        })}

        {/* Le texte qui apparaît à la fin du scroll sur l'image fullscreen */}
        {scrollY >= fadeStart && (
          <section
            className="projects-intro"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              zIndex: 1100,
              pointerEvents: textOpacity > 0 ? "auto" : "none",
              background: `rgba(0,0,0,${0.3 * textOpacity})`,
              textAlign: "center",
              padding: "2rem",
              boxSizing: "border-box",
              opacity: textOpacity,
              transition: "opacity 0.6s ease-out",
            }}
          >
            <div className="projects-text-container">
              <h1 className="projects-title">Projets</h1>
              <p className="projects-description">
                Découvrez les principales <br />
                réalisations de FAO Studio
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
