import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const getNavLink = ({ isActive }) =>
  clsx(css.link, {
    [css.active]: isActive,
  });

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.navContainer}>
        <nav className={css.navigation}>
          <NavLink className={getNavLink} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLink} to="/movies">
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
