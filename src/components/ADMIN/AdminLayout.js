import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  ConfigProvider,
  Flex,
  Image,
  Layout,
  Menu,
  message,
  Button,
  Drawer,
} from "antd";
import {
  AdminBlogIcon,
  AdminCommonManagementIcon,
  AdminDashboardIcon,
  AdminEditPostIcon,
  AdminGeneralManagementIcon,
  AdminListIcon,
  AdminLogoutIcon,
  AdminNotificationIcon,
  AdminPageIcon,
  AdminPaymentIcon,
  AdminRequestIcon,
  AdminTimesheetIcon,
  AdminUserMangIcon,
} from "../../assets/svg";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/admin/dashboard", <AdminDashboardIcon />),
  getItem("Notifications", "/admin/notifications", <AdminNotificationIcon />),
  getItem("User Management", "user-management", <AdminUserMangIcon />, [
    getItem("Employers", "/admin/user/employers"),
    getItem("Recruiters", "/admin/user/recruiters"),
    getItem("Mentors", "/admin/user/mentors"),
    getItem("Job Seeker", "/admin/user/job-seekers"),
    getItem("Staff", "/admin/user/staffs"),
  ]),
  getItem("Timesheet", "/admin/timesheet-management", <AdminTimesheetIcon />),
  getItem("Requests", "admin-request", <AdminRequestIcon />, [
    getItem(
      "Mentor Profile Requests",
      "/admin/mentor-profile-approval-requests"
    ),
    getItem(
      "Recruiter Profile Requests",
      "/admin/recruiter-profile-approval-requests"
    ),
    getItem("Hire Recruiter Requests", "/admin/hire-recruiter"),
  ]),
  getItem("Pages", "/admin/pages", <AdminPageIcon />),
  getItem(
    "Common Management",
    "common-managment",
    <AdminCommonManagementIcon />,
    [
      getItem("Industries", "/admin/industries"),
      getItem("Mentor Services", "/admin/mentor-services"),
      getItem("Recruiter Services", "/admin/recruiter-services"),
      getItem("Languages", "/admin/languages"),
      getItem("Skills", "/admin/skills"),
    ]
  ),
  getItem(
    "General Management",
    "general-managment",
    <AdminGeneralManagementIcon />,
    [
      getItem("About Us", "/admin/about"),
      getItem("Terms & Conditions", "/admin/term-condition"),
      getItem("Privacy Policy", "/admin/privacy-policy"),
    ]
  ),

  getItem("Blogs", "/admin/blogs", <AdminBlogIcon />),
  getItem("Payments", "/admin/payments", <AdminPaymentIcon />),
  getItem("Popup Info", "/admin/popup-info", <AdminTimesheetIcon />),
  getItem("Edit Post Note", "/admin/edit-post-note", <AdminEditPostIcon />),
  getItem("Settings", "/admin/settings", <AdminTimesheetIcon />),
  getItem("Logout", "/admin/logout", <AdminLogoutIcon />),
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileView, setMobileView] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = (obj) => {
    if (obj.key === "/admin/logout") {
      localStorage.removeItem("token");
      message.open({
        type: "success",
        content: "Logout Successfully!",
      });
      window.location.reload();
    } else {
      navigate(obj.key);
      if (mobileView) {
        setDrawerVisible(false);
      }
    }
  };

  const renderSidebar = () => (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ paddingBlock: "20px", width: "100%" }}
      >
        <Image
          src="/images/sidebar-user-icon.png"
          width={mobileView ? 40 : 80}
          height={mobileView ? 40 : 80}
          preview={false}
        />
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            cursor: "pointer",
          }}
        >
          <AdminListIcon />
        </div>
      </Flex>

      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
        className="admin-menu"
      />
    </>
  );

  return (
    <div
      style={{
        padding: mobileView ? "10px" : "20px",
        background:
          "linear-gradient(150.25deg, #EAEBEC -12.71%, #88B3C1 131.5%)",
        height: "100%",
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg:
                "linear-gradient(149.35deg, #4a5559 2.2%, #182328 103.74%)",
            },
            Menu: {
              itemBg:
                "linear-gradient(149.35deg, #4a5559 2.2%, #182328 103.74%)",
              itemColor: "#ffffff",
            },
            Input: {
              colorBorder: "#AEACB4",
            },
            Select: {
              colorBorder: "#AEACB4",
            },
            DatePicker: {
              colorBorder: "#AEACB4",
            },
          },
        }}
      >
        <Layout
          style={{
            minHeight: "calc(100vh - 50px)",
          }}
        >
          {mobileView ? (
            <>
              <Flex
                align="center"
                style={{
                  padding: "10px",
                  background:
                    "linear-gradient(149.35deg, #4a5559 2.2%, #182328 103.74%)",
                  color: "#fff",
                }}
              >
                <Button
                  type="text"
                  icon={
                    <MenuOutlined style={{ color: "#fff", fontSize: "20px" }} />
                  }
                  onClick={() => setDrawerVisible(true)}
                  style={{ marginRight: "15px" }}
                />
                <Image
                  src="/images/sidebar-user-icon.png"
                  width={40}
                  height={40}
                  preview={false}
                />
              </Flex>
              <Drawer
                placement="left"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={296}
                bodyStyle={{
                  padding: 0,
                  background:
                    "linear-gradient(149.35deg, #4a5559 2.2%, #182328 103.74%)",
                  height: "100%",
                }}
                headerStyle={{ display: "none" }}
              >
                {renderSidebar()}
              </Drawer>
            </>
          ) : (
            <Sider width={296} className="admin-sidebar">
              {renderSidebar()}
            </Sider>
          )}
          <Layout>
            <Content>
              <div
                style={{
                  padding: mobileView ? 15 : 24,
                  minHeight: "calc(100vh - 50px)",
                  height: "100%",
                  background:
                    "linear-gradient(150.25deg, #EAEBEC -12.71%, #88B3C1 131.5%)",
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default AdminLayout;
