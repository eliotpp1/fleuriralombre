export default function Portfolio({ projects }) {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-grid">
        {projects.map((project) => (
          <div key={project.slug} className="portfolio-item">
            <img
              src={project.image}
              alt={project.title}
              className="portfolio-image"
            />
            <h3 className="portfolio-title">{project.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
