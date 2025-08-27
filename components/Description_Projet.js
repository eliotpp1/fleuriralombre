import { useEffect, useRef } from "react";

export default function Competence({ title, description }) {
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

  return (
    <section
      className="description_projet"
      id="description_projet"
      ref={sectionRef}
    >
      <div className="description_projet-content">
        <h2 className="description_projet-title">{title}</h2>
        <ul
          className="description_projet-prestation"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
}
