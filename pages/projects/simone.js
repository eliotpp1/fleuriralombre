// pages/projects/simone.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import Description_Projet from "@/components/Description_Projet";

const description = `Simone est une marque conceptuelle qui valorise l’univers des pièces automobiles à travers une approche luxueuse et minimaliste. Elle met en lumière la qualité des matériaux, le savoir-faire mécanique et l’élégance discrète du métier. Chaque pièce devient un objet de design, pensé pour souligner la précision et la noblesse de cette industrie souvent laissée dans l’ombre.`;
const description_footer = `<li>
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

<li>`;
export default function Simone({ project }) {
  return (
    <>
      <main>
        <Menu />
        <ProjectHeader project={project} description={description} />
        <section className="simone-full-image">
          <img
            src="/images/projects/simone/Boite_Ouverte_Simone.png"
            alt="Simone Project"
          />
        </section>
        <section className="simone-bandeau">
          <img
            src="/images/projects/simone/GIF_Simone.gif"
            alt="Simone Bandeau"
          />
        </section>
        <section className="simone-3-box">
          <img
            src="/images/projects/simone/Trois_Boite_Simone.png"
            alt="Simone Bandeau"
          />
        </section>
        <section className="simone-typo">
          <img
            src="/images/projects/simone/Typo_Simone.png"
            alt="Simone Bandeau"
          />
        </section>
        <section className="simone-full-image">
          <img
            src="/images/projects/simone/Rendu_Simone_Fin.png"
            alt="Simone Project"
          />
        </section>
        <Description_Projet
          title={"/images/projects/simone/logo_footer_simone.png"}
          description={description_footer}
        />
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let project = [];

  //trouver le projet spécifique "simone"
  try {
    const entries = await client.getEntries({
      content_type: "projet",
      "fields.slug": "simone", // Filtrer par le slug du projet
    });

    console.log("Projet récupéré :", entries.items);

    if (entries.items.length > 0) {
      project = entries.items[0].fields;
      project.image = project.image?.fields?.file?.url
        ? `https:${project.image.fields.file.url}`
        : "";
    } else {
      console.error("Aucun projet trouvé avec le slug 'simone'");
    }
  } catch (error) {
    console.error("Erreur lors du chargement du projet :", error);
  }
  return {
    props: {
      project,
    },
  };
}
