import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles.scss";
import { Dropdown, message, Menu, Button, Space, Avatar } from "antd";
import { MenuOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = ({ user, onToggleSidebar, sidebarOpen }) => {
  const profileData =
    user && user.Profile && user.Profile.length > 0 ? user.Profile[0] : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check window size on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMentor = user?.role === "MENTOR";
  const isRecruiter = user?.role === "RECRUITER";
  const isEmployer = user?.role === "EMPLOYER";
  const isStaff = user?.role === "STAFF_MEMBER";
  const isJobSeeker = user?.role === "JOB_SEEKER";
  const routePrefix = isMentor
    ? "/mentor"
    : isRecruiter
    ? "/recruiter"
    : isEmployer
    ? "/employer"
    : "/job-seeker";

  const goToNotificationsPage = () => {
    const route = routePrefix + "/notifications";
    navigate(route);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.replace("/login");
    message.success("Logout Successfully!");
  };

  // Dropdown menu for user profile
  const userMenu = (
    <Menu
      items={[
        {
          key: "profile",
          label: <Link to={routePrefix + "/profile"}>Profile</Link>,
        },
        {
          key: "logout",
          danger: true,
          label: <span onClick={handleLogout}>Logout</span>,
        },
      ]}
    />
  );

  // Navigation menu items
  const navItems = [];

  if (isJobSeeker) {
    navItems.push(
      {
        key: "jobs",
        label: <NavLink to="/job-seeker/jobs/search?type=search">Jobs</NavLink>,
      },
      {
        key: "mentors",
        label: (
          <NavLink to="/job-seeker/mentors?type=myMentors">Mentors</NavLink>
        ),
      }
    );
  }

  if (!["RECRUITER", "STAFF_MEMBER", "EMPLOYER"].includes(user?.role)) {
    navItems.push({
      key: "blogs",
      label: <NavLink to={routePrefix + "/blogs"}>Blogs</NavLink>,
    });
  }

  // Mobile menu
  const mobileMenu = (
    <Menu
      items={[
        ...(isJobSeeker
          ? [
              {
                key: "jobs",
                label: (
                  <NavLink to="/job-seeker/jobs/search?type=search">
                    Jobs
                  </NavLink>
                ),
              },
              {
                key: "mentors",
                label: (
                  <NavLink to="/job-seeker/mentors?type=myMentors">
                    Mentors
                  </NavLink>
                ),
              },
            ]
          : []),
        ...(!["RECRUITER", "STAFF_MEMBER", "EMPLOYER"].includes(user?.role)
          ? [
              {
                key: "blogs",
                label: <NavLink to={routePrefix + "/blogs"}>Blogs</NavLink>,
              },
            ]
          : []),
        {
          key: "notifications",
          label: <span onClick={goToNotificationsPage}>Notifications</span>,
        },
        {
          key: "profile",
          label: <Link to={routePrefix + "/profile"}>Profile</Link>,
        },
        {
          key: "logout",
          danger: true,
          label: <span onClick={handleLogout}>Logout</span>,
        },
      ]}
    />
  );

  return (
    <header className="ant-navbar-container">
      <div className="ant-navbar">
        <div className="logo-section">
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={onToggleSidebar}
              className={`sidebar-toggle ${sidebarOpen ? "active" : ""}`}
            />
          )}

          <NavLink to={routePrefix + "/profile"} className="logo-link">
            <img
              src="/images/fuse-nav-icon.svg"
              alt="FuseWW"
              className="logo-image"
            />
          </NavLink>
        </div>

        <div className="navbar-right">
          {/* Desktop Navigation - REPLACED WITH CUSTOM MENU */}
          {!isMobile && (
            <div className="custom-nav-menu">
              {navItems.map((item) => (
                <div key={item.key} className="menu-item">
                  {item.label}
                </div>
              ))}
            </div>
          )}

          {/* Notifications */}
          <Button
            type="text"
            icon={<BellOutlined />}
            onClick={goToNotificationsPage}
            className="notification-btn"
          />

          {/* User Profile Dropdown */}
          {!isMobile ? (
            <Dropdown
              overlay={userMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Space className="user-dropdown">
                <Avatar
                  src={
                    process.env.REACT_APP_MEDIA_URL + profileData?.avatarId ||
                    "/images/no-image.jpg"
                  }
                  size="small"
                />
                <span className="username">
                  {profileData?.fullname || "Guest"}
                </span>
                <DownOutlined />
              </Space>
            </Dropdown>
          ) : (
            <Dropdown
              overlay={mobileMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<MenuOutlined />}
                className="mobile-menu-btn"
              />
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
