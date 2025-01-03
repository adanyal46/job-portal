import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Flex,
  Typography,
  Select,
  Image,
  Pagination,
  message,
} from "antd";
import {
  AdminDashboardDollarIcon,
  DashboarCalendarIcon,
  DashboardJobPostIcon,
  RecruiterDashboardReviewIcon,
} from "../../assets/svg";
import { useSelector } from "react-redux";
import VerticalBarChart from "./BarChart";
import ReviewCard from "../../components/reviewCard";
import CustomButton from "../../components/customButton";
import axiosInstance from "../../api/axiosInstance";
import { formatDateToShort } from "../../utils";

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const ROLE = user?.role;
  const route = ROLE === "STAFF_MEMBER" ? "/staff" : "/employer";
  const [counts, setCounts] = useState(null);
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [earning, setEarning] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchCounts();
      fetchUpcomingSession();
      fetchReviews();
      fetchEarnings();
      setLoading(false);
    }
  }, [user]);

  const fetchCounts = async () => {
    try {
      const response = await axiosInstance.get(
        "/mentor/getMentorStatsCount/" + user?.id
      );
      setCounts(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };

  const fetchUpcomingSession = async () => {
    try {
      const response = await axiosInstance.get(
        "/mentor/UpcomingSessions/" + user?.id
      );
      setUpcomingSession(response.data.data.todaySessions);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(
        "/mentor/getMentorReviews/" + user?.id
      );
      setReviews(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };
  const fetchEarnings = async () => {
    try {
      const response = await axiosInstance.get(
        "/mentor/getMentorEarnings/" + user?.id
      );
      setEarning(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };

  const TEXT_STYLE = {
    color: "#2F2C39",
  };

  const cardData = [
    {
      key: 1,
      count: counts?.totalSessions ?? "_ _",
      title: "EMPLOYERS SERVED",
      icon: <DashboardJobPostIcon />,
    },
    {
      key: 2,
      count: counts?.totalEarnings ?? "_ _",
      title: "TOTAL EARNINGS",
      icon: <AdminDashboardDollarIcon />,
    },
    {
      key: 3,
      count: counts?.totalReviews ?? "_ _",
      title: "REVIEWS RECEIVED",
      icon: <RecruiterDashboardReviewIcon />,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2} style={{ color: "#0C0C0C" }}>
        Dashboard
      </Typography.Title>
      {/* First Row: Three Cards */}
      <Row gutter={[24, 24]}>
        {cardData.map((item) => (
          <Col span={8} key={item.key}>
            <Card
              loading={loading}
              bordered={false}
              style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
            >
              <Flex className="w-100" justify="space-between" align="center">
                <Flex vertical gap={0}>
                  <Typography.Title level={3} style={{ color: "#2F2C39" }}>
                    {item.count}
                  </Typography.Title>
                  <Typography.Text
                    style={{ color: "#52595C", textTransform: "uppercase" }}
                  >
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
      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col span={8}>
          {/* Activity Card */}
          <Card
            loading={loading}
            title={
              <Typography.Title
                level={3}
                style={{ color: TEXT_STYLE.color, fontSize: "20px", margin: 0 }}
              >
                Upcoming Bookings
              </Typography.Title>
            }
            bordered={false}
            style={{
              boxShadow: "0px 4px 18px 0px #4B465C1A",
              marginBottom: "24px",
            }}
          >
            {upcomingSession?.length > 0 ? (
              upcomingSession?.map((item, index) => (
                <Flex gap={16} vertical key={index}>
                  <Flex gap={12} align="center">
                    <DashboarCalendarIcon />
                    <Typography.Text
                      style={{ color: "#52595C", fontSize: "18px" }}
                    >
                      {item?.selectedDateTime
                        ? formatDateToShort(item?.selectedDateTime)
                        : "n/a"}
                    </Typography.Text>
                  </Flex>
                  <Flex gap={12} align="center">
                    <DashboardJobPostIcon />
                    <Typography.Text
                      style={{ color: "#52595C", fontSize: "18px" }}
                    >
                      High Volume Recruiting
                    </Typography.Text>
                  </Flex>
                  <Flex align="center" gap={12}>
                    <Image
                      alt="user"
                      src={item?.profile ?? "/images/user-profile-image.png"}
                      width={56}
                      height={56}
                      style={{ borderRadius: "100px" }}
                    />
                    <Flex vertical gap={0}>
                      <Typography.Text
                        style={{
                          color: "#2F2928",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {item?.fullname ?? "N/A"}
                      </Typography.Text>
                      <Typography.Text
                        style={{
                          color: "#2F2928",
                          fontSize: "16px",
                        }}
                      >
                        {item?.userEmail ?? "N/A"}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              ))
            ) : (
              <Typography.Text>No upcoming session found</Typography.Text>
            )}
          </Card>
          <Card
            loading={loading}
            title={
              <Flex align="center" justify="space-between">
                <Typography.Title
                  level={3}
                  style={{
                    color: TEXT_STYLE.color,
                    fontSize: "20px",
                    margin: 0,
                  }}
                >
                  Reviews
                </Typography.Title>
                <CustomButton
                  style={{ fontWeight: 600, color: "#2F2C39" }}
                  category="plain"
                  name="View All"
                />
              </Flex>
            }
            bordered={false}
            style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}
          >
            {reviews?.reviews?.length > 0 ? (
              reviews?.reviews?.map((review, index) => {
                return <ReviewCard review={review} key={index} />;
              })
            ) : (
              <Typography.Text>No Review founds</Typography.Text>
            )}
          </Card>
        </Col>

        <Col span={16}>
          <Card loading={loading}>
            <Typography.Title
              level={3}
              style={{ color: TEXT_STYLE.color, fontSize: "20px" }}
            >
              Upcoming Bookings
            </Typography.Title>
            <Flex align="baseline" gap={10}>
              <Typography.Title
                level={2}
                style={{
                  color: TEXT_STYLE.color,
                  fontSize: "58px",
                  marginTop: "0.2rem",
                }}
              >
                ${earning?.totalEarnings ?? 0}
              </Typography.Title>
              <span
                style={{
                  color: "#0077A6",
                  fontSize: "14px",
                  borderBottom: "2px dotted #0077A6",
                }}
              >
                Revenue Breakdown
              </span>
            </Flex>
            <Flex justify="space-between" align="center">
              <Typography.Text style={{ color: "#7A8488", fontSize: "14px" }}>
                Showing earnings or the month{" "}
                <strong style={{ color: TEXT_STYLE.color }}>Oct, 2024</strong>
              </Typography.Text>
              <Select
                value={"this-year"}
                style={{
                  maxWidth: "218px",
                  width: "100%",
                  minHeight: "35px",
                  borderColor: "#DBDADE",
                }}
                options={[{ label: "This Year", value: "this-year" }]}
              ></Select>
            </Flex>
            <VerticalBarChart earnings={earning} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RecruiterDashboard;
