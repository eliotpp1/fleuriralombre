// pages/projects/teahupoo.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import Description_Projet from "@/components/Description_Projet";
import HoverVideo from "@/components/HoverVideo";

const description = `Teahupo’o est un village iconique de Tahiti, connu pour sa vague puissante mondialement célèbre. L’identité visuelle créée puise dans la force de l’océan et l’héritage culturel polynésien, avec des lignes fluides évoquant l’eau et une typographie inspirée des motifs de tatouages traditionnels.`;
const description_footer = `<li>
Teahupo’o est un village emblématique de Tahiti, connu pour sa vague mythique parmi les plus puissantes du monde. L’identité visuelle propose une esthétisation de ce lieu unique, en traduisant sa relation intime avec l’océan à travers des lignes fluides évoquant le mouvement de l’eau et une icône stylisée de la vague. La typographie, inspirée des tatouages polynésiens, renforce l’ancrage culturel du projet. La palette chromatique entre sarcelle, anthracite et tons sable reflète les teintes naturelles du lagon, du récif et des roches volcaniques, tandis que les déclinaisons sur papeterie, signalétique et objets renforcent l’image moderne, cohérente et immersive du lieu.
</li>`;
export default function Teahupoo({ project }) {
  return (
    <>
      <Menu />
      <ProjectHeader project={project} description={description} />
      <section className="envision-full-video">
        <HoverVideo
          // poster="/images/projects/envision/images/envision-intro-preview.png"
          src="/images/projects/teahupoo/Animation_Teahupo'o_Debut.mp4"
          className="envision-full-video"
          classNameImg="envision-full-video-preview"
          classNameVideo="envision-full-video-video"
        />
      </section>
      <section className="teahupoo-full-image">
        <img src="/images/projects/teahupoo/typo.png" alt="Teahupoo Project" />
      </section>
      <section className="teahupoo-full-image">
        <img
          src="/images/projects/teahupoo/Papeterie_Teahupo'o.jpg"
          alt="Teahupoo Project"
        />
      </section>
      <section className="teahupoo-grid">
        <img
          className="teahupoo-grid-item-1"
          src="/images/projects/teahupoo/Affichage_Rond_Teahupo'o.jpg"
          alt="Teahupoo Project"
        />
        <img
          className="teahupoo-grid-item-2"
          src="/images/projects/teahupoo/Tote_Bag_Teahupo'o.png"
          alt="Teahupoo Project"
        />
        <img
          className="teahupoo-grid-item-3"
          src="/images/projects/teahupoo/Mockup_Vitre_Teahupo'o.jpg"
          alt="Teahupoo Project"
        />
      </section>
      <section className="teahupoo-full-image">
        <img
          src="/images/projects/teahupoo/Tuktuk_Teaghupo'o.jpg"
          alt="Teahupoo Project"
        />
      </section>
      <Description_Projet
        title="/images/projects/teahupoo/logo.png"
        description={description_footer}
      />
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
