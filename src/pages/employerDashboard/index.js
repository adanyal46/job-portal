import React, { useEffect, useState } from "react";
import { Row, Col, Card, Flex, Typography, List, Input, DatePicker, message } from "antd";
import {
  CalendarDashboardIcon,
  DashboardAppliationIcon,
  DashboardClockIcon,
  DashboardJobPostIcon,
  DashboardPremiumOne,
  DashboardPremiumTwo,
  DashboardRecruiterHiredIcon,
  EmptyStateRecruiter,
} from "../../assets/svg";
import CustomTabs from "../../components/customTabs";
import CustomButton from "../../components/customButton";
import JobCard from "./JobCard";
import CustomPagination from "../../components/customPagination";
import RecruiterCard from "./RecruiterCard";
import StaffCard from "./StaffCard";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityList, fetchEmployerDashboardData, fetchHireRecruiterList, fetchJobList } from "../../features/employerDashboard/employerDashboardSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { formatTimeAgo, getFormattedTitleWithStrong } from "../../utils";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { counts, jobList, activity, loading, recruiters, loadingCounts, loadingJobs, loadingActivity, error } = useSelector(
    (state) => state.employerDashboard
  );
  const [activeTabKey, setActiveTabKey] = useState("1");

  useEffect(() => {
    dispatch(fetchEmployerDashboardData());
    dispatch(fetchJobList());
    dispatch(fetchActivityList());
    dispatch(fetchHireRecruiterList());
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

  const handleTabChange = (key) => setActiveTabKey(key);

  const cardData = [
    {
      key: 1,
      count: counts ? counts.jobPostCount : "0",
      title: "JOBS POSTED",
      icon: <DashboardJobPostIcon />,
    },
    {
      key: 2,
      count: counts ? counts.applicationReceivedCount : "0",
      title: "APPLICATIONS RECEIVED",
      icon: <DashboardAppliationIcon />,
    },
    {
      key: 3,
      count: counts ? counts.hiredRecruiterCount : "0",
      title: "RECRUITERS HIRED",
      icon: <DashboardRecruiterHiredIcon />,
    },
  ];

  // const jobData = [
  //   {
  //     id: "#A324BC",
  //     jobTitle: "UI/UX Designer",
  //     status: "Open",
  //     applicationReceived: "323",
  //     date: "11 Nov 2024",
  //   },
  //   {
  //     id: "#A12324BC",
  //     jobTitle: "UI/UX Designer",
  //     status: "Open",
  //     applicationReceived: "345",
  //     date: "11 Nov 2024",
  //   },
  //   {
  //     id: "#A234BC",
  //     jobTitle: "UI/UX Designer",
  //     status: "Open",
  //     applicationReceived: "232",
  //     date: "11 Nov 2024",
  //   },
  //   {
  //     id: "#A454BC",
  //     jobTitle: "UI/UX Designer",
  //     status: "Closed",
  //     applicationReceived: "123",
  //     date: "11 Nov 2024",
  //   },
  // ];

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
          <Link to={"/employer/add-job"}>
            <CustomButton category="primary" name="Add" />
          </Link>
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
          {Array.isArray(jobList) && jobList.length > 0 && (
            <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
              {(jobList || [])?.map((item) => (
                <Col md={12} key={item.id}>
                  <JobCard item={item} TEXT_STYLE={TEXT_STYLE} />
                </Col>
              ))}
            </Row>
          )}
          {jobList?.length === 0 && (
            <Flex style={{ paddingBlock: "20px", minHeight: "40vh" }} align="center" justify="center">
              <EmptyStateRecruiter />
            </Flex>
          )}
          {jobList?.length >= 10 && <CustomPagination />}{" "}
        </Card>
      ),
    },
    {
      key: "2",
      label: "Hired Recruiters",
      children: (
        <Card title="Hired Recruiters" bordered={false} loading={loading}>
          <FilterTab />
          {Array.isArray(recruiters) && recruiters.length > 0 && (
            <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
              {recruiters?.map((item, index) => (
                <Col md={12} key={item.id}>
                  <RecruiterCard key={`mentor-card-${index}`} {...item} />
                </Col>
              ))}
            </Row>
          )}
          {recruiters?.length === 0 && (
            <Flex style={{ paddingBlock: "20px", minHeight: "40vh" }} align="center" justify="center">
              <EmptyStateRecruiter />
            </Flex>
          )}
          {recruiters?.length >= 10 && <CustomPagination />}{" "}
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

  if (loadingCounts || loadingJobs || loadingActivity) {
    return <Loader />;
  }

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
          {/* Activity Card */}
          <Card title="Activity" bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
            <List
              bordered
              dataSource={activity || []}
              size={"large"}
              renderItem={(item) => {
                console.log();
                return (
                  <List.Item
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text style={{ fontSize: "18px" }}>{getFormattedTitleWithStrong(item.title)}</Typography.Text>
                    <Flex align="center" gap={3} style={{ width: "150px" }} justify="end">
                      <DashboardClockIcon />
                      <Typography.Text style={{ color: "#2F2C39" }}>{formatTimeAgo(item.createdAt)}</Typography.Text>
                    </Flex>
                  </List.Item>
                );
              }}
            />
          </Card>
          {/* Two Small Cards Below the Activity Section */}
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col span={12}>
              <Card bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
                <Flex vertical>
                  <Flex justify="space-between">
                    <Flex vertical gap={0}>
                      <div class="permium-tag">
                        <div className="content-wrapper">Premium</div>
                      </div>
                      <Typography.Title level={4} style={{ fontWeight: "400" }}>
                        16 / <strong>25</strong>
                      </Typography.Title>
                    </Flex>
                    <DashboardPremiumOne />
                  </Flex>
                  <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>Resume Searches</Typography.Text>
                  <CustomButton name="Upgrade" />
                </Flex>
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
                <Flex vertical>
                  <Flex justify="space-between">
                    <Flex vertical gap={0}>
                      <div class="permium-tag">
                        <div className="content-wrapper">Premium</div>
                      </div>
                      <Typography.Title level={4} style={{ fontWeight: "400" }}>
                        2 / <strong>5</strong>
                      </Typography.Title>
                    </Flex>
                    <DashboardPremiumTwo />
                  </Flex>
                  <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>Job Postings</Typography.Text>
                  <CustomButton name="Upgrade" />
                </Flex>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={16}>
          <CustomTabs items={tabItems} defaultActiveKey={activeTabKey} handleChange={handleTabChange} centered={true} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
