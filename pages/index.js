// pages/index.js
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Video from "@/components/Video";
import Presentation from "@/components/Presentation";
import Sunflower from "@/components/Sunflower";
import Competence from "@/components/Competence";
import { createClient } from "contentful";

export default function Home({ projects, about, competences }) {
  return (
    <div>
      <Hero />
      <Video />
      <Presentation />
      <Sunflower />
      <Competence competences={competences} />
      <Portfolio projects={projects} />
      <AboutUs about={about} />
      <Contact />
    </div>
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

  try {
    // Compétences
    const competenceEntries = await client.getEntries({
      content_type: "competences",
    });

    console.log(
      "Compétences récupérées depuis Contentful:",
      competenceEntries.items
    );

    competences = competenceEntries.items.map((entry) => ({
      competence_title: entry.fields.competenceTitle || null,
      competence_prestation: entry.fields.competencePrestation || [],
    }));

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

    // À propos
    const aboutEntry = await client.getEntries({
      content_type: "a-propos",
    });

    if (aboutEntry.items[0]) {
      about = {
        description: aboutEntry.items[0].fields.description,
        image: aboutEntry.items[0].fields.image?.fields?.file?.url
          ? `https:${aboutEntry.items[0].fields.image.fields.file.url}`
          : "",
      };
    }
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
    },
  };
}
