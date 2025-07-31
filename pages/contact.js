// pages/index.js
import Contact from "../components/Contact";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

export default function ContactPage() {
  return (
    <main>
      <Menu blackLogo={true} />
      <Contact />
      <Footer />
    </main>
  );
}
