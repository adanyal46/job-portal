import { Link, useLocation } from "react-router-dom";

import useQuery from "../../hooks/useQuery";

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
  let query = useQuery();
  const location = useLocation();

  const searchParams = query.get("type");

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
            <li
              className={`collpase-item ${
                searchParams === "search" && "active"
              }`}
            >
              Search
            </li>
          </Link>

          <Link to="/jobs/search?type=applied">
            <li
              className={`collpase-item ${
                searchParams === "applied" && "active"
              }`}
            >
              Applied Jobs
            </li>
          </Link>

          <Link to="/jobs/search?type=saved">
            <li
              className={`collpase-item ${
                searchParams === "saved" && "active"
              }`}
            >
              Saved Jobs
            </li>
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
          <Link to="/mentors?type=myMentors">
            <li
              className={`collpase-item ${
                searchParams === "myMentors" && "active"
              }`}
            >
              My Mentor
            </li>
          </Link>

          <Link to="/bookings">
            <li
              className={`collpase-item ${
                location.pathname === "/bookings" && "active"
              }`}
            >
              Bookings
            </li>
          </Link>
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
