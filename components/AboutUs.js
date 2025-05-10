export default function AboutUs({ about }) {
  return (
    <section className="aboutus">
      <div className="aboutus-content">
        <h2 className="aboutus-title">À propos de nous</h2>
        <p className="aboutus-text">{about.description}</p>
        {about.image && (
          <img src={about.image} alt="À propos" className="aboutus-image" />
        )}
      </div>
    </section>
  );
}
