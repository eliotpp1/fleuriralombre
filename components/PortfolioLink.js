import { useState } from "react";

export default function PortfolioLink({ projects, limit }) {
  // Select a random project initially
  const getRandomProject = () =>
    projects[Math.floor(Math.random() * projects.length)];

  // State to hold the currently displayed project
  const [randomProject, setRandomProject] = useState(
    limit ? getRandomProject() : projects[0]
  );

  // Handler for hover event to update random project
  const handleHover = () => {
    if (projects.length > 0) {
      setRandomProject(getRandomProject());
    }
  };

  return (
    <section className="portfolio-link" onMouseEnter={handleHover}>
      <div className="portfolio-link__text">
        <h2 className="section-title">Nos Projets</h2>
        <h3 className="section-subtitle">Explorez nos créations</h3>
        <a href="/projects" className="portfolio-link__button">
          <div className="arrow-container">
            <div className="arrow"></div>
          </div>
        </a>
      </div>
      <div className="portfolio-link__images">
        {randomProject && (
          <div className="portfolio-link__image-container">
            <img
              src={randomProject.image}
              alt={randomProject.title}
              className="portfolio-link__image"
            />
          </div>
        )}
      </div>
    </section>
  );
}
