export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>À propos</h4>
          <p>
            Fleurir à l'ombre est un studio créatif multidisciplinaire
            spécialisé dans le graphisme, le motion design et la 3D. Nous
            croyons en la puissance de la créativité pour transformer des idées
            en expériences visuelles uniques.
          </p>
        </div>

        <div className="footer-section">
          <h4>Liens utiles</h4>
          <ul>
            <li>
              <a href="/projects">Nos Projets</a>
            </li>
            <li>
              <a href="#aboutus">Notre Histoire</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email : fleuriralombre@gmail.com</p>
          <p>Téléphone : +33 6 12 34 56 78</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Fleurir à l'ombre. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
