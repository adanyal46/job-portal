import { Card, Col, DatePicker, Flex, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon, EmptyStateRecruiter } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";
import RecruiterCard from "../employerDashboard/RecruiterCard";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchHireRecruiterList } from "../../features/employerDashboard/employerDashboardSlice";
import { Link } from "react-router-dom";

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
        <Link to={"/employer/recruiter"} style={{ fontSize: "14px" }}>
          <CustomButton category="primary" name="Add" />
        </Link>
      </Col>
    </Row>
  );
};

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

        {Array.isArray(recruiters) && recruiters.length > 0 ? (
          <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
            {recruiters?.map((item, index) => (
              <Col md={8} key={item.id}>
                <RecruiterCard key={`mentor-card-${index}`} {...item} />
              </Col>
            ))}
          </Row>
        ) : (
          <Flex
            style={{ minHeight: "calc(100vh - 30.5vh)" }}
            align="center"
            justify="center"
          >
            <EmptyStateRecruiter />
          </Flex>
        )}

        {Array.isArray(recruiters) && recruiters.length >= 10 && (
          <CustomPagination />
        )}
      </Card>
    </div>
  );
};

export default HiredRecruiter;
