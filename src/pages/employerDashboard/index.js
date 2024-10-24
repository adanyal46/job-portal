import React, { useState } from "react";
import { Row, Col, Card, Flex, Typography, List, Input, DatePicker, Button } from "antd";
import {
  CalendarDashboardIcon,
  DashboardAppliationIcon,
  DashboardClockIcon,
  DashboardJobPostIcon,
  DashboardRecruiterHiredIcon,
  MenuEmployerProfileIcon,
} from "../../assets/svg";
import CustomTabs from "../../components/customTabs";
import CustomButton from "../../components/customButton";
import JobCard from "./JobCard";
import CustomPagination from "../../components/customPagination";
import MentorCard from "../../components/mentorCard";
import RecruiterCard from "./RecruiterCard";
import StaffCard from "./StaffCard";

const Dashboard = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");

  const TEXT_STYLE = {
    color: "#2F2C39",
  };

  const handleTabChange = (key) => {
    console.log(key); // Log the active tab key
    setActiveTabKey(key); // Update the active tab state
  };

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

  const jobData = [
    {
      id: "#A324BC",
      jobTitle: "UI/UX Designer",
      status: "Open",
      applicationReceived: "323",
      date: "11 Nov 2024",
    },
    {
      id: "#A12324BC",
      jobTitle: "UI/UX Designer",
      status: "Open",
      applicationReceived: "345",
      date: "11 Nov 2024",
    },
    {
      id: "#A234BC",
      jobTitle: "UI/UX Designer",
      status: "Open",
      applicationReceived: "232",
      date: "11 Nov 2024",
    },
    {
      id: "#A454BC",
      jobTitle: "UI/UX Designer",
      status: "Closed",
      applicationReceived: "123",
      date: "11 Nov 2024",
    },
  ];

  const hiredRecruiterData = [
    {
      id: 1,
      imageName: "",
      fullname: "Olivia Roy",
      location: "US",
      services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
    },

    {
      id: 2,
      imageName: "",
      fullname: "Olivia Roy",

      location: "US",
      services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
    },
    {
      id: 3,
      imageName: "",
      location: "US",
      fullname: "Olivia Roy",

      services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
    },
    {
      id: 4,
      imageName: "",
      location: "US",
      fullname: "Olivia Roy",
      services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
    },
  ];

  const staffData = [
    {
      id: 1,
      title: "Project Manager",
      fullname: "Jannet Summers",
      email: "Jannetsummers@gmail.com",
      phone: "+1 305 3216549",
    },

    {
      id: 2,
      title: "Project Manager",
      fullname: "Jannet Summers",
      email: "Jannetsummers@gmail.com",
      phone: "+1 305 3216549",
    },
    {
      id: 3,
      title: "Project Manager",
      fullname: "Jannet Summers",
      email: "Jannetsummers@gmail.com",
      phone: "+1 305 3216549",
    },
    {
      id: 4,
      title: "Project Manager",
      fullname: "Jannet Summers",
      email: "Jannetsummers@gmail.com",
      phone: "+1 305 3216549",
    },
  ];

  const FilterTab = () => {
    return (
      <Row gutter={16} style={{ alignItems: "center" }}>
        <Col flex={1}>
          <Input.Search size="large" placeholder="Search" onSearch={(value) => console.log(value)} />
        </Col>
        <Col flex={1}>
          <DatePicker size="large" className="w-100" suffixIcon={<CalendarDashboardIcon />} placeholder="Date Range" />
        </Col>
        <Col flex={1}>
          <DatePicker size="large" className="w-100" suffixIcon={<CalendarDashboardIcon />} placeholder="Date Range" />
        </Col>
        <Col>
          <CustomButton category="primary" name="Add" />
        </Col>
      </Row>
    );
  };

  const tabItems = [
    {
      key: "1",
      label: "Jobs",
      children: (
        <Card title="Jobs" bordered={false}>
          <FilterTab />
          <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
            {jobData?.map((item) => (
              <Col md={12} key={item.id}>
                <JobCard item={item} TEXT_STYLE={TEXT_STYLE} />
              </Col>
            ))}
          </Row>
          <CustomPagination />
        </Card>
      ),
    },
    {
      key: "2",
      label: "Hired Recruiters",
      children: (
        <Card title="Hired Recruiters" bordered={false}>
          <FilterTab />
          <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
            {hiredRecruiterData?.map((item, index) => (
              <Col md={12} key={item.id}>
                <RecruiterCard key={`mentor-card-${index}`} {...item} />
              </Col>
            ))}
          </Row>
          <CustomPagination />
        </Card>
      ),
    },
    {
      key: "3",
      label: "Staff Members",
      children: (
        <Card title="Staff Members" bordered={false}>
          <FilterTab />
          <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
            {staffData?.map((item, index) => (
              <Col md={12} key={item.id}>
                <StaffCard key={`staff-card-${index}`} {...item} />
              </Col>
            ))}
          </Row>
          <CustomPagination />
        </Card>
      ),
    },
  ];

  let activityData = [
    {
      key: 1,
      title: "Product Designer",
      time: "1h",
    },
    {
      key: 2,
      title: "Product Designer",
      time: "1h",
    },
    {
      key: 3,
      title: "Product Designer",
      time: "1h",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* First Row: Three Cards */}
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

      {/* Second Row: Two Cards (Left: 30%, Right: Custom Tabs) */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={8} style={{ marginTop: "58px" }}>
          <Card title="Activity" bordered={false} style={{ height: "100%", boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
            <List
              bordered
              dataSource={activityData}
              size={"large"}
              renderItem={(item) => (
                <List.Item style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography.Text style={{ fontSize: "18px" }}>
                    New job for <strong style={{ color: "#1C1C1C" }}>{item.title}</strong> <br />
                    role is Posted
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

        <Col span={16}>
          <CustomTabs items={tabItems} defaultActiveKey={activeTabKey} handleChange={handleTabChange} centered={true} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
