import Head from "next/head";
import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/components/hero.css";
import "../styles/components/portfolio.css";
import "../styles/components/aboutus.css";
import "../styles/components/contact.css";
import "../styles/components/video.css";
import "../styles/components/menu.css";
import "../styles/components/presentation.css";
import "../styles/components/sunflower.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Fleurir à l'ombre</title>
        <link rel="icon" href="/favicon.ico" />
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
        {typeof window !== "undefined" && window.innerWidth < 768 && (
          <link
            rel="preload"
            href="/videos/presentation-mobile.mp4"
            as="video"
            type="video/mp4"
            crossOrigin="anonymous"
          />
        )}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
