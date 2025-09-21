export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/projects" className="footer-link">
            <div className="footer-link-text">
              <span>Nos</span>
              <span>Projets</span>
            </div>
            <div className="arrow-container-footer">
              <div className="arrow-footer"></div>
            </div>
          </a>
          <a href="/notre-histoire" className="footer-link">
            <div className="footer-link-text">
              <span>Notre</span>
              <span>Histoire</span>
            </div>
            <div className="arrow-container-footer">
              <div className="arrow-footer"></div>
            </div>
          </a>
          <a href="/contact" className="footer-link">
            Contacts
            <div className="arrow-container-footer">
              <div className="arrow-footer"></div>
            </div>
          </a>
        </div>
        <div className="footer-logo">
          <img
            src="/images/fao-black.svg"
            alt="Logo Black"
            className="footer-logo-image footer-logo-default"
          />
          <img
            src="/images/fao-red.svg"
            alt="Logo Red"
            className="footer-logo-image footer-logo-red"
          />
        </div>
      </div>
      <div className="footer-credits">
        <p className="footer-credits-design-et-contenu">
          <strong>Design & contenu: </strong> Fleurir’A l’Ombre Studio
        </p>
        <p className="footer-credits-developpement">
          <strong>Développement: </strong> Eliot Pouplier
        </p>
      </div>
    </footer>
  );
}
