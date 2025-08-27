// pages/projects/livrehda.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import Description_Projet from "@/components/Description_Projet";

const description = `En novembre 2024, le comité promotion Envision de HEC Montréal, nous a contactés pour réaliser une vidéo de présentation de leur équipe. Le mandat nous a immédiatement séduits : créer une vidéo créative qui casse les codes habituels de ce type de présentation. À travers cette vidéo de 3 minutes, ils souhaitaient raconter l’histoire de leur rencontre, née d’un rêve commun et d’une volonté de transformer leur vision en réalité.`;
const description_footer = `<li>
Le livre Histoire d’Aventure, imaginé par Fleurir’A l’Ombre, raconte comment l’aventure peut naître n’importe quand et n’importe où. À travers une narration sincère et vivante, on suit les fondateurs de Fleurir’A l’Ombre, deux amis passionnés qui transforment chaque sortie en terrain de jeu.
</li>
<br />
<li>
Nés d’une amitié forgée à Tahiti, leurs récits mêlent images, anecdotes et souvenirs partagés. Des lagons polynésiens aux ruelles de Montréal, en passant par un motu isolé, chaque chapitre nous plonge dans une mini-aventure, illustrée de photos et de vrais extraits de conversations.
</li>
<br />
<li>
Le ton est naturel, presque comme si on feuilletait leur journal. Le déroulement du livre donne l’impression d’être à leurs côtés. Histoire d’Aventure, c’est un livre qui donne envie de sortir, de créer, de vivre. Une invitation à explorer le monde, peu importe où l’on vit.
</li>`;
export default function LivreHda({ project }) {
  return (
    <>
      <Menu />
      <ProjectHeader project={project} description={description} />
      <section className="simone-full-image">
        <img
          src="/images/projects/hda/Anim_Pages_Livre_Debut.gif"
          alt="Livre HDA Project"
        />
      </section>
      <section className="simone-bandeau">
        <img
          src="/images/projects/hda/Bandeau_Anim_Photo_Livre.gif"
          alt="Simone Bandeau"
        />
      </section>
      <section className="hda-book">
        <img
          src="/images/projects/hda/grid/Group 25.png"
          alt="Simone Bandeau"
        />
      </section>

      <section className="hda-full-book">
        <img
          src="/images/projects/hda/GrosPlan_Livre.png"
          alt="Simone Bandeau"
        />
      </section>
      <section className="hda-typo">
        <img src="/images/projects/hda/typo/La_Cascade.png" alt="La Cascade" />
        <img src="/images/projects/hda/typo/Roof_top.png" alt="Roof Top" />
        <img src="/images/projects/hda/typo/Le_Motu.png" alt="Le Motu" />
      </section>
      <Description_Projet title={"Hd'a"} description={description_footer} />
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
