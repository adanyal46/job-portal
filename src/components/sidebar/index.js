import { Link } from "react-router-dom";

import CustomButton from "../customButton";
import CustomCollapse from "../customCollapse";

import {
  JobsIcon,
  MentorsIcon,
  SettingIcon,
  ContactFuseIcon,
} from "../../assets/svg";

import "./styles.scss";

const Sidebar = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <section className="collapse-header-wrapper">
          <JobsIcon />
          <h5 className="collapse-heading">Jobs</h5>
        </section>
      ),
      children: (
        <ul className="collpase-items-list">
          <Link to="/jobs/search?type=search">
            <li className="collpase-item">Search</li>
          </Link>

          <Link to="/jobs/search?type=applied">
            <li className="collpase-item">Applied Jobs</li>
          </Link>

          <Link to="/jobs/search?type=saved">
            <li className="collpase-item">Saved Jobs</li>
          </Link>
        </ul>
      ),
    },
    {
      key: "2",
      label: (
        <section className="collapse-header-wrapper">
          <MentorsIcon />
          <h5 className="collapse-heading">Mentors</h5>
        </section>
      ),
      children: (
        <ul className="collpase-items-list">
          <li className="collpase-item">My Mentor</li>
          <li className="collpase-item">Bookings</li>
        </ul>
      ),
    },
    {
      key: "3",
      showArrow: false,
      collapsible: "header",
      label: (
        <Link to="/settings">
          <section className="collapse-header-wrapper">
            <SettingIcon />
            <h5 className="collapse-heading">Settings</h5>
          </section>
        </Link>
      ),
    },
  ];

  return (
    <aside className="fuse-main-sidebar-wrapper">
      <button
        className="menu-toggle-button"
        // className={classNames({
        //   "menu-toggle-button": true,
        //   "show-nav": toggleNav,
        // })}
        // onClick={navbarHideAndShow}
      >
        <span className="toggle-menu-bar" />
        <span className="toggle-menu-bar" />
        <span className="toggle-menu-bar" />
      </button>

      <section className="fuse-main-container">
        <figure className="fuse-user-sidebar-icon">
          <img
            loading="lazy"
            className="sidebar-user-icon"
            src="/images/sidebar-user-icon.png"
            alt="fuseUser"
          />

          <figcaption className="sidebar-user-name">Alina Smith</figcaption>
        </figure>

        <CustomButton name="My Profile" />

        <CustomCollapse items={items} onChange={onChange} />
      </section>

      <p className="contact-fuse-footer">
        <ContactFuseIcon /> Contact Fuse
      </p>
    </aside>
  );
};

export default Sidebar;
