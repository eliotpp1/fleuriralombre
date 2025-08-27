import Head from "next/head";
import Maintenance from "@/components/Maintenance";
import "../styles/globals.css";
import "../styles/fonts/switzer.css";
import "../styles/fonts/instrumentserif.css";
import "../styles/components/hero.css";
import "../styles/components/portfolio-link.css";
import "../styles/components/contact.css";
import "../styles/components/video.css";
import "../styles/components/menu.css";
import "../styles/components/presentation.css";
import "../styles/components/sunflower.css";
import "../styles/components/competence.css";
import "../styles/components/MeetTheTeam/collaborator.css";
import "../styles/components/MeetTheTeam/ourhistory.css";
import "../styles/components/MeetTheTeam/ourreason.css";
import "../styles/components/footer.css";
import "../styles/components/nosprojets.css";
import "../styles/components/maintenance.css";
import "../styles/components/Projects/ProjectHeader.css";
import "../styles/components/Projects/Simone.css";
import "../styles/components/Description_Projet.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-indigo/theme.css"; // ou ton thème
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function App({ Component, pageProps }) {
  const isMaintenanceMode = false; // Toggle maintenance mode

  return (
    <>
      <Head>
        <title>Fleurir'A l'Ombre - Studio créatif multidisciplinaire</title>
        <meta
          name="description"
          content="fao.studio est un studio de design créatif spécialisé en graphisme, motion design et 3D"
        />
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Switzer/Switzer-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Switzer/Switzer-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Switzer/Switzer-Semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/logo.gtlf"
          as="model"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fleurir à l’ombre",
  "url": "https://fleuriralombre.com/",
  "logo": "https://fleuriralombre.com/images/fao.svg"
}
`}
        </script>
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
      </Head>
      <PrimeReactProvider>
        {isMaintenanceMode ? <Maintenance /> : <Component {...pageProps} />}
      </PrimeReactProvider>
    </>
  );
}
