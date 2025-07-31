import React from "react";
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
        <p>{project.description}</p>
        <a href={`/projects/${project.slug}`} className="project-link">
          <div className="arrow-container-carousel">
            <div className="arrow-carousel"></div>
          </div>
        </a>
      </div>
    </div>
  );

  return (
    <section id="slider-section" className="nosprojets-slider-section">
      <div className="slider-wrapper">
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
          showNavigators={true}
        />
      </div>
    </section>
  );
};
