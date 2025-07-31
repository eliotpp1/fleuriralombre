// pages/projects/livrehda.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";

const description = `En novembre 2024, le comité promotion Envision de HEC Montréal, nous a contactés pour réaliser  une vidéo de présentation de leur équipe. Le mandat nous a immédiatement séduits : créer une vidéo créative qui casse les codes habituels de ce type de présentation. À travers cette vidéo de 3 minutes, ils souhaitaient raconter l’histoire de leur rencontre, née d’un rêve commun et d’une volonté de transformer leur vision en réalité.`;

export default function LivreHda({ project }) {
  return (
    <>
      <Menu />
      <ProjectHeader project={project} description={description} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let project = [];

  //trouver le projet spécifique "livreHda"
  try {
    const entries = await client.getEntries({
      content_type: "projet",
      "fields.slug": "livrehda", // Filtrer par le slug du projet
    });

    console.log("Projet récupéré :", entries.items);

    if (entries.items.length > 0) {
      project = entries.items[0].fields;
      project.image = project.image?.fields?.file?.url
        ? `https:${project.image.fields.file.url}`
        : "";
    } else {
      console.error("Aucun projet trouvé avec le slug 'livreHda'");
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
