import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "./features/profile/profileSlice";
import Loader from "./components/Loader";
import { Drawer, message } from "antd";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Show welcome message when user data loads
  useEffect(() => {
    if (user && !loading) {
      // Check if welcome message has been shown in this session
      const welcomeShown = sessionStorage.getItem("welcomeMessageShown");

      if (!welcomeShown) {
        // Show a simple welcome message with the user's name
        message.success(
          `Welcome, ${user?.Profile?.[0]?.fullname || "User"}!`,
          3
        );

        // Mark welcome message as shown for this session
        sessionStorage.setItem("welcomeMessageShown", "true");
      }
    }
  }, [user, loading]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Close drawer when resizing to desktop
      if (!mobile && drawerVisible) {
        setDrawerVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawerVisible]);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-wrapper">
      <section className="fuse-main-wrapper">
        <Navbar
          user={user}
          onToggleSidebar={toggleDrawer}
          sidebarOpen={drawerVisible}
        />
        <main className="fuse-main-body">
          {/* Sidebar for Desktop */}
          {!isMobile && (
            <div className="sidebar-container">
              <Sidebar user={user} />
            </div>
          )}

          {/* Drawer for Mobile */}
          <Drawer
            title={null}
            placement="left"
            closable={false}
            onClose={closeDrawer}
            open={isMobile && drawerVisible}
            width={280}
            bodyStyle={{ padding: 0 }}
            contentWrapperStyle={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
            style={{ position: "absolute" }}
          >
            <div className="sidebar-drawer-container">
              <Sidebar user={user} onClose={closeDrawer} />
            </div>
          </Drawer>

          {/* Main Content Area */}
          <div className="content-container">
            <Outlet context={user} />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Layout;
