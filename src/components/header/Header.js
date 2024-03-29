import { Link, NavLink } from "react-router-dom";
import "./header.scss";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink end activeclassname="active" to="/">
              Characters
            </NavLink>
          </li>
          /{/* 1-var */}
          {/* <li>
            <NavLink end activeclassname="active" to="/comics">
              Comics
            </NavLink>
          </li> */}
          {/* 2-var */}
          <li>
            <NavLink activeclassname="active" to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
