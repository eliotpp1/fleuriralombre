// pages/projects/hda.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";

const description = `Histoire d’aventure est une série de 2 vidéos entièrement conçues par FAO. De l’identité graphique à la réalisation audiovisuelle, tout a été minutieusement construit afin d’immerger le spectateur dans l’univers de cette aventure. Ces vidéos suivent le périple d’un jeune de 18 ans au Costa Rica. En l’espace de 9 jours, il enchaîne rencontres, découvertes et expériences qui le transforment personnellement. Un récit visuel et émotionnel qui mêle exploration, introspection et apprentissages.`;

export default function Hda({ project }) {
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

  //trouver le projet spécifique "hda"
  try {
    const entries = await client.getEntries({
      content_type: "projet",
      "fields.slug": "hda", // Filtrer par le slug du projet
    });

    console.log("Projet récupéré :", entries.items);

    if (entries.items.length > 0) {
      project = entries.items[0].fields;
      project.image = project.image?.fields?.file?.url
        ? `https:${project.image.fields.file.url}`
        : "";
    } else {
      console.error("Aucun projet trouvé avec le slug 'hda'");
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
