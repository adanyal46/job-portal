import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles.scss";
import { Avatar, Dropdown, Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const profileData = user?.Profile[0]
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const serverUrl = "http://54.144.76.160:5000";

  let profileImage =
    profileData?.avatarUrl &&
    profileData?.avatarUrl.replace("http://your-server-url", serverUrl);

  const saveRouteToLocalStorage = (route) => {
    localStorage.setItem("lastRoute", route);
  };

  const goToNotificationsPage = () => {
    const route = "/notifications"; // Set the route to save
    saveRouteToLocalStorage(route); // Save the route in local storage
    navigate(route); // Navigate to the notifications page
  };

  const navbarHideAndShow = () => {
    setToggleNav((st) => !st);
  };

  const items = [
    {
      label: <Link to={"/"}>Profile</Link>,
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
          <NavLink
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="navbar-branding-link"
          >
            <figure className="branding-logo">
              <Image
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
          <NavLink
            className="navbar-items"
            to="/jobs/search?type=search"
            onClick={() => saveRouteToLocalStorage("/jobs/search?type=search")}
          >
            <li className="item-name">Jobs</li>
          </NavLink>

          <NavLink
            className="navbar-items"
            to="/mentors?type=myMentors"
            onClick={() => saveRouteToLocalStorage("/mentors?type=myMentors")}
          >
            <li className="item-name">Mentors</li>
          </NavLink>

          <NavLink className="navbar-items" to="/blogs" onClick={() => saveRouteToLocalStorage("/blogs")}>
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
                  src={profileImage || "/images/user-icon.png"}
                  alt="fuseUser"
                  preview={false}
                />
              </Dropdown>

              <figcaption className="user-name">
                {profileData?.fullname || "Guest"}
              </figcaption>
            </figure>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
