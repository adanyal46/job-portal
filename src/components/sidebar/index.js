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
  DashboardEmployerSidebarIcon,
  JobListIcon,
  DashboardRecruiterIcon,
  SubscriptionDashboardIcon,
} from "../../assets/svg";
import "./styles.scss";
import { Image } from "antd";
import { getRelativePath } from "../../utils";

const Sidebar = ({ user, onClose }) => {
  let query = useQuery();
  const location = useLocation();
  const profile =
    user && user.Profile && user.Profile.length > 0 ? user.Profile[0] : null;

  const searchParams = query.get("type");

  // Role-based URL prefixes
  const isMentor = user?.role === "MENTOR";
  const isRecruiter = user?.role === "RECRUITER";
  const isEmployer = user?.role === "EMPLOYER";
  const isStaff = user?.role === "STAFF_MEMBER";
  const routePrefix = isMentor
    ? "/mentor"
    : isRecruiter
    ? "/recruiter"
    : isEmployer
    ? "/employer"
    : isStaff
    ? "/staff"
    : "/job-seeker";

  // Handle navigation for mobile - close drawer if needed
  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  const items = [
    // Jobs section only for job seekers
    ...(!isMentor && !isRecruiter && !isEmployer && !isStaff
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
                <Link
                  to={`${routePrefix}/jobs/search?type=search`}
                  onClick={handleNavigation}
                >
                  <li
                    className={`collpase-item ${
                      searchParams === "search" && "active"
                    }`}
                  >
                    Search
                  </li>
                </Link>

                <Link
                  to={`${routePrefix}/jobs/search?type=applied`}
                  onClick={handleNavigation}
                >
                  <li
                    className={`collpase-item ${
                      searchParams === "applied" && "active"
                    }`}
                  >
                    Applied Jobs
                  </li>
                </Link>

                <Link
                  to={`${routePrefix}/jobs/search?type=saved`}
                  onClick={handleNavigation}
                >
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
                <Link
                  to={`${routePrefix}/mentors?type=myMentors`}
                  onClick={handleNavigation}
                >
                  <li
                    className={`collpase-item ${
                      searchParams === "myMentors" && "active"
                    }`}
                  >
                    My Mentor
                  </li>
                </Link>

                <Link to={`${routePrefix}/bookings`} onClick={handleNavigation}>
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
            key: "mentor-dashboard",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/dashboard`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <DashboardEmployerSidebarIcon />
                  <h5 className="collapse-heading">Dashboard</h5>
                </section>
              </Link>
            ),
          },
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
                <Link
                  to={`${routePrefix}/upcoming-bookings`}
                  onClick={handleNavigation}
                >
                  <li
                    className={`collpase-item ${
                      location.pathname ===
                        `${routePrefix}/upcoming-bookings` && "active"
                    }`}
                  >
                    Upcoming Bookings
                  </li>
                </Link>

                <Link
                  to={`${routePrefix}/history-bookings`}
                  onClick={handleNavigation}
                >
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
            key: "4",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/earnings`} onClick={handleNavigation}>
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
                onClick={() => {
                  localStorage.setItem("lastRoute", `${routePrefix}/reviews`);
                  handleNavigation();
                }}
              >
                <section className="collapse-header-wrapper">
                  <ReviewIcon />
                  <h5 className="collapse-heading">Reviews</h5>
                </section>
              </Link>
            ),
          },
        ]
      : []),
    ...(isRecruiter
      ? [
          {
            key: "job-seeker",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/jobseekers`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <JobSeekerIcon />
                  <h5 className="collapse-heading">Job Seeker</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "time-sheet",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={"/recruiter/timesheet"} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <JobSeekerIcon />
                  <h5 className="collapse-heading">Timesheet</h5>
                </section>
              </Link>
            ),
          },
        ]
      : []),
    ...(isEmployer || isStaff
      ? [
          {
            key: "employer-dashboard",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/dashboard`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <DashboardEmployerSidebarIcon />
                  <h5 className="collapse-heading">Dashboard</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "employer-subscription",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link
                to={`${routePrefix}/subscriptions`}
                onClick={handleNavigation}
              >
                <section className="collapse-header-wrapper">
                  <SubscriptionDashboardIcon />
                  <h5 className="collapse-heading">Subscriptions &Upgrades</h5>
                </section>
              </Link>
            ),
          },

          {
            key: "employer-talent",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/talent`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <JobListIcon />
                  <h5 className="collapse-heading">Talent</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "employer-recruiter",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/recruiter`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <DashboardRecruiterIcon />
                  <h5 className="collapse-heading">Recruiter</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "employer-jobs",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/jobs`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <JobListIcon />
                  <h5 className="collapse-heading">Jobs</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "employer-hired-recruiter",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link
                to={`${routePrefix}/hired-recruiter`}
                onClick={handleNavigation}
              >
                <section className="collapse-header-wrapper">
                  <JobListIcon />
                  <h5 className="collapse-heading">Hired Recruiter</h5>
                </section>
              </Link>
            ),
          },
          {
            key: "employer-staffs",
            showArrow: false,
            collapsible: "header",
            label: (
              <Link to={`${routePrefix}/staffs`} onClick={handleNavigation}>
                <section className="collapse-header-wrapper">
                  <JobListIcon />
                  <h5 className="collapse-heading">Staff Member</h5>
                </section>
              </Link>
            ),
          },
        ].filter((menuItem) => !(isStaff && menuItem.key === "employer-staffs"))
      : []),
    // Settings section for both roles
    {
      key: "7",
      showArrow: false,
      collapsible: "header",
      label: (
        <Link
          to={`${routePrefix}/settings`}
          onClick={() => {
            localStorage.setItem("lastRoute", `${routePrefix}/settings`);
            handleNavigation();
          }}
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
      <section className="fuse-main-container">
        <figure className="fuse-user-sidebar-icon">
          <Image
            loading="lazy"
            className="sidebar-user-icon"
            src={
              process.env.REACT_APP_MEDIA_URL + profile?.avatarId ||
              "/images/no-image.jpg"
            }
            alt="fuseUser"
            style={{
              borderRadius: "100%",
              maxHeight: "135px",
              maxWidth: "135px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            preview={false}
          />

          <figcaption className="sidebar-user-name">
            {profile?.fullname || "Guest"}
          </figcaption>
        </figure>

        <Link
          to={`${routePrefix}/profile`}
          style={{ width: "100%" }}
          onClick={handleNavigation}
        >
          <CustomButton
            name="My Profile"
            style={{ width: "100%", marginBottom: "1rem" }}
          />
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
