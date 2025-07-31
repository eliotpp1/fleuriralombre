export default function ProjetCard({ title, description, image, slug }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <a href={`/projects/${slug}`} className="project-link">
          <div className="arrow-container-carousel">
            <div className="arrow-carousel"></div>
          </div>
        </a>
      </div>
    </div>
  );
}
