import { useEffect } from "react";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Video from "@/components/Video";
import { createClient } from "contentful";

export default function Home({ projects, about }) {
  useEffect(() => {
    const sections = document.querySelectorAll(
      ".hero, .portfolio, .aboutus, .contact"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  return (
    <div>
      <Hero />
      <Video />
      <Portfolio projects={projects} />
      <AboutUs about={about} />
      <Contact />
    </div>
  );
}

export async function getStaticProps() {
  // Connexion à Contentful
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let projects = [];
  let about = { description: "", image: "" };

  const projectEntries = await client.getEntries({
    content_type: "projet",
  });
  console.log("Projets:", projectEntries);

  const aboutEntry = await client.getEntries({
    content_type: "a-propos",
  });
  console.log("À propos:", aboutEntry);

  try {
    // Récupérer les projets
    const projectEntries = await client.getEntries({
      content_type: "projet", // Utilise l'ID correct
    });

    projects = projectEntries.items.map((entry) => ({
      slug: entry.fields.title.toLowerCase().replace(/\s+/g, "-"),
      title: entry.fields.title,
      description: entry.fields.description,
      image: entry.fields.image?.fields?.file?.url
        ? `https:${entry.fields.image.fields.file.url}`
        : "",
    }));

    // Récupérer la section À propos
    const aboutEntry = await client.getEntries({
      content_type: "a-propos", // Utilise l'ID correct
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
    },
  };
}
