import { Card, Col, DatePicker, Flex, Row, Typography } from "antd";
import {
  AdminDashboardArrowRight,
  AdminDashboardDollarIcon,
  AdminDashboardEducationIcon,
  AdminDashboardEmployerIcon,
  AdminDashboardListIcon,
  AdminDashboardUserIcon,
  CalendarDashboardIcon,
} from "../../assets/svg";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const AdminDashboard = () => {
  let dashboardData = [
    {
      id: 1,
      title: "EMPLOYERS",
      count: "20",
      icon: <AdminDashboardEmployerIcon />,
      isArrow: true,
    },
    {
      id: 2,
      title: "Job Seekers",
      count: "22",
      icon: <AdminDashboardEducationIcon />,
      isArrow: true,
    },
    {
      id: 3,
      title: "RECRUITERS",
      count: "128",
      icon: <AdminDashboardListIcon />,
      isArrow: true,
    },
    {
      id: 4,
      title: "Mentors",
      count: "128",
      icon: <AdminDashboardUserIcon />,
      isArrow: true,
    },
    {
      id: 5,
      title: "Mentors Revenue",
      count: "$200",
      icon: <AdminDashboardDollarIcon />,
      isArrow: true,
    },
    {
      id: 6,
      title: "Recruiters Revenue",
      count: "$200",
      icon: <AdminDashboardDollarIcon />,
      isArrow: true,
    },
    {
      id: 7,
      title: "Job Posting Revenue",
      count: "$200",
      icon: <AdminDashboardDollarIcon />,
      isArrow: false,
    },
    {
      id: 8,
      title: "CV Review Revenue",
      count: "$200",
      icon: <AdminDashboardDollarIcon />,
      isArrow: false,
    },
  ];
  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Dashboard
      </Typography.Title>
      <div>
        <DatePicker
          size="large"
          placeholder="Date Range"
          style={{ width: "100%", maxWidth: "369px", marginTop: "10px" }}
          suffixIcon={<CalendarDashboardIcon />}
        />
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {dashboardData.map((item) => (
          <Col span={6} key={item.key}>
            <Card
              bordered={false}
              style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
            >
              <Flex className="w-100" justify="space-between" align="center">
                <Flex vertical gap={0}>
                  <Typography.Title level={3} style={{ color: "#2F2C39" }}>
                    {item.count}
                  </Typography.Title>
                  <Typography.Text style={{ color: "#52595C" }}>
                    {item.title}
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={6}>
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
