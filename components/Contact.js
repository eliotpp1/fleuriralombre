export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Contactez-nous</h2>
      <form className="contact-form">
        <input type="text" placeholder="Nom" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message" rows="4"></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}
