// pages/nosprojets.js
import { createClient } from "contentful";
import NosProjets from "@/components/NosProjets/NosProjets";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { NosProjetsSlider } from "@/components/NosProjets/NosProjetsSlider";
import NosProjetsMobile from "./../components/NosProjets/NosProjetsMobile";

export default function ProjectsPage({ projects }) {
  return (
    <>
      <Menu />
      <div className="nosprojets-mobile">
        <NosProjetsMobile projects={projects} />
      </div>
      {/* section for desktop view */}
      <div className="nosprojets-desktop">
        <NosProjets projects={projects} />

        <NosProjetsSlider projects={projects} />
        <Footer />
      </div>
    </>
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
    console.log("Projets récupérés :", entries.items);

    projects = entries.items.map((entry) => ({
      title: entry.fields.title,
      image: entry.fields.image?.fields?.file?.url
        ? `https:${entry.fields.image.fields.file.url}`
        : "",
      description: entry.fields.description,
      slug: entry.fields.slug,
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
