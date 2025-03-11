import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Flex,
  Typography,
  List,
  Input,
  DatePicker,
  message,
  Form,
} from "antd";
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
import {
  fetchActivityList,
  fetchEmployerDashboardData,
  fetchHireRecruiterList,
  fetchJobList,
  fetchStaffMemberEmp,
} from "../../features/employerDashboard/employerDashboardSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { formatTimeAgo, getFormattedTitleWithStrong } from "../../utils";
import CommonModal from "../../components/commonModal";
import CommonInput from "../../components/commonInput";
import axiosInstance from "../../api/axiosInstance";

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const ROLE = user?.role;
  const route = ROLE === "STAFF_MEMBER" ? "/staff" : "/employer";

  const dispatch = useDispatch();
  const {
    counts,
    jobList,
    activity,
    loading,
    recruiters,
    loadingCounts,
    loadingJobs,
    loadingActivity,
    error,
    staffMembers,
  } = useSelector((state) => state.employerDashboard);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [openInviteStaffModal, setOpenInviteStaffModal] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    buySubscription: [],
  });

  const handleOpenInviteStaffModal = () => {
    setOpenInviteStaffModal(true);
  };
  const handleCloseInviteStaffModal = () => {
    setOpenInviteStaffModal(false);
  };

  useEffect(() => {
    dispatch(fetchEmployerDashboardData());
    dispatch(fetchJobList());
    dispatch(fetchActivityList());
    dispatch(fetchHireRecruiterList());
    if (user) {
      dispatch(fetchStaffMemberEmp(user?.id));
      fetchDetailSubscription(user?.id);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      message.error({
        type: "error",
        content: error,
      });
    }
  }, [error]);

  const TEXT_STYLE = {
    color: "#2F2C39",
  };
  const fetchDetailSubscription = async (id) => {
    try {
      const response = await axiosInstance.get(
        "/employer/buySubscription/" + id
      );
      const result = response.data.data;
      setSubscriptionData({ buySubscription: result });
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
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

  const FilterTab = ({ activeTabKey }) => {
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
          {activeTabKey === "1" ? (
            <Link to={`${route}/add-job`}>
              <CustomButton category="primary" name="Add" />
            </Link>
          ) : activeTabKey === "2" ? (
            <Link to={`${route}/recruiter`}>
              <CustomButton category="primary" name="Add" />
            </Link>
          ) : (
            <CustomButton
              category="primary"
              name="Add"
              handleClick={handleOpenInviteStaffModal}
            />
          )}
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
          <FilterTab activeTabKey={activeTabKey} />
          {Array.isArray(jobList) && jobList.length > 0 && (
            <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
              {(jobList || [])?.map((item) => (
                <Col md={12} key={item.id}>
                  <JobCard item={item} TEXT_STYLE={TEXT_STYLE} route={route} />
                </Col>
              ))}
            </Row>
          )}
          {jobList?.length === 0 && (
            <Flex
              style={{ paddingBlock: "20px", minHeight: "40vh" }}
              align="center"
              justify="center"
            >
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
          <FilterTab activeTabKey={activeTabKey} />
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
            <Flex
              style={{ paddingBlock: "20px", minHeight: "40vh" }}
              align="center"
              justify="center"
            >
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
          <FilterTab activeTabKey={activeTabKey} />
          <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
            {staffMembers?.map((item, index) => (
              <Col md={12} key={item.id}>
                <StaffCard key={`staff-card-${index}`} {...item} />
              </Col>
            ))}
          </Row>
          {staffMembers?.length === 0 && (
            <Flex
              style={{ paddingBlock: "20px", minHeight: "40vh" }}
              align="center"
              justify="center"
            >
              <EmptyStateRecruiter />
            </Flex>
          )}
          {staffMembers?.length >= 10 && <CustomPagination />}{" "}
        </Card>
      ),
    },
  ];
  const jobSlotSetting =
    subscriptionData?.buySubscription.length > 0 &&
    subscriptionData?.buySubscription.filter(
      (buySub) => buySub.jobSlots !== null && buySub.jobSlots > 0
    );
  const resumeSlotSetting =
    subscriptionData?.buySubscription.length > 0 &&
    subscriptionData?.buySubscription.filter(
      (buySub) => buySub.resumeSearches !== null && buySub.resumeSearches > 0
    );
  if (loadingCounts || loadingJobs || loadingActivity) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* First Row: Three Cards */}
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

      {/* Second Row: Two Cards (Left: 30%, Right: Custom Tabs) */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={8} style={{ marginTop: "58px" }}>
          {/* Activity Card */}
          <Card
            title="Activity"
            bordered={false}
            style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
          >
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
                    <Typography.Text style={{ fontSize: "18px" }}>
                      {getFormattedTitleWithStrong(item.title)}
                    </Typography.Text>
                    <Flex
                      align="center"
                      gap={3}
                      style={{ width: "150px" }}
                      justify="end"
                    >
                      <DashboardClockIcon />
                      <Typography.Text style={{ color: "#2F2C39" }}>
                        {formatTimeAgo(item.createdAt)}
                      </Typography.Text>
                    </Flex>
                  </List.Item>
                );
              }}
            />
          </Card>
          {/* Two Small Cards Below the Activity Section */}
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col lg={12}>
              {Array.isArray(resumeSlotSetting) &&
                resumeSlotSetting.length > 0 &&
                resumeSlotSetting?.map((item, index) => (
                  <Card
                    key={index}
                    bordered={false}
                    style={{
                      boxShadow: "0px 4px 18px 0px #4B465C1A",
                      marginBottom: "20px",
                    }}
                  >
                    <Flex vertical>
                      <Flex justify="space-between">
                        <Flex vertical gap={0}>
                          <div class="permium-tag">
                            <div className="content-wrapper">{item?.name}</div>
                          </div>
                          <Typography.Title
                            level={4}
                            style={{ fontWeight: "400" }}
                          >
                            {item?.resumeSearches} /{" "}
                            <strong>{item?.toalResumeSerarches}</strong>
                          </Typography.Title>
                        </Flex>
                        <DashboardPremiumOne />
                      </Flex>
                      <Typography.Text
                        style={{ color: "#52595C", marginBottom: "10px" }}
                      >
                        Resume Searches
                      </Typography.Text>
                      <CustomButton name="Upgrade" />
                    </Flex>
                  </Card>
                ))}
            </Col>
            <Col lg={12}>
              {Array.isArray(jobSlotSetting) &&
                jobSlotSetting.length > 0 &&
                jobSlotSetting?.map((item, index) => (
                  <Card
                    key={index}
                    bordered={false}
                    style={{
                      boxShadow: "0px 4px 18px 0px #4B465C1A",
                      marginBottom: "20px",
                    }}
                  >
                    <Flex vertical>
                      <Flex justify="space-between">
                        <Flex vertical gap={0}>
                          <div class="permium-tag">
                            <div className="content-wrapper">{item?.name}</div>
                          </div>
                          <Typography.Title
                            level={4}
                            style={{ fontWeight: "400" }}
                          >
                            {item?.jobSlots} /{" "}
                            <strong>{item?.totalJobSlots}</strong>
                          </Typography.Title>
                        </Flex>
                        <DashboardPremiumTwo />
                      </Flex>
                      <Typography.Text
                        style={{ color: "#52595C", marginBottom: "10px" }}
                      >
                        Job Postings
                      </Typography.Text>
                      <CustomButton name="Upgrade" />
                    </Flex>
                  </Card>
                ))}
            </Col>
          </Row>
        </Col>

        <Col span={16}>
          <CustomTabs
            items={tabItems.filter((item) =>
              ROLE === "STAFF_MEMBER" ? item.key !== "3" : item
            )}
            defaultActiveKey={activeTabKey}
            handleChange={handleTabChange}
            centered={true}
          />
        </Col>
      </Row>

      <CommonModal
        isModalOpen={openInviteStaffModal}
        isDelete={false}
        saveBtnText="Send Invite"
        handleClose={handleCloseInviteStaffModal}
      >
        <Flex vertical align="center" style={{ width: "100%" }}>
          <Typography.Title
            level={3}
            style={{
              fontSize: "20px",
              color: "#0C0C0C",
              fontWeight: 500,
              marginBottom: "12px",
            }}
          >
            Invite Staff Member
          </Typography.Title>
          <Typography.Text style={{ color: "#2F2C39" }}>
            Invite Staff Members to Join Your Company Profile
          </Typography.Text>
        </Flex>
        <Form layout="vertical" size="large">
          <Form.Item label="Email" name={"email"}>
            <CommonInput placeholder="Enter Email" />
          </Form.Item>
        </Form>
      </CommonModal>
    </div>
  );
};

export default Dashboard;
