import Head from "next/head";
import Maintenance from "@/components/Maintenance";
import SmallScreenWarning from "@/components/SmallScreenWarning";
import "../styles/globals.css";
import "../styles/fonts/grotesk.css";
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
import "../styles/components/description_Projet.css";
import "../styles/components/Projects/Livre_hda.css";
import "../styles/components/Projects/Hda.css";
import "../styles/components/Projects/Envision.css";
import "../styles/components/Projects/Teahupoo.css";
import "../styles/components/targetCursor.css";
import "../styles/components/smallcreenWarning.css";
import TargetCursor from "@/components/TargetCursor";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }) {
  const isMaintenanceMode = false;

  // Loader state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleEnd);
    router.events.on("routeChangeError", handleEnd);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleEnd);
      router.events.off("routeChangeError", handleEnd);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Fleurir'A l'Ombre - Studio créatif multidisciplinaire</title>
        <meta
          name="description"
          content="fao.studio est un studio de design créatif spécialisé en graphisme, motion design et 3D"
        />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fleurir à l’ombre",
              url: "https://fleuriralombre.com/",
              logo: "https://fleuriralombre.com/images/fao.svg",
            }),
          }}
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
      </Head>

      <TargetCursor />

      <PrimeReactProvider>
        {loading && <Loader />} {/* 👈 loader ici */}
        {isMaintenanceMode ? <Maintenance /> : <Component {...pageProps} />}
        <SmallScreenWarning />
      </PrimeReactProvider>
    </>
  );
}
