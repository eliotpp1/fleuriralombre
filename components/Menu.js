// components/Menu.js
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="menu-wrapper">
      <button className="burger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <img src="/images/fao.svg" alt="Logo" className="menu-logo" />
        <ul>
          <li>
            <a href="#projects">Nos Projets</a>
          </li>
          <li>
            <a href="#history">Notre Histoire</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
