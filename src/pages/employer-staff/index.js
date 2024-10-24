import { Card, Col, DatePicker, Input, Row, Typography } from "antd";
import React from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";
import "./styles.scss";
import StaffCard from "../employerDashboard/StaffCard";

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
const index = () => {
  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 400 }}>
        Staff Member
      </Typography.Title>
      <Card bordered={false}>
        <FilterTab />
        <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
          {staffData?.map((item, index) => (
            <Col md={8} key={item.id}>
              <StaffCard key={`staff-card-${index}`} {...item} />
            </Col>
          ))}
        </Row>
        <CustomPagination />
      </Card>
    </div>
  );
};

export default index;
