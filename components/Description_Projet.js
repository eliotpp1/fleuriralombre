import { useEffect, useRef } from "react";

export default function Competence({ title, description, videoUrl, logo }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll(".description_projet-content");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Vérifie si "title" est un chemin de fichier (simple regex)
  const isImage =
    typeof title === "string" && /\.(png|jpe?g|gif|svg|webp)$/i.test(title);

  return (
    <section
      className="description_projet"
      id="description_projet"
      ref={sectionRef}
    >
      <div className="description_projet-content">
        {isImage ? (
          <img
            src={title}
            alt="Compétence"
            className="description_projet-title-img"
          />
        ) : (
          <h2 className="description_projet-title">{title}</h2>
        )}

        <div className="description_projet-text">
          <ul
            className="description_projet-text-prestation"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="description_projet-footer-links">
            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                className="footer-link-project"
              >
                <div className="footer-link-project-text">Visionner</div>
                <div className="arrow-container-footer-project">
                  <div className="arrow-footer-project"></div>
                </div>
              </a>
            )}
            {logo && (
              <div className="description_projet-logo-container">
                <img
                  src={logo}
                  alt="Logo"
                  className="description_projet-logo"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
