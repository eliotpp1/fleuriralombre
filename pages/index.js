import Hero from "../components/Hero";
import PortfolioLink from "../components/PortfolioLink";
import Video from "@/components/Video";
import Presentation from "@/components/Presentation";
import Sunflower from "@/components/Sunflower";
import Competence from "@/components/Competence";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { createClient } from "contentful";

export default function Home({ projects, competences, projectImage }) {
  return (
    <main>
      <Menu blackLogo={false} />
      <Hero />
      <Video />
      <Presentation />
      <Sunflower />
      <PortfolioLink projects={projectImage} limit={1} />
      <Competence competences={competences} />

      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let projects = [];
  let about = { description: "", image: "" };
  let competences = [];
  let projectImage = [];

  try {
    // Compétences
    const competenceEntries = await client.getEntries({
      content_type: "competences",
    });
    competences = competenceEntries.items
      .map((entry) => ({
        competence_title: entry.fields.competenceTitle || null,
        competence_prestation: entry.fields.competencePrestation || [],
      }))
      .reverse();

    // Projets
    const projectEntries = await client.getEntries({
      content_type: "projet",
    });

    projects = projectEntries.items.map((entry) => ({
      slug: entry.fields.title.toLowerCase().replace(/\s+/g, "-"),
      title: entry.fields.title,
      description: entry.fields.description,
      image: entry.fields.image?.fields?.file?.url
        ? `https:${entry.fields.image.fields.file.url}`
        : "",
    }));

    // Images de projets
    const projectImageEntries = await client.getEntries({
      content_type: "photosAleatoireProjets",
    });

    projectImage = projectImageEntries.items.map((entry) => ({
      image: entry.fields.image?.fields?.file?.url
        ? `https:${entry.fields.image.fields.file.url}`
        : "",
      title: entry.fields.title,
    }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Contentful:",
      error
    );
  }

  return {
    props: {
      projects,
      about,
      competences,
      projectImage,
    },
  };
}
