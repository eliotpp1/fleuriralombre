// pages/projects/hda.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import HoverVideo from "@/components/HoverVideo";
import { useState } from "react";
const description = `Histoire d’aventure est une série de 2 vidéos entièrement conçues par FAO. De l’identité graphique à la réalisation audiovisuelle, tout a été minutieusement construit afin d’immerger le spectateur dans l’univers de cette aventure. Ces vidéos suivent le périple d’un jeune de 18 ans au Costa Rica. En l’espace de 9 jours, il enchaîne rencontres, découvertes et expériences qui le transforment personnellement. Un récit visuel et émotionnel qui mêle exploration, introspection et apprentissages.`;

export default function Hda({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Menu />
      <ProjectHeader project={project} description={description} />
      <section className="hda-full-image">
        <img src="/images/projects/hda/costa_rica.png" alt="Simone Project" />
      </section>
      <section className="envision-full-video">
        <HoverVideo
          src="/images/projects/hda/ara.mp4"
          className="envision-full-video"
          classNameImg="envision-full-video-preview"
          classNameVideo="envision-full-video-video"
        />
      </section>
      <section className="envision-double-video">
        <HoverVideo
          // poster="/images/projects/envision/images/envision-left-preview.png"
          src="/images/projects/hda/Asset Pura Vida.mp4"
          className="envision-double-video-left"
          classNameImg="envision-double-video-left-preview"
          classNameVideo="envision-double-video-left-video"
        />
        <HoverVideo
          // poster="/images/projects/envision/images/salle-lumiere-preview.png"
          src="/images/projects/hda/Titres chapitres.mp4"
          className="envision-double-video-right"
          classNameImg="envision-double-video-right-preview"
          classNameVideo="envision-double-video-right-video"
        />
      </section>
      <section
        className="hda-full-image"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={
            isHovered
              ? "/images/projects/hda/miniature_HDA_2.PNG"
              : "/images/projects/hda/Minature Jayen Original.jpg"
          }
          alt="Simone Project"
        />
      </section>
      <section className="envision-double-video">
        <HoverVideo
          // poster="/images/projects/envision/images/envision-left-preview.png"
          src="/images/projects/hda/Podcast angle.mp4"
          className="envision-double-video-left"
          classNameImg="envision-double-video-left-preview"
          classNameVideo="envision-double-video-left-video"
        />
        <HoverVideo
          // poster="/images/projects/envision/images/salle-lumiere-preview.png"
          src="/images/projects/hda/Facecam v1.mp4"
          className="envision-double-video-right"
          classNameImg="envision-double-video-right-preview"
          classNameVideo="envision-double-video-right-video"
        />
      </section>
      <section className="envision-full-video">
        <HoverVideo
          src="/images/projects/hda/Drapeau.mp4"
          className="envision-full-video"
          classNameImg="envision-full-video-preview"
          classNameVideo="envision-full-video-video"
        />
      </section>
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
