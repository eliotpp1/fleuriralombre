// pages/projects/livrehda.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import Description_Projet from "@/components/Description_Projet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const description = `Le livre HDA, est une synthèse de nos aventures, une trace de ce qui nous a menées a créer FAO. Toutes ses journées qui ont nourri notre créativité et notre passion. Dans ce livre, les aventures sont relatées telles qu’elle ont été vécues, avec les mots, les pensées et les images qui les résument. Pas de filtre, la simple complexité d’une journée réussie...`;
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
  const images = [
    "/images/Simone.png",
    "/images/Urbania.png",
    "/images/tadeo_neige.png",
    "/images/envision.png",
  ];

  return (
    <>
      <Menu />
      <ProjectHeader project={project} description={description} />
      <section className="hda-gif-book">
        <img
          src="/images/projects/hda/Anim_Pages_Livre_Debut.gif"
          alt="Livre HDA Project"
        />
      </section>
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-track">
            {[...images, ...images].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="hda-full-book first">
        <img
          src="/images/projects/hda/Couverture_Page_Livre.png"
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
