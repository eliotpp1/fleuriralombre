// ProjectHeader component
import React from "react";

export default function ProjectHeader({ project, description }) {
  return (
    <header className="project-header">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />
      )}
      <div className="project-dark-overlay" />
      <div className="project-image-overlay">
        <h1 className="project-title">{project.title}</h1>

        <p className="project-description">{description}</p>
      </div>
      <div className="project-header-fade" />

      <button
        className="arrow-container-project"
        onClick={() => window.history.back()}
      >
        <div className="arrow-project"></div>
      </button>
    </header>
  );
}
