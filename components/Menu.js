import { useState } from "react";

export default function Menu({ blackLogo = false }) {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <nav>
        <div className="menu-wrapper-test">
          <div className="menu-title-test">
            <a href="/" className="menu-logo-link">
              {blackLogo ? (
                <img
                  src="/images/fao-black.svg"
                  alt="Logo Black"
                  className="menu-logo menu-logo-default"
                />
              ) : (
                <img
                  src="/images/fao.svg"
                  alt="Logo Default"
                  className="menu-logo menu-logo-default"
                />
              )}
              <img
                src="/images/fao-red.svg"
                alt="Logo Red"
                className="menu-logo menu-logo-red"
              />
            </a>
          </div>
          <ul className="menu-list-test">
            <li>
              <a href="/projects" className={blackLogo ? "black" : ""}>
                Nos Projets
              </a>
            </li>
            <li>
              <a href="/notre-histoire" className={blackLogo ? "black" : ""}>
                Notre Histoire
              </a>
            </li>
            <li>
              <a href="/contact" className={blackLogo ? "black" : ""}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="menu-mobile">
        <div className="mobile-header">
          <div className="mobile-header-logo">
            <a href="/" className="menu-logo-link">
              {blackLogo ? (
                <img
                  src="/images/fao-black.svg"
                  alt="Logo Black"
                  className="menu-logo"
                />
              ) : (
                <img
                  src="/images/fao.svg"
                  alt="Logo Default"
                  className="menu-logo"
                />
              )}
            </a>
          </div>
          <div
            className={`arrow-menu-container-presentation ${
              isOpened ? "opened" : ""
            }`}
            onClick={() => setIsOpened(!isOpened)}
          >
            <div
              className={`arrow-presentation ${blackLogo ? "black" : ""}`}
            ></div>
            <div className={`menu-wrapper ${isOpened ? "opened" : ""}`}>
              <ul className={`menu-list ${isOpened ? "opened" : ""}`}>
                <li>
                  <a href="/projects" className={blackLogo ? "black" : ""}>
                    Nos Projets
                  </a>
                </li>
                <li>
                  <a
                    href="/notre-histoire"
                    className={blackLogo ? "black" : ""}
                  >
                    Notre Histoire
                  </a>
                </li>
                <li>
                  <a href="/contact" className={blackLogo ? "black" : ""}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
