import React from "react";
import { Breadcrumb, ConfigProvider, Flex, Image, Layout, Menu } from "antd";
import {
  AdminBlogIcon,
  AdminCommonManagementIcon,
  AdminDashboardIcon,
  AdminGeneralManagementIcon,
  AdminListIcon,
  AdminPageIcon,
  AdminPaymentIcon,
  AdminRequestIcon,
  AdminTimesheetIcon,
  AdminUserMangIcon,
} from "../../assets/svg";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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
  getItem("User Management", "user-management", <AdminUserMangIcon />, [
    getItem("Employers", "/admin/user/employers"),
    getItem("Recruiters", "/admin/user/recruiters"),
    getItem("Mentors", "/admin/user/mentors"),
    getItem("Job Seeker", "/admin/user/job-seekers"),
    getItem("Staff", "/admin/user/staffs"),
  ]),
  getItem("Timesheet", "/admin/timesheet-management", <AdminTimesheetIcon />),
  getItem("Requests", "admin-request", <AdminRequestIcon />, [
    getItem("Recruiter Requests", "/admin/recruiter-profile-approval-requests"),
    getItem("Mentor Requests", "/admin/mentor-profile-approval-requests"),
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
  getItem("Popup Info", "admin/popup-info", <AdminTimesheetIcon />),
  getItem("Settings", "/admin/settings", <AdminTimesheetIcon />),
];
const AdminLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const handleMenuClick = (obj) => {
    navigate(obj.key);
  };
  return (
    <div
      style={{
        padding: "20px",
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
          <Sider width={296} className="admin-sidebar">
            <Flex
              justify="center"
              style={{ paddingBlock: "20px", width: "100%" }}
            >
              <Image
                src="/images/sidebar-user-icon.png"
                width={80}
                height={80}
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
          </Sider>
          <Layout>
            <Content>
              <div
                style={{
                  padding: 24,
                  minHeight: "calc(100vh - 50px)",
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
