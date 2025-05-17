import { useEffect, useRef } from "react";

export default function Competence({ competences }) {
  const containerRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    containerRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      containerRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="competence" id="competence">
      {competences.map((item, index) => (
        <div
          className="competence-content"
          key={index}
          ref={(el) => (containerRef.current[index] = el)}
        >
          <h2 className="competence-title">{item.competence_title}</h2>
          <ul className="competence-prestation">
            {item.competence_prestation.map((prestation, idx) => (
              <li key={idx}>{prestation}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
