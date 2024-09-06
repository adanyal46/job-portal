import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./styles.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const [toggleNav, setToggleNav] = useState(false);

  const goToNotificationsPage = () => {
    navigate("/notifications");
  };

  const navbarHideAndShow = () => {
    setToggleNav((st) => !st);
  };

  return (
    <header className="fuse-nav-container">
      <nav className="fuse-navbar">
        <picture className="navbar-branding">
          <NavLink
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="navbar-branding-link"
          >
            <figure className="branding-logo">
              <img
                loading="lazy"
                className="fuse-brand-logo"
                src="/images/fuse-nav-icon.png"
                alt="FuseWW"
              />
            </figure>
          </NavLink>
        </picture>

        <button
          className={`menu-toggle-button ${toggleNav && "show-nav"}`}
          onClick={navbarHideAndShow}
        >
          <span className="toggle-menu-bar" />
          <span className="toggle-menu-bar" />
          <span className="toggle-menu-bar" />
        </button>

        <ul className="navbar-links-wrapper">
          <NavLink className="navbar-items" to="/jobs/search?type=search">
            <li className="item-name">Jobs</li>
          </NavLink>

          <NavLink className="navbar-items" to="/mentors?type=myMentors">
            <li className="item-name">Mentors</li>
          </NavLink>

          <NavLink className="navbar-items" to="/blogs">
            <li className="item-name">Blogs</li>
          </NavLink>

          <li className="navbar-items">
            <figure className="notifications-icon">
              <img
                loading="lazy"
                className="bell-icon"
                src="/images/bell-icon.png"
                alt="fuseUser"
                onClick={goToNotificationsPage}
              />
            </figure>
          </li>

          <li className="navbar-items">
            <figure className="fuse-user-icon">
              <img
                loading="lazy"
                className="user-icon"
                src="/images/user-icon.png"
                alt="fuseUser"
              />

              <figcaption className="user-name">Alina Smith</figcaption>
            </figure>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
