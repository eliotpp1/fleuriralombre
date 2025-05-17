export default function Menu() {
  return (
    <div className="menu-wrapper">
      <nav className="menu">
        <div className="menu-logo-wrapper">
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
        </div>
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
