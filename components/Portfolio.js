export default function Portfolio({ projects }) {
  return (
    <section id="portfolio" className="portfolio">
      <h2>Nos Projets</h2>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <div key={project.slug} className="portfolio-card">
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
