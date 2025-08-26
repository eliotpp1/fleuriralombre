import { useEffect, useRef } from "react";

export default function Competence() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Select the .description_projet-content div inside the section
    const targets = section.querySelectorAll(".description_projet-content");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: Unobserve after the animation triggers
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="description_projet"
      id="description_projet"
      ref={sectionRef}
    >
      <div className="description_projet-content">
        <h2 className="description_projet-title">Simone</h2>
        <ul className="description_projet-prestation">
          <li>
            Le packaging conceptuel “Simone” est un projet qui vise à valoriser
            l’univers mécanique à travers une approche graphique sensible et
            engagée. Inspiré de l’expression “En voiture Simone”, le nom apporte
            une touche décalée et familière à un domaine souvent perçu comme
            strictement technique.
          </li>
          <br />

          <li>
            Les boîtes sont conçues en métal recyclé pour intégrer une dimension
            écoresponsable au projet, en cohérence avec une démarche de design
            durable. Tous les éléments sont sérigraphiés en noir directement sur
            la boite, pour créer un contraste fort et assumé tout en limitant
            les matières ajoutées. Les empreintes digitales, volontairement
            intégrées comme des traces de doigts sales, rendent hommage au
            métier de mécanicien en valorisant l’empreinte humaine derrière la
            technique. Sur le couvercle, on retrouve le nom de la pièce
            accompagnée d’un court texte explicatif sur son processus de
            fabrication, apportant une dimension narrative au packaging.
          </li>
          <br />
          <li>
            Pour une lecture facilitée en stockage ou en atelier, la tranche de
            la boîte affiche une illustration en traitement seuil de la pièce,
            pensée comme un repère visuel rapide. Le projet « Simone » mêle
            ainsi narration, fonction et esthétisation d’un univers brut à
            travers un design épuré et impactant.
          </li>
        </ul>
      </div>
    </section>
  );
}
