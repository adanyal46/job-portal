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
  JobSeekerIcon,
} from "../../assets/svg";
import "./styles.scss";
import { Image } from "antd";
import { getRelativePath } from "../../utils";

const Sidebar = ({ user }) => {
  let query = useQuery();
  const location = useLocation();
  const profile =
    user && user.Profile && user.Profile.length > 0 ? user.Profile[0] : null;
  const baseUrl =
    process.env.REACT_APP_NODE_ENV === "development"
      ? "http://54.144.76.160:5000"
      : "https://jobportal-fuse.netlify.app";
  const fullAvatarUrl = profile?.avatarUrl || "";
  const relativeAvatarUrl = getRelativePath(fullAvatarUrl, baseUrl);

  const searchParams = query.get("type");

  // Role-based URL prefixes
  const isMentor = user?.role === "MENTOR";
  const isRecruiter = user?.role === "RECRUITER";
  const routePrefix = isMentor
    ? "/mentor"
    : isRecruiter
    ? "/recruiter"
    : "/job-seeker";

  const items = [
    // Jobs section only for job seekers
    ...(!isMentor && !isRecruiter
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
                <Link to={`${routePrefix}/jobs/search?type=search`}>
                  <li
                    className={`collpase-item ${
                      searchParams === "search" && "active"
                    }`}
                  >
                    Search
                  </li>
                </Link>

                <Link to={`${routePrefix}/jobs/search?type=applied`}>
                  <li
                    className={`collpase-item ${
                      searchParams === "applied" && "active"
                    }`}
                  >
                    Applied Jobs
                  </li>
                </Link>

                <Link to={`${routePrefix}/jobs/search?type=saved`}>
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
                <Link to={`${routePrefix}/mentors?type=myMentors`}>
                  <li
                    className={`collpase-item ${
                      searchParams === "myMentors" && "active"
                    }`}
                  >
                    My Mentor
                  </li>
                </Link>

                <Link to={`${routePrefix}/bookings`}>
                  <li
                    className={`collpase-item ${
                      location.pathname === `${routePrefix}/bookings` &&
                      "active"
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

    // Mentor-only sections
    ...(isMentor || isRecruiter
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
                <Link to={`${routePrefix}/upcoming-bookings`}>
                  <li
                    className={`collpase-item ${
                      location.pathname ===
                        `${routePrefix}/upcoming-bookings` && "active"
                    }`}
                  >
                    Upcoming Bookings
                  </li>
                </Link>

                <Link to={`${routePrefix}/history-bookings`}>
                  <li
                    className={`collpase-item ${
                      location.pathname === `${routePrefix}/history-bookings` &&
                      "active"
                    }`}
                  >
                    Booking History
                  </li>
                </Link>
              </ul>
            ),
          },
          {
            key: "job-seeker",
            showArrow: false,
            collapsible: "header",
            label: (
              // <Link to={`${routePrefix}/earnings`}>
              <section className="collapse-header-wrapper">
                <JobSeekerIcon />
                <h5 className="collapse-heading">Job Seeker</h5>
              </section>
              // </Link>
            ),
          },

          {
            key: "4",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/earnings`}>
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
              <Link
                to={`${routePrefix}/reviews`}
                onClick={() =>
                  localStorage.setItem("lastRoute", `${routePrefix}/reviews`)
                }
              >
                <section className="collapse-header-wrapper">
                  <ReviewIcon />
                  <h5 className="collapse-heading">Reviews</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "time-sheet",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={"/recruiter/timesheet"}>
                <section className="collapse-header-wrapper">
                  <JobSeekerIcon />
                  <h5 className="collapse-heading">Timesheet</h5>
                </section>
              </Link>
            ),
          },
        ]
      : []),

    // Settings section for both roles
    {
      key: "7",
      showArrow: false,
      collapsible: "header",
      label: (
        <Link
          to={`${routePrefix}/settings`}
          onClick={() =>
            localStorage.setItem("lastRoute", `${routePrefix}/settings`)
          }
        >
          <section className="collapse-header-wrapper">
            <SettingIcon />
            <h5 className="collapse-heading">Settings</h5>
          </section>
        </Link>
      ),
    },
  ];

  const onChange = () => {};

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
            src={relativeAvatarUrl || "/images/sidebar-user-icon.png"}
            alt="fuseUser"
            style={{
              borderRadius: "100px",
              maxHeight: "150px",
              objectFit: "cover",
            }}
            preview={false}
          />

          <figcaption className="sidebar-user-name">
            {profile?.fullname || "Guest"}
          </figcaption>
        </figure>

        <Link to={`${routePrefix}/profile`}>
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
