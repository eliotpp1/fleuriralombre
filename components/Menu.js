// components/Menu.js
export default function Menu() {
  return (
    <div className="menu-wrapper">

      <nav className="menu">
        <img src="/images/fao.svg" alt="Logo" className="menu-logo" />
        <ul>
          <li>
            <a href="#portfolio">Nos Projets</a>
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
  );
}
