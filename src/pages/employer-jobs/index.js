import { Card, Col, DatePicker, Input, Row, Typography } from "antd";
import React from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon } from "../../assets/svg";
import JobCard from "../employerDashboard/JobCard";
import CustomPagination from "../../components/customPagination";
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
  {
    id: "#A45124BC",
    jobTitle: "UI/UX Designer",
    status: "Open",
    applicationReceived: "123",
    date: "11 Nov 2024",
  },
  {
    id: "#A4534BC",
    jobTitle: "UI/UX Designer",
    status: "Closed",
    applicationReceived: "123",
    date: "11 Nov 2024",
  },
  {
    id: "#A45234BC",
    jobTitle: "UI/UX Designer",
    status: "Open",
    applicationReceived: "123",
    date: "11 Nov 2024",
  },
  {
    id: "#A45134BC",
    jobTitle: "UI/UX Designer",
    status: "Closed",
    applicationReceived: "123",
    date: "11 Nov 2024",
  },
  {
    id: "#A45534BC",
    jobTitle: "UI/UX Designer",
    status: "Open",
    applicationReceived: "123",
    date: "11 Nov 2024",
  },
];
const index = () => {
  const TEXT_STYLE = {
    color: "#2F2C39",
  };
  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 400 }}>Jobs</Typography.Title>
      <Card bordered={false}>
        <FilterTab />
        <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
          {jobData?.map((item) => (
            <Col md={8} key={item.id}>
              <JobCard item={item} TEXT_STYLE={TEXT_STYLE} />
            </Col>
          ))}
        </Row>
        <CustomPagination />
      </Card>
    </div>
  );
};

export default index;
