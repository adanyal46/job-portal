import React from "react";
import { Breadcrumb, ConfigProvider, Flex, Image, Layout, Menu } from "antd";
import {
  AdminDashboardIcon,
  AdminListIcon,
  AdminRequestIcon,
  AdminTimesheetIcon,
  AdminUserMangIcon,
} from "../../assets/svg";
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
  getItem("Dashboard", "admin/dashboard", <AdminDashboardIcon />),
  getItem("User Management", "user-management", <AdminUserMangIcon />, [
    getItem("Employers", "/admin/user/employers"),
    getItem("Recruiters", "/admin/user/recruiters"),
    getItem("Mentors", "/admin/user/mentors"),
    getItem("Job Seeker", "/admin/user/job-seeker"),
    getItem("Staff", "/admin/user/staff"),
  ]),
  getItem("Timesheet", "admin/timsheets", <AdminTimesheetIcon />),
  getItem("Requests", "admin-request", <AdminRequestIcon />, [
    getItem("Recruiter Requests", "/admin/recruiter-request"),
    getItem("Mentor Requests", "/admin/user/mentor-request"),
  ]),
];
const AdminLayout = () => {
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
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
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
                Bill is a cat.
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};
export default AdminLayout;
