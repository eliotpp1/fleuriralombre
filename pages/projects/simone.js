// pages/projects/simone.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import Description_Projet from "@/components/Description_Projet";

const description = `Simone est une marque conceptuelle qui valorise l’univers des pièces automobiles à travers une approche luxueuse et minimaliste. Elle met en lumière la qualité des matériaux, le savoir-faire mécanique et l’élégance discrète du métier. Chaque pièce devient un objet de design, pensé pour souligner la précision et la noblesse de cette industrie souvent laissée dans l’ombre.`;

export default function Simone({ project }) {
  return (
    <>
      <main>
        <Menu />
        <ProjectHeader project={project} description={description} />
        <section className="simone-full-image">
          <img
            src="/images/projects/simone/Rendu_Simone_Fin.png"
            alt="Simone Project"
          />
        </section>
        <section className="simone-bandeau">
          <img
            src="/images/Files_site_FAO_V2/Simone/Rendu_Simone_Fin.png"
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
        <Description_Projet />
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
