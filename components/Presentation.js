export default function Presentation() {
  return (
    <section className="presentation" id="presentation">
      <div className="presentation-content">
        <h2 className="studio-title">Studio</h2>
        <h2 className="multidisciplinaire-title">MULTIDISCIPLINAIRE</h2>

        <div className="location">
          <h3 className="location-city">Montréal</h3>
          <div
            className="arrow-container-presentation"
          >
            <div className="arrow-presentation"></div>
          </div>
          <h3 className={`location-city`}>
            Tahiti
          </h3>
        </div>
      </div>
    </section>
  );
}
