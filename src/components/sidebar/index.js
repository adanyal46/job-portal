import { Link, useLocation } from "react-router-dom";

import useQuery from "../../hooks/useQuery";

import CustomButton from "../customButton";
import CustomCollapse from "../customCollapse";

import {
  JobsIcon,
  MentorsIcon,
  SettingIcon,
  ContactFuseIcon,
  BookingsIcon,
  EarningsIcon,
  ReviewIcon,
  TimeSheetIcon,
} from "../../assets/svg";

import "./styles.scss";
import { Image } from "antd";

const Sidebar = ({ user }) => {
  let query = useQuery();
  const location = useLocation();
  const profile = user?.Profile[0];
  const serverUrl = "http://54.144.76.160:5000";

  // Replace placeholder with actual server URL
  let profileImage =
    profile?.avatarUrl &&
    profile?.avatarUrl.replace("http://your-server-url", serverUrl);

  const searchParams = query.get("type");

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <section className="collapse-header-wrapper">
          <BookingsIcon />
          <h5 className="collapse-heading">Bookings</h5>
        </section>
      ),
      children: (
        <ul className="collpase-items-list">
          <Link to="/upcomingBookings">
            <li
              className={`collpase-item ${
                location.pathname === "/upcomingBookings" && "active"
              }`}
            >
              Upcoming Bookings
            </li>
          </Link>

          <Link to="/historyBookings">
            <li
              className={`collpase-item ${
                location.pathname === "/historyBookings" && "active"
              }`}
            >
              Booking History
            </li>
          </Link>
        </ul>
      ),
    },
    {
      key: "2",
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
      key: "3",
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
      key: "4",
      showArrow: false,
      collapsible: "header",
      label: (
        <Link to="/earnings">
          <section className="collapse-header-wrapper">
            <EarningsIcon />
            <h5 className="collapse-heading">Earnings</h5>
          </section>
        </Link>
      ),
    },
    {
      key: "5",
      showArrow: false,
      collapsible: "header",
      label: (
        <Link to="/reviews">
          <section className="collapse-header-wrapper">
            <ReviewIcon />
            <h5 className="collapse-heading">Reviews</h5>
          </section>
        </Link>
      ),
    },
    // {
    //   key: "6",
    //   showArrow: false,
    //   collapsible: "header",
    //   label: (
    //     <Link to="/timesheet">
    //       <section className="collapse-header-wrapper">
    //         <TimeSheetIcon />
    //         <h5 className="collapse-heading">Timesheet</h5>
    //       </section>
    //     </Link>
    //   ),
    // },
    {
      key: "6",
      label: (
        <Link to="/timesheet">
          <section className="collapse-header-wrapper">
            <MentorsIcon />
            <h5 className="collapse-heading">Timesheet</h5>
          </section>
        </Link>
      ),
      children: (
        <ul className="collpase-items-list">
          <Link to="/add-timesheet">
            <li
              className={`collpase-item ${
                location.pathname === "/add-timesheet" && "active"
              }`}
            >
              Add Timesheet
            </li>
          </Link>

          <Link to="/view-timesheet">
            <li
              className={`collpase-item ${
                location.pathname === "/view-timesheet" && "active"
              }`}
            >
              View Timesheet
            </li>
          </Link>
        </ul>
      ),
    },
    {
      key: "7",
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
          <Image
            loading="lazy"
            className="sidebar-user-icon"
            src={profileImage || "/images/sidebar-user-icon.png"}
            alt="fuseUser"
            style={{ borderRadius: "100px", maxHeight:"150px", objectFit:'cover' }}
            preview={false}
          />

          <figcaption className="sidebar-user-name">
            {profile?.fullname || "Guest"}
          </figcaption>
        </figure>

        <Link to={"/"}>
          <CustomButton name="My Profile" />
        </Link>

        <CustomCollapse items={items} onChange={onChange} />
      </section>

      <p className="contact-fuse-footer">
        <ContactFuseIcon /> Contact Fuse
      </p>
    </aside>
  );
};

export default Sidebar;
