"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function NosProjetsMobile({ projects }) {
  const containerRef = useRef(null);

  const filteredProjects = projects.filter((p) => p.slug !== "background");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = containerRef.current?.scrollTop || 0;
      const height = window.innerHeight;
    };

    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, [filteredProjects.length]);

  const handleClick = (project) => {
    window.location.href = `/projects/${project.slug}`;
  };

  return (
    <div className="nosprojets-immersive" ref={containerRef}>
      {/* ✅ Slide d’intro en dur */}
      <section className="immersive-slide intro-slide">
        {/* Image en fond fullscreen */}
        <img
          src="/images/projects-intro.jpg"
          alt="Bienvenue"
          className="immersive-image-fullscreen"
        />

        {/* Contenu par-dessus l’image */}
        <motion.div
          className="immersive-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="immersive-title">Projets</h2>
          <p className="immersive-description">
            Découvrez les principales <br />
            réalisations de FAO Studio
          </p>
        </motion.div>
      </section>

      {/* Slides dynamiques projets */}
      {filteredProjects.map((project, index) => (
        <section key={project.slug} className="immersive-slide">
          <motion.div
            className="immersive-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="immersive-image"
            />
            <h2 className="immersive-title">{project.title}</h2>
            <p className="immersive-description">{project.description}</p>
            <button
              onClick={() => handleClick(project)}
              className="immersive-button"
            >
              <div className="arrow-container-carousel">
                <div className="arrow-carousel"></div>
              </div>
            </button>
          </motion.div>
        </section>
      ))}
    </div>
  );
}
