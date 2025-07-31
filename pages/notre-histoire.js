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
  return (
    <main
      style={{
        cursor: 'url("/cursor-black.svg") 16 16, auto',
      }}
    >
      <Menu blackLogo={true} />
      <OurHistorySection
        ourhistoryText={ourhistoryText}
        ourhistoryImages={ourhistoryImages}
      />
      <MeetTheTeam collaborators={collaborators} />
      <OurReasonSection ourreasonText={ourreasonText} />
      <Footer />
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
      console.log("Texte de notre raison récupéré:", ourreasonText);
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

    collaborators = collaboratorsEntries.items.map((entry) => ({
      name: entry.fields.nomCollaborateur || "",
      role: entry.fields.metierCollaborateur || "",
      video: entry.fields.photoCollaborateur?.fields?.file?.url
        ? `https:${entry.fields.photoCollaborateur.fields.file.url}`
        : "",
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

    console.log(
      "Entrées d'images de notre histoire récupérées:",
      ourHistoryImagesEntries.items
    );

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
