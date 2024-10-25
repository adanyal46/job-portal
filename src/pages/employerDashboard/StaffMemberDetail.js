import React from "react";
import { Card, Col, Flex, List, Row, Typography } from "antd";
import { DashboardAppliationIcon, DashboardClockIcon, DashboardJobPostIcon, DashboardRecruiterHiredIcon } from "../../assets/svg";
const cardData = [
  {
    key: 1,
    count: "20",
    title: "JOBS POSTED",
    icon: <DashboardJobPostIcon />,
  },
  {
    key: 2,
    count: "22",
    title: "APPLICATIONS RECEIVED",
    icon: <DashboardAppliationIcon />,
  },
  {
    key: 3,
    count: "128",
    title: "RECRUITERS HIRED",
    icon: <DashboardRecruiterHiredIcon />,
  },
];

let activityData = [
  {
    key: 1,
    start: "10 Recruiters evaluated to",
    title: "Conduct Interviews",
    time: "1h",
  },
  {
    key: 2,
    start: "2 Recruiters hired to",
    title: "Conduct Interviews",
    time: "1h",
  },
  {
    key: 3,
    start: "10 Recruiters evaluated",
    title: "Conduct Interviews",
    time: "1h",
  },
  {
    key: 4,
    start: "10 Recruiters evaluated",
    title: "Conduct Interviews",
    time: "1h",
  },
];

const priorityData = [
  {
    key: 1,
    title: "Hire 2 recruiter",
    status: "Low",
  },
  {
    key: 2,
    title: "Hire 2 recruiter",
    status: "Medium",
  },
  {
    key: 3,
    title: "Hire 2 recruiter",
    status: "Medium",
  },
  {
    key: 4,
    title: "Hire 2 recruiter",
    status: "High",
  },
  {
    key: 5,
    title: "Hire 2 recruiter",
    status: "High",
  },
];
const taskData = [
  {
    key: 1,
    title: "Hire Recruiters",
    status: "50%",
  },
  {
    key: 2,
    title: "Review Applications",
    status: "20%",
  },
  {
    key: 3,
    title: "Job Posting",
    status: "10%",
  },
  {
    key: 4,
    title: "Review Recruiter Profiles",
    status: "10%",
  },
  {
    key: 5,
    title: "Review Job Seeker Profiles",
    status: "10%",
  },
];
const StaffMemberDetail = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* First Row: Three Cards */}
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        Staff Member <strong>/</strong> Staff Member Details
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {cardData.map((item) => (
          <Col span={8} key={item.key}>
            <Card bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
              <Flex className="w-100" justify="space-between" align="center">
                <Flex vertical gap={0}>
                  <Typography.Title level={3} style={{ color: "#2F2C39" }}>
                    {item.count}
                  </Typography.Title>
                  <Typography.Text style={{ color: "#52595C" }}>{item.title}</Typography.Text>
                </Flex>
                {item.icon}
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={8}>
          {/* Activity Card */}
          <Card title="Activity" bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
            <List
              bordered
              dataSource={activityData}
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
                    {item.start} <strong style={{ color: "#1C1C1C" }}>{item.title}</strong>
                  </Typography.Text>
                  <Flex align="center" gap={3}>
                    <DashboardClockIcon />
                    <Typography.Text style={{ color: "#2F2C39" }}>{item.time}</Typography.Text>
                  </Flex>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <Flex justify="space-between">
                <Typography.Title level={5} style={{ marginBlock: 0 }}>
                  List of Today’s Priorities
                </Typography.Title>
                <Typography.Title level={5} style={{ marginBlock: 0 }}>
                  Priority
                </Typography.Title>
              </Flex>
            }
            bordered={false}
            style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
          >
            <List
              bordered
              dataSource={priorityData}
              size={"large"}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text style={{ fontSize: "16px" }}>{item.title}</Typography.Text>
                  <div
                    style={{
                      color: item.status === "Low" ? "#1BBB62" : item.status === "Medium" ? "#F9912E" : "#E8381A",
                      fontSize: "14px",
                      backgroundColor: item.status === "Low" ? "#DAF9E8" : item.status === "Medium" ? "#FAF4EE" : "#F8EEED",
                      padding: "1px 7px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.status}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          {/* Activity Card */}
          <Card
            title={
              <Flex justify="space-between">
                <Typography.Title level={5} style={{ marginBlock: 0 }}>
                  Task
                </Typography.Title>
                <Typography.Title level={5} style={{ marginBlock: 0 }}>
                  Percentage
                </Typography.Title>
              </Flex>
            }
            bordered={false}
            style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
          >
            <List
              bordered
              dataSource={taskData}
              size={"large"}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text style={{ fontSize: "16px" }}>{item.title}</Typography.Text>
                  <div
                    style={{
                      color: "#1C1C1C",
                      fontSize: "14px",
                      backgroundColor: "#E2F3F9",
                      padding: "1px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.status}
                  </div>
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
