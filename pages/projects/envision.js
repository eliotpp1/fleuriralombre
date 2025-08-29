// pages/projects/envision.js
import { createClient } from "contentful";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import HoverVideo from "@/components/HoverVideo";
import Description_Projet from "@/components/Description_Projet";

const description = `En novembre 2024, le comité promotion Envision de HEC Montréal, nous a contactés pour réaliser une vidéo de présentation de leur équipe. Le mandat nous a immédiatement séduits : créer une vidéo créative qui casse les codes habituels de ce type de présentation. À travers cette vidéo de 3 minutes, ils souhaitaient raconter l’histoire de leur rencontre, née d’un rêve commun et d’une volonté de transformer leur vision en réalité.`;
const description_footer_realisation = `<li>
La vidéo commence par un rêve symbolisé par un individu endormi. L'ambiance est lente, la colorimétrie très saturée, et des effets sonores atmosphériques plongent le spectateur dans une dimension onirique. Dans ce rêve, chaque membre de l'équipe est présent, représentant ce qui les unit : une vision commune qui les guidera jusqu’à la conclusion de cette histoire. Le retour à la réalité se fait par le réveil de l'individu, suivi de l’entrée de la caméra dans l'écran de son ordinateur, symbolisant un changement de dimension pour le spectateur.
</li>
<br />
<li>
L'objectif principal de la vidéo était de faire découvrir chaque membre de l’équipe au public. Pour accomplir ce but, nous avons décider de présenter les membres un par un afin de maintenir un suspens et un engouement tout au long de la vidéo. Ainsi, chaque membre est mis en scène dans des circonstances propres à son rôle, tout en établissant des liens entre les membres à travers des transitions variées et des scènes d’interaction (transfert d'objets, appel téléphonique, etc.). Ces éléments illustrent à la fois ce qu'ils accompliront individuellement durant leur mandat et le lien fort qui unit l’équipe dans son ensemble.
</li>
<br />
<li>
La vidéo se termine là où elle a commencé : le rêve devient réalité. L'équipe entière se retrouve au même endroit, marchant ensemble vers leur objectif commun.
</li>`;
const description_footer_elements_graphiques = `<li>
L’objectif des animations était de présenter le nom, le prénom et le rôle de chaque membre au moment de leur apparition. Pour  les concevoir, nous avons utilisé des couleurs, éléments et typographies provenant de l’identité graphique du comité Promotion.
</li>
<br />
<li>
Afin d'intégrer ces animations de manière harmonieuse tout en mettant en valeur leur contenu, nous avons choisi de ralentir et de désaturer progressivement l’arrière-plan vidéo à mesure de l’apparition de chaque membre. L'avantage de cette méthode résidait dans le fait que le même format d'animation pouvait être utilisé quel que soit l'environnement visuel ou le type de composition.
</li>
`;
export default function Envision({ project }) {
  return (
    <>
      <Menu />
      <ProjectHeader project={project} description={description} />

      <section className="envision-full-video">
        <HoverVideo
          poster="/images/projects/envision/images/envision-intro-preview.png"
          src="/images/projects/envision/videos/Intro.mp4"
          className="envision-full-video"
          classNameImg="envision-full-video-preview"
          classNameVideo="envision-full-video-video"
        />
      </section>

      <section className="envision-double-video">
        <HoverVideo
          poster="/images/projects/envision/images/envision-left-preview.png"
          src="/images/projects/envision/videos/malette.mp4"
          className="envision-double-video-left"
          classNameImg="envision-double-video-left-preview"
          classNameVideo="envision-double-video-left-video"
        />
        <HoverVideo
          poster="/images/projects/envision/images/salle-lumiere-preview.png"
          src="/images/projects/envision/videos/salle-lumiere.mp4"
          className="envision-double-video-right"
          classNameImg="envision-double-video-right-preview"
          classNameVideo="envision-double-video-right-video"
        />
      </section>

      <section className="envision-full-video">
        <HoverVideo
          poster="/images/projects/envision/images/envision-dj-preview.png"
          src="/images/projects/envision/videos/dj.mp4"
          className="envision-full-video"
          classNameImg="envision-full-video-preview"
          classNameVideo="envision-full-video-video"
        />
      </section>

      <section className="envision-double-video">
        <HoverVideo
          poster="/images/projects/envision/images/envision-left-preview.png"
          src="/images/projects/envision/videos/sj-asset.mp4"
          className="envision-double-video-left"
          classNameImg="envision-double-video-left-preview"
          classNameVideo="envision-double-video-left-video"
        />
        <HoverVideo
          poster="/images/projects/envision/images/salle-lumiere-preview.png"
          src="/images/projects/envision/videos/fiona-canape.mp4"
          className="envision-double-video-right"
          classNameImg="envision-double-video-right-preview"
          classNameVideo="envision-double-video-right-video"
        />
      </section>

      <section className="envision-full-video">
        <HoverVideo
          poster="/images/projects/envision/images/envision-dj-preview.png"
          src="/images/projects/envision/videos/fin-drone.mp4"
          className="envision-full-video"
          classNameImg="envision-full-video-preview"
          classNameVideo="envision-full-video-video"
        />
      </section>

      <Description_Projet
        title={"Réalisation"}
        description={description_footer_realisation}
      />
      <Description_Projet
        title={"Éléments graphiques"}
        description={description_footer_elements_graphiques}
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

  //trouver le projet spécifique "envision"
  try {
    const entries = await client.getEntries({
      content_type: "projet",
      "fields.slug": "envision", // Filtrer par le slug du projet
    });

    console.log("Projet récupéré :", entries.items);

    if (entries.items.length > 0) {
      project = entries.items[0].fields;
      project.image = project.image?.fields?.file?.url
        ? `https:${project.image.fields.file.url}`
        : "";
    } else {
      console.error("Aucun projet trouvé avec le slug 'envision'");
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
