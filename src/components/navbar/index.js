import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles.scss";
import { Dropdown, Image, message } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { getRelativePath } from "../../utils";

const Navbar = ({ user }) => {
  const profileData = user && user.Profile && user.Profile.length > 0 ? user.Profile[0] : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const baseUrl = process.env.REACT_APP_NODE_ENV === "development" ? "http://54.144.76.160:5000" : "https://jobportal-fuse.netlify.app";
  const fullAvatarUrl = profileData?.avatarUrl || "";
  const relativeAvatarUrl = getRelativePath(fullAvatarUrl, baseUrl);

  const isMentor = user?.role === "MENTOR";
  // const isSeeker = user?.role === "JOB_SEEKER";
  const isRecruiter = user?.role === "RECRUITER";
  const isEmployer = user?.role === "EMPLOYER";
  const routePrefix = isMentor ? "/mentor" : isRecruiter ? "/recruiter" : isEmployer ? "/employer" : "/job-seeker";

  const goToNotificationsPage = () => {
    const route = routePrefix + "/notifications"; // Set the route to save
    navigate(route); // Navigate to the notifications page
  };

  const navbarHideAndShow = () => {
    setToggleNav((st) => !st);
  };

  const items = [
    {
      label: <Link to={routePrefix + "/profile"}>Profile</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "logout",
      danger: true,
    },
  ];

  const handleClick = async (event) => {
    if (event.key === "logout") {
      await dispatch(logout());
      window.location.replace("/login");
      message.open({
        type: "success",
        content: "Logout Successfully!",
      });
    }
  };

  return (
    <header className="fuse-nav-container">
      <nav className="fuse-navbar">
        <picture className="navbar-branding">
          <NavLink to="/" onClick={() => window.scrollTo(0, 0)} className="navbar-branding-link">
            <figure className="branding-logo">
              <Image loading="lazy" className="fuse-brand-logo" src="/images/fuse-nav-icon.png" alt="FuseWW" />
            </figure>
          </NavLink>
        </picture>

        <button className={`menu-toggle-button ${toggleNav && "show-nav"}`} onClick={navbarHideAndShow}>
          <span className="toggle-menu-bar" />
          <span className="toggle-menu-bar" />
          <span className="toggle-menu-bar" />
        </button>

        <ul className="navbar-links-wrapper">
          {user?.role === "JOB_SEEKER" && (
            <NavLink className="navbar-items" to="/job-seeker/jobs/search?type=search">
              <li className="item-name">Jobs</li>
            </NavLink>
          )}

          {user?.role === "JOB_SEEKER" && (
            <NavLink className="navbar-items" to="/job-seeker/mentors?type=myMentors">
              <li className="item-name">Mentors</li>
            </NavLink>
          )}

          {user?.role !== "RECRUITER" && (
            <NavLink className="navbar-items" to={routePrefix + "/blogs"}>
              <li className="item-name">Blogs</li>
            </NavLink>
          )}

          <li className="navbar-items">
            <figure className="notifications-icon">
              <img loading="lazy" className="bell-icon" src="/images/bell-icon.png" alt="fuseUser" onClick={goToNotificationsPage} />
            </figure>
          </li>

          <li className="navbar-items">
            <figure className="fuse-user-icon">
              <Dropdown
                menu={{
                  items,
                  onClick: handleClick,
                }}
                trigger={["click"]}
                overlayStyle={{
                  width: "200px",
                }}
              >
                <Image
                  loading="lazy"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  className="user-icon"
                  src={relativeAvatarUrl || "/images/user-icon.png"}
                  alt="fuseUser"
                  preview={false}
                />
              </Dropdown>

              <figcaption className="user-name">{profileData?.fullname || "Guest"}</figcaption>
            </figure>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
