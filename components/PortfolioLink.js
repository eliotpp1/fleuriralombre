// components/Portfolio.js
export default function PortfolioLink({ projects, limit }) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="portfolio-link">
      <h2 className="section-title">Nos Projets</h2>

      {/* Projet à la une */}
      {displayedProjects.length > 0 && (
        <div className="featured-project">
          <div className="project-card featured">
            <span className="featured-badge">✨ Projet à la une</span>
            <img
              src={displayedProjects[0].image}
              alt={displayedProjects[0].title}
            />
            <h3>{displayedProjects[0].title}</h3>
            <p>{displayedProjects[0].description}</p>
          </div>
        </div>
      )}

      {/* Autres projets */}
      <div className="projects-grid">
        {displayedProjects.slice(1).map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

      {limit && (
        <div className="view-more">
          <a href="/projects" className="view-more-link">
            Voir tous les projets
          </a>
        </div>
      )}
    </section>
  );
}
