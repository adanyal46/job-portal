import {
  Card,
  Col,
  DatePicker,
  Flex,
  Row,
  Spin,
  Typography,
  notification,
  Grid,
} from "antd";
import {
  AdminDashboardArrowRight,
  AdminDashboardDollarIcon,
  AdminDashboardEducationIcon,
  AdminDashboardEmployerIcon,
  AdminDashboardListIcon,
  AdminDashboardUserIcon,
  CalendarDashboardIcon,
} from "../../assets/svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDashboardCounts } from "../../features/admin/dashboard/dashboardSlice";

const { useBreakpoint } = Grid;

const TEXT_COLOR = {
  color: "#0C0C0C",
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { counts, loading, error } = useSelector((state) => state.dashboard);
  const screens = useBreakpoint();

  useEffect(() => {
    dispatch(getDashboardCounts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error Loading Dashboard",
        description: error,
      });
    }
  }, [error]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  let dashboardData = [
    {
      id: 1,
      title: "EMPLOYERS",
      count: counts.employeesCount,
      icon: <AdminDashboardEmployerIcon />,
      isArrow: true,
    },
    {
      id: 2,
      title: "Job Seekers",
      count: counts.jsCount,
      icon: <AdminDashboardEducationIcon />,
      isArrow: true,
    },
    {
      id: 3,
      title: "RECRUITERS",
      count: counts.recCount,
      icon: <AdminDashboardListIcon />,
      isArrow: true,
    },
    {
      id: 4,
      title: "Mentors",
      count: counts.mentorCount,
      icon: <AdminDashboardUserIcon />,
      isArrow: true,
    },
    {
      id: 5,
      title: "Mentors Revenue",
      count: counts.mentorRev,
      icon: <AdminDashboardDollarIcon />,
      isArrow: true,
    },
    {
      id: 6,
      title: "Recruiters Revenue",
      count: counts.recRev,
      icon: <AdminDashboardDollarIcon />,
      isArrow: true,
    },
    {
      id: 7,
      title: "Job Posting Revenue",
      count: counts.jsRev,
      icon: <AdminDashboardDollarIcon />,
      isArrow: false,
    },
    {
      id: 8,
      title: "CV Review Revenue",
      count: counts.cvRev,
      icon: <AdminDashboardDollarIcon />,
      isArrow: false,
    },
  ];

  return (
    <div style={{ padding: screens.xs ? "10px" : "20px" }}>
      <Typography.Title
        level={screens.xs ? 4 : 3}
        className="fw-400"
        style={TEXT_COLOR}
      >
        Dashboard
      </Typography.Title>
      <div>
        <DatePicker
          size={screens.xs ? "middle" : "large"}
          placeholder="Date Range"
          style={{
            width: "100%",
            maxWidth: screens.xs ? "100%" : "369px",
            marginTop: "10px",
          }}
          suffixIcon={<CalendarDashboardIcon />}
        />
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {dashboardData.map((item, ind) => (
          <Col
            xs={24} // 1 card per row on extra small screens
            sm={12} // 2 cards per row on small screens
            md={8} // 3 cards per row on medium screens
            lg={8} // 4 cards per row on large screens
            xl={6} // 4 cards per row on extra large screens
            key={ind}
          >
            <Card
              bordered={false}
              style={{
                boxShadow: "0px 4px 18px 0px #4B465C1A",
                height: "100%",
              }}
            >
              <Flex
                className="w-100"
                justify="space-between"
                align="center"
                wrap={screens.xs ? "wrap" : "nowrap"}
              >
                <Flex
                  vertical
                  gap={0}
                  style={{
                    marginBottom: screens.xs ? "10px" : 0,
                    width: screens.xs ? "100%" : "auto",
                  }}
                >
                  <Typography.Title
                    level={screens.xs ? 4 : 3}
                    style={{
                      color: "#2F2C39",
                      margin: screens.xs ? "0 0 5px 0" : undefined,
                    }}
                  >
                    {item.count}
                  </Typography.Title>
                  <Typography.Text style={{ color: "#52595C" }}>
                    {item.title}
                  </Typography.Text>
                </Flex>
                <Flex
                  align="center"
                  gap={6}
                  style={{
                    marginLeft: screens.xs ? "auto" : 0,
                  }}
                >
                  {item.icon}
                  {item.isArrow && <AdminDashboardArrowRight />}
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminDashboard;
