// components/Portfolio.js
export default function Portfolio({ projects, limit }) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="portfolio">
      <h2 className="section-title">Projets</h2>
      <div className="projects-grid">
        {displayedProjects.map((project, index) => (
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
