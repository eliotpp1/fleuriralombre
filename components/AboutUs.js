export default function AboutUs({ about }) {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <img src={about.image} alt="About us" />
        <div className="about-text">
          <h2>À propos de nous</h2>
          <p>{about.description}</p>
        </div>
      </div>
    </section>
  );
}
