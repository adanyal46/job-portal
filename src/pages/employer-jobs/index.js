import {
  Card,
  Col,
  DatePicker,
  Empty,
  Flex,
  Input,
  message,
  Row,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon } from "../../assets/svg";
import JobCard from "../employerDashboard/JobCard";
import CustomPagination from "../../components/customPagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobList } from "../../features/employerDashboard/employerDashboardSlice";
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
        <Link to={"/employer/add-job"}>
          <CustomButton category="primary" name="Add" />
        </Link>
      </Col>
    </Row>
  );
};

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobList, loadingJobs, error } = useSelector(
    (state) => state.employerDashboard
  );

  useEffect(() => {
    dispatch(fetchJobList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error({
        type: "error",
        content: "error",
      });
    }
  }, [error]);
  const TEXT_STYLE = {
    color: "#2F2C39",
  };
  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 400 }}>
        Jobs
      </Typography.Title>
      <Card bordered={false} loading={loadingJobs}>
        <FilterTab />
        <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
          {jobList?.map((item) => (
            <Col md={8} key={item.id}>
              <JobCard item={item} TEXT_STYLE={TEXT_STYLE} />
            </Col>
          ))}
        </Row>
        {jobList?.length >= 10 && <CustomPagination />}
        {jobList?.length === 0 && (
          <Flex
            style={{ minHeight: "calc(100vh - 32vh)" }}
            align="center"
            justify="center"
          >
            <Empty description="No jobs found!" />
          </Flex>
        )}
      </Card>
    </div>
  );
};

export default Jobs;
