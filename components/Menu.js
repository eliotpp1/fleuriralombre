import { useState } from "react";
import { Menu as BurgerIcon, X as CloseIcon } from "lucide-react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Burger visible uniquement sur petits écrans */}
      <button className="burger-button" onClick={toggleMenu} aria-label="Menu">
        {isOpen ? <CloseIcon size={54} /> : <BurgerIcon size={54} />}
      </button>

      {/* Menu principal */}
      <div className={`menu-wrapper ${isOpen ? "open" : ""}`}>
        <nav className="menu">
          <div className="menu-logo-wrapper">
            <a href="/" className="menu-logo-link">
              <img
                src="/images/fao.svg"
                alt="Logo Default"
                className="menu-logo menu-logo-default"
              />
              <img
                src="/images/fao-red.svg"
                alt="Logo Red"
                className="menu-logo menu-logo-red"
              />
            </a>
          </div>
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
        </nav>
      </div>
    </>
  );
}
