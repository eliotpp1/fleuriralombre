import Head from "next/head";
import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/components/hero.css";
import "../styles/components/portfolio.css";
import "../styles/components/aboutus.css";
import "../styles/components/contact.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Fleurir à l'ombre</title>
        <link rel="icon" href="/favicon.ico" />
        <title>Tadéo Design Studio</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Tagesschrift-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
