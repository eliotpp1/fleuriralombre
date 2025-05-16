export default function Presentation() {
    return (
        <section className="presentation" id="presentation">
            <div className="presentation-content">
                <h2 className="studio-title">Studio</h2>
                <h2 className="multidisciplinaire-title">Multidisciplinaire</h2>
                <ul className="services-item">
                    <li className="services-item">Graphisme -</li>
                    <li className="services-item">Vidéo -</li>
                    <li className="services-item">Motion -</li>
                    <li className="services-item">3D -</li>
                    <li className="services-item">Photo</li>
                </ul>
                <div className="location">
                    <h3 className="location-city">MONTRÉAL</h3>
                    <img src="/images/arrow-red.png" alt="Location" className="location-icon" />
                    <h3 className="location-city">TAHITI</h3>
                </div>
            </div>
        </section>
    );
}