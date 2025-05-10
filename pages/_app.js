import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tadéo Design Studio</title>
        <link rel="icon" href="/favicon.ico" /> {/* ou favicon.png */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
