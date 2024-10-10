import { Link, useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import CustomButton from "../customButton";
import CustomCollapse from "../customCollapse";
import { JobsIcon, MentorsIcon, SettingIcon, ContactFuseIcon, BookingsIcon, EarningsIcon, ReviewIcon, TimeSheetIcon } from "../../assets/svg";
import "./styles.scss";
import { Image } from "antd";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  let query = useQuery();
  const location = useLocation();
  const profile = user?.Profile[0];
  const serverUrl = "http://54.144.76.160:5000";

  // Replace placeholder with actual server URL
  let profileImage = profile?.avatarUrl && profile?.avatarUrl.replace("http://your-server-url", serverUrl);

  const searchParams = query.get("type");

  const onChange = (key) => {
    console.log(key);
  };

  // Determine user role
  const isMentor = user?.role === "MENTOR";
  const isSeeker = user?.role === "JOB_SEEKER";

  const items = [
    // Jobs section shown only for non-mentors
    ...(!isMentor
      ? [
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
                <Link to="/jobs/search?type=search" onClick={() => localStorage.setItem("lastRoute", "/jobs/search?type=search")}>
                  <li className={`collpase-item ${searchParams === "search" && "active"}`}>Search</li>
                </Link>

                <Link to="/jobs/search?type=applied" onClick={() => localStorage.setItem("lastRoute", "/jobs/search?type=applied")}>
                  <li className={`collpase-item ${searchParams === "applied" && "active"}`}>Applied Jobs</li>
                </Link>

                <Link to="/jobs/search?type=saved" onClick={() => localStorage.setItem("lastRoute", "/jobs/search?type=saved")}>
                  <li className={`collpase-item ${searchParams === "saved" && "active"}`}>Saved Jobs</li>
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
                <Link to="/mentors?type=myMentors"  onClick={() => localStorage.setItem("lastRoute", "/mentors?type=myMentors")}>
                  <li
                    className={`collpase-item ${
                      searchParams === "myMentors" && "active"
                    }`}
                  >
                    My Mentor
                  </li>
                </Link>
      
                <Link to="/bookings" onClick={() => localStorage.setItem("lastRoute", "/bookings")}>
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
        ]
      : []),

    // Bookings and additional sections shown only for mentors
    ...(isMentor
      ? [
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
                <Link to="/upcomingBookings" onClick={() => localStorage.setItem("lastRoute", "/upcomingBookings")}>
                  <li className={`collpase-item ${location.pathname === "/upcomingBookings" && "active"}`}>Upcoming Bookings</li>
                </Link>

                <Link to="/historyBookings" onClick={() => localStorage.setItem("lastRoute", "/historyBookings")}>
                  <li className={`collpase-item ${location.pathname === "/historyBookings" && "active"}`}>Booking History</li>
                </Link>
              </ul>
            ),
          },
          {
            key: "4",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to="/earnings" onClick={() => localStorage.setItem("lastRoute", "/earnings")}>
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
              <Link to="/reviews" onClick={() => localStorage.setItem("lastRoute", "/reviews")}>
                <section className="collapse-header-wrapper">
                  <ReviewIcon />
                  <h5 className="collapse-heading">Reviews</h5>
                </section>
              </Link>
            ),
          },
        ]
      : []),

    // Always show Settings
    {
      key: "7",
      showArrow: false,
      collapsible: "header",
      label: (
        <Link to="/settings" onClick={() => localStorage.setItem("lastRoute", "/settings")}>
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
      <button className="menu-toggle-button">
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
            style={{ borderRadius: "100px", maxHeight: "150px", objectFit: "cover" }}
            preview={false}
          />

          <figcaption className="sidebar-user-name">{profile?.fullname || "Guest"}</figcaption>
        </figure>

        <Link to={isSeeker ? "/" : "/mentor"} onClick={() => localStorage.setItem("lastRoute", isSeeker ? "/" : "/mentor")}>
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
