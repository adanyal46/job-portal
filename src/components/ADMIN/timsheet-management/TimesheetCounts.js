import { useState, useEffect } from "react";
import {
  AdminDashboardArrowRight,
  AdminDashboardDollarIcon,
} from "../../../assets/svg";
import { Card, Col, Flex, Typography } from "antd";
import axiosInstance from "../../../api/axiosInstance";
function TimesheetCounts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cardData = [
    {
      id: 1,
      title: "PENDING FOR PAYMENT",
      count: data?.pendingPaymentsCount ?? 0,
      icon: <AdminDashboardDollarIcon />,
      isArrow: true,
    },
    {
      id: 2,
      title: "PENDING FOR APPROVAL",
      count: data?.pendingAdminApprovalCount ?? 0,
      icon: <AdminDashboardDollarIcon />,
      isArrow: true,
    },
    {
      id: 3,
      title: "RECRUITERS",
      count: data?.totalRecruitersCount ?? 0,
      icon: <AdminDashboardDollarIcon />,
      isArrow: false,
    },
    {
      id: 4,
      title: "EMPLOYERS",
      count: data?.totalEmployersCount ?? 0,
      icon: <AdminDashboardDollarIcon />,
      isArrow: false,
    },
  ];
  useEffect(() => {
    const fetchTimesheetCounts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/admin/timesheetCounts");
        setData(response.data.counts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimesheetCounts();
  }, []);

  return (
    <>
      {cardData.map((item, index) => (
        <Col xs={24} md={12} lg={6} key={index}>
          <Card
            loading={loading}
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
    </>
  );
}

export default TimesheetCounts;
