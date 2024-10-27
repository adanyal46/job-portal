import { Card, Col, DatePicker, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";
import RecruiterCard from "../employerDashboard/RecruiterCard";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchHireRecruiterList } from "../../features/employerDashboard/employerDashboardSlice";

const FilterTab = () => {
  return (
    <Row gutter={16} style={{ alignItems: "center" }}>
      <Col flex={1}>
        <Input.Search
          size="large"
          placeholder="Search"
          onSearch={(value) => console.log(value)}
        />
      </Col>
      <Col flex={1}>
        <DatePicker
          size="large"
          className="w-100"
          suffixIcon={<CalendarDashboardIcon />}
          placeholder="Date Range"
        />
      </Col>
      <Col flex={1}>
        <DatePicker
          size="large"
          className="w-100"
          suffixIcon={<CalendarDashboardIcon />}
          placeholder="Date Range"
        />
      </Col>
      <Col>
        <CustomButton category="primary" name="Add" />
      </Col>
    </Row>
  );
};
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
  {
    id: 5,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 6,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 7,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 8,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
];
const HiredRecruiter = () => {
  const dispatch = useDispatch();
  const { recruiters, loading } = useSelector(
    (state) => state.employerDashboard
  );

  useEffect(() => {
    dispatch(fetchHireRecruiterList());
  }, [dispatch]);
  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 400 }}>
        Hired Recruiter
      </Typography.Title>
      <Card bordered={false}>
        <FilterTab />
        <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
          {recruiters?.map((item, index) => (
            <Col md={8} key={item.id}>
              <RecruiterCard key={`mentor-card-${index}`} {...item} />
            </Col>
          ))}
        </Row>
        <CustomPagination />
      </Card>
    </div>
  );
};

export default HiredRecruiter;
