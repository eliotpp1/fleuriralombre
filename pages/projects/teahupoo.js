// pages/projects/teahupoo.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";

const description = `Teahupo’o est un village iconique de Tahiti, connu pour sa vague puissante mondialement célèbre. L’identité visuelle créée puise dans la force de l’océan et l’héritage culturel polynésien, avec des lignes fluides évoquant l’eau et une typographie inspirée des motifs de tatouages traditionnels.`;

export default function Teahupoo({ project }) {
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

  //trouver le projet spécifique "teahupoo"
  try {
    const entries = await client.getEntries({
      content_type: "projet",
      "fields.slug": "teahupoo", // Filtrer par le slug du projet
    });

    console.log("Projet récupéré :", entries.items);

    if (entries.items.length > 0) {
      project = entries.items[0].fields;
      project.image = project.image?.fields?.file?.url
        ? `https:${project.image.fields.file.url}`
        : "";
    } else {
      console.error("Aucun projet trouvé avec le slug 'teahupoo'");
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
