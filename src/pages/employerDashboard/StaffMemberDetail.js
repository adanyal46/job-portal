import React, { useEffect, useState } from "react";
import { Card, Col, Flex, List, message, Row, Spin, Typography } from "antd";
import {
  DashboardAppliationIcon,
  DashboardClockIcon,
  DashboardJobPostIcon,
  DashboardRecruiterHiredIcon,
} from "../../assets/svg";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const StaffMemberDetail = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStaffMemeberDetail(id);
    }
  }, [id]);

  const fetchStaffMemeberDetail = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/employer/staffmemberDetails/" + id
      );
      setStaff(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }
  const cardData = [
    {
      key: 1,
      count: staff?.jobPostCount ?? 0,
      title: "JOBS POSTED",
      icon: <DashboardJobPostIcon />,
    },
    {
      key: 2,
      count: staff?.applicationReceivedCount ?? 0,
      title: "APPLICATIONS RECEIVED",
      icon: <DashboardAppliationIcon />,
    },
    {
      key: 3,
      count: staff?.hiredRecruiterCount ?? 0,
      title: "RECRUITERS HIRED",
      icon: <DashboardRecruiterHiredIcon />,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* First Row: Three Cards */}
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        Staff Member <strong>/</strong> Staff Member Details
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {cardData.map((item) => (
          <Col span={8} key={item.key}>
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
                {item.icon}
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={24}>
          {/* Activity Card */}
          <Card
            title="Manage Activity"
            bordered={false}
            style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
          >
            <List
              bordered
              dataSource={staff?.activities || []}
              size={"large"}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text style={{ fontSize: "16px" }}>
                    {item.start}{" "}
                    <strong style={{ color: "#1C1C1C" }}>{item.title}</strong>
                  </Typography.Text>
                  <Flex align="center" gap={3}>
                    <DashboardClockIcon />
                    <Typography.Text style={{ color: "#2F2C39" }}>
                      {item.time}
                    </Typography.Text>
                  </Flex>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffMemberDetail;
