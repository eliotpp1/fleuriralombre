"use client";
import React, { useRef, useEffect } from "react";
import { Carousel } from "primereact/carousel";

export const NosProjetsSlider = ({ projects }) => {
  const backgroundProjects = projects.filter(
    (project) => project.title !== "Background"
  );

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (project) => (
    <div className="slider-item">
      {project.image && (
        <img src={project.image} alt={project.title} className="slider-image" />
      )}
      <div className="slider-caption">
        <h3>{project.title}</h3>
        <a href={`/projects/${project.slug}`} className="project-link">
          <div className="arrow-container-carousel">
            <div className="arrow-carousel"></div>
          </div>
        </a>
      </div>
    </div>
  );

  const handleLeftClick = () => {
    document.querySelector(".p-carousel-prev")?.click();
  };

  const handleRightClick = () => {
    document.querySelector(".p-carousel-next")?.click();
  };

  return (
    <section className="nosprojets-slider-section">
      <video className="slider-background-video" autoPlay muted loop playsInline>
        <source src="/images/background-animated.mp4" type="video/mp4" />
      </video>
      <div className="slider-wrapper">
        {/* Flèches personnalisées */}

        <Carousel
          value={backgroundProjects}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          circular
          autoplayInterval={5000}
          itemClassName="custom-carousel-item"
          showIndicators={false}
          showNavigators={true} // ✅ on les garde pour cliquer dessus
        />

        <div className="arrows-container-carousel">
          <div
            className="arrow-container-presentation left-arrow"
            onClick={handleLeftClick}
          >
            <div className="arrow-presentation left-arrow"></div>
          </div>
          <div
            className="arrow-container-presentation right-arrow"
            onClick={handleRightClick}
          >
            <div className="arrow-presentation right-arrow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
