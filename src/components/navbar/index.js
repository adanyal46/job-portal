import { NavLink, useNavigate } from "react-router-dom";

import "./styles.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const goToNotificationsPage = () => {
    navigate("/notifications");
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
            <figure
              className="branding-logo"
              //   onClick={() => setNavToggle(false)}
            >
              <img
                loading="lazy"
                className="fuse-brand-logo"
                src="/images/fuse-nav-icon.png"
                alt="FuseWW"
              />
            </figure>
          </NavLink>
        </picture>

        <ul className="navbar-links-wrapper">
          {/* <Link
            to={navItemsName.url}
            key={`nav-item # ${index}`}
            className={activePathName === "/" ? "highlight-parent" : ""}
          >
            <li className="navbar-items">{navItemsName.menu_item}</li>
          </Link> */}
          <li className="navbar-items">Jobs</li>
          <li className="navbar-items">Mentors</li>
          <li className="navbar-items">Blogs</li>

          <figure className="notifications-icon">
            <img
              loading="lazy"
              className="bell-icon"
              src="/images/bell-icon.png"
              alt="fuseUser"
              onClick={goToNotificationsPage}
            />
          </figure>

          <figure className="fuse-user-icon">
            <img
              loading="lazy"
              className="user-icon"
              src="/images/user-icon.png"
              alt="fuseUser"
            />

            <figcaption className="user-name">Alina Smith</figcaption>
          </figure>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
