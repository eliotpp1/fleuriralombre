// pages/projects.js
import { createClient } from "contentful";
import Portfolio from "@/components/Portfolio";

export default function ProjectsPage({ projects }) {
  return (
    <main className="projects-page">
      <h1 className="page-title">Nos projets</h1>
      <Portfolio projects={projects} />
    </main>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let projects = [];

  try {
    const entries = await client.getEntries({
      content_type: "projet",
    });

    projects = entries.items.map((entry) => ({
      slug: entry.fields.title.toLowerCase().replace(/\s+/g, "-"),
      title: entry.fields.title,
      description: entry.fields.description,
      image: entry.fields.image?.fields?.file?.url
        ? `https:${entry.fields.image.fields.file.url}`
        : "",
    }));
  } catch (error) {
    console.error("Erreur lors du chargement des projets :", error);
  }

  return {
    props: {
      projects,
    },
  };
}
