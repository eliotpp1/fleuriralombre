import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { OurHistorySection } from "@/components/MeetTheTeam/OurHistory";
import { OurReasonSection } from "@/components/MeetTheTeam/Our-reason";
import { createClient } from "contentful";
import { MeetTheTeam } from "@/components/MeetTheTeam";

export default function NotreHistoire({
  collaborators,
  ourhistoryText,
  ourreasonText,
  ourhistoryImages = [],
}) {
  const [blackLogo, setBlackLogo] = useState(true);

  const reasonRef = useRef(null);
  const footerRef = useRef(null);
  useEffect(() => {
    const MENU_HEIGHT = 80; // adapte à la hauteur réelle de ton menu

    const observer = new IntersectionObserver(
      (entries) => {
        let reasonVisible = false;
        let footerVisible = false;

        entries.forEach((entry) => {
          if (entry.target === reasonRef.current) {
            reasonVisible = entry.isIntersecting;
          }
          if (entry.target === footerRef.current) {
            footerVisible = entry.isIntersecting;
          }
        });

        // Si raison OU footer visible → logo blanc
        if (reasonVisible || footerVisible) {
          setBlackLogo(false);
        } else {
          setBlackLogo(true);
        }
      },
      {
        threshold: 0, // dès que le bord supérieur atteint la zone observée
        rootMargin: `-${MENU_HEIGHT}px 0px -80% 0px`,
        // -80% en bas évite que ça déclenche trop tôt
      }
    );

    if (reasonRef.current) observer.observe(reasonRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Menu blackLogo={blackLogo} />
      <OurHistorySection
        ourhistoryText={ourhistoryText}
        ourhistoryImages={ourhistoryImages}
      />
      <MeetTheTeam collaborators={collaborators} />
      <div ref={reasonRef}>
        <OurReasonSection ourreasonText={ourreasonText} />
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let collaborators = [];
  let ourhistoryText = "";
  let ourreasonText = "";
  let ourhistoryImages = [];
  try {
    const ourHistoryEntries = await client.getEntries({
      content_type: "notreHistoireTexte",
    });

    if (ourHistoryEntries.items.length > 0) {
      ourhistoryText =
        ourHistoryEntries.items[0].fields.notreHistoireTexte || "";
    } else {
      console.warn("Aucun texte de notre histoire trouvé.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du texte de notre histoire:",
      error
    );
  }

  try {
    const ourReasonEntries = await client.getEntries({
      content_type: "notreRaisonTexte",
    });

    if (ourReasonEntries.items.length > 0) {
      ourreasonText = ourReasonEntries.items[0].fields.notreRaisonTexte || "";
    } else {
      console.warn("Aucun texte de notre raison trouvé.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du texte de notre raison:",
      error
    );
  }

  try {
    const collaboratorsEntries = await client.getEntries({
      content_type: "collaborateur",
    });

    console.log(
      "Entrées de collaborateurs récupérées:",
      collaboratorsEntries.items
    );

    collaborators = collaboratorsEntries.items.map((entry) => ({
      name: entry.fields.nomCollaborateur || "",
      role: entry.fields.metierCollaborateur || "",
      video: entry.fields.photoCollaborateur?.fields?.file?.url
        ? `https:${entry.fields.photoCollaborateur.fields.file.url}`
        : "",
      poster: entry.fields.posterCollaborateur?.fields?.file?.url,
    }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Contentful:",
      error
    );
  }

  try {
    const ourHistoryImagesEntries = await client.getEntries({
      content_type: "notreHistoireImage",
    });

    ourhistoryImages = ourHistoryImagesEntries.items.map((entry) => ({
      url: entry.fields.image?.fields?.file?.url
        ? `https:${entry.fields.image.fields.file.url}`
        : "",
      alt: entry.fields.image?.fields?.title || "Image de notre histoire",
    }));

    //reverse the order of images
    ourhistoryImages.reverse();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des images de notre histoire:",
      error
    );
  }

  return {
    props: {
      collaborators,
      ourhistoryText,
      ourreasonText,
      ourhistoryImages,
    },
  };
}
