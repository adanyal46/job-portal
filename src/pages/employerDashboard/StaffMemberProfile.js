import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Rate,
  Divider,
  Flex,
  Input,
  Table,
  message,
  Empty,
} from "antd";
import LocationWithIcon from "../../components/locationWithIcon";
import {
  BriefcaseIcon,
  InfoIcon,
  MentorBriefcaseIcon,
  MentorTranslateIcon,
  VerifiedIcon,
  WorkIndustriesIcon,
} from "../../assets/svg";
import Rating from "../../components/rating";
import Tag from "../../components/tag";
import ReviewCard from "../../components/reviewCard";
import CustomPagination from "../../components/customPagination";
import CustomButton from "../../components/customButton";
import { Link, useParams } from "react-router-dom";
import MentorServiceCollapse from "../../components/mentorServiceCollapse";
import RecruiterVideoContainer from "../../components/RecruiterVideoContainer";
import {
  getRecruiterDetailApi,
  getTimesheetListByRecruiter,
} from "../../features/employerDashboard/employerDashboardApi";
import ServiceCollapse from "./ServiceCollapse";

const { Title, Text } = Typography;

const StaffMemberProfile = () => {
  const { id } = useParams();
  const [recruiterDetail, setRecruiterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timesheetLoading, setTimesheetLoading] = useState(true);
  const [timsheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchRecruiterInfo = async () => {
      try {
        const result = await getRecruiterDetailApi(id);
        setRecruiterDetail(result.data);
      } catch (error) {
        message.error(
          error.message || "Failed to fetch job details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterInfo();
    if (id) {
      fetchTimesheetList();
    }
  }, [id]);

  const fetchTimesheetList = async () => {
    try {
      setTimesheetLoading(true);
      const response = await getTimesheetListByRecruiter(id);
      setTimesheets(response.data);
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: error.message || "Server Error",
      });
    } finally {
      setTimesheetLoading(false);
    }
  };

  const profile = recruiterDetail && recruiterDetail?.Profile?.[0];
  const services = recruiterDetail && recruiterDetail?.services;
  const review = recruiterDetail && recruiterDetail?.Notification;

  const TEXT_STYLE = { fontSize: "16px" };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <>{new Date(record.createdAt).toLocaleDateString()}</>
      ),
    },
    {
      title: "Service",
      dataIndex: "hiredServices",
      key: "hiredServices",
      render: (_, record) => {
        const services = record?.recruiterHiring?.hiredServices?.flatMap(
          (item) => item.service.name
        );

        return (
          <>
            {services?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "recruiterHiring",
      key: "recruiterHiring",
      render: (_, record) => {
        const services = record?.recruiterHiring?.hiredServices.map(
          (item) => item.service.pricing
        );
        const totalPrice = services.reduce((acc, curr) => acc + curr, 0);
        return <>{totalPrice}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={"/employer/view-timesheet-recruiter/" + record?.id}>
          <CustomButton name="View" category="plain" />
        </Link>
      ),
    },
  ];
  const servicePricing = timsheets
    ?.flatMap((timesheet) => timesheet.recruiterHiring.hiredServices)
    .map((item) => item.service.pricing);

  const totalPrice = servicePricing.reduce((acc, curr) => acc + curr, 0);
  return (
    <Row gutter={16}>
      {/* Left Card - Profile Details */}
      <Col span={16}>
        <Card style={{ height: "100%" }} loading={loading}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={6}>
              <img
                src={
                  profile?.avatarId
                    ? process.env.REACT_APP_MEDIA_URL + profile?.avatarId
                    : "/images/no-image.jpg"
                }
                alt="Profile"
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col span={18}>
              <Flex vertical gap={8}>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {profile?.fullname ?? "-"}
                </Title>
                <Rating rating={0} reviews={0} />
                <LocationWithIcon location={profile?.location ?? "-"} />

                <Text block style={{ ...TEXT_STYLE, color: "#333333" }}>
                  Recruiter at Atos
                </Text>
                <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                  {recruiterDetail?.email ?? "-"}
                </Text>
                <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                  {profile?.phnumber ?? "-"}
                </Text>
                <a href="#" className="verified-profile">
                  <VerifiedIcon />
                  Verified
                </a>
              </Flex>
            </Col>
          </Row>
          <hr className="mentor-detail-divider" />
          <Flex
            vertical
            gap={"small"}
            className="I-can-do-container"
            style={{ marginBlock: "20px" }}
          >
            {profile?.language && (
              <Flex align="center" gap={"small"}>
                <MentorTranslateIcon />
                <p className="i-can-do-item">
                  I can Speak <strong>{profile?.language}</strong>{" "}
                  (Conversational)
                </p>
              </Flex>
            )}

            <Flex align="center" gap={"small"}>
              <MentorBriefcaseIcon />
              <p className="i-can-do-item">
                I can help you{" "}
                <strong>
                  Interview prep, Resume Review, Job Search Strategy,
                </strong>{" "}
                and more
              </p>
            </Flex>

            <Flex align="center" gap={"small"}>
              <WorkIndustriesIcon />
              <p className="i-can-do-item">
                I work in <strong> FMCG, Supply Chain, Logistics,</strong>{" "}
                industries
              </p>
            </Flex>
          </Flex>

          <hr className="mentor-detail-divider" />

          <div style={{ marginBlock: "20px" }}>
            <Typography.Title level={3}>Hired For</Typography.Title>
            <Flex gap={6}>
              {services?.map((item) => (
                <Tag label={item?.name} />
              ))}
            </Flex>
          </div>

          <hr className="mentor-detail-divider" />

          <article
            className="about-mentor-container"
            style={{ marginBlock: "20px" }}
          >
            <Typography.Title level={3}>Reviews</Typography.Title>
            {review?.length > 0 ? (
              <Flex className="review-cards-layout" gap={"small"}>
                <ReviewCard />
              </Flex>
            ) : (
              <Empty description="No Review Found" />
            )}
            {review?.length >= 10 && <CustomPagination />}
          </article>
          <Typography.Title level={3}>Timesheet</Typography.Title>
          {timsheets?.length > 0 ? (
            <>
              <Typography.Title level={3}>${totalPrice}</Typography.Title>
              <Typography.Title level={5}>
                You Earning after fuse platform fee
              </Typography.Title>
              <Typography.Title level={5}>
                Total Bill {totalPrice}$
              </Typography.Title>
              <Typography.Title level={5}>Total Fee 0$</Typography.Title>

              <Divider />
              <Input.Search
                size="large"
                placeholder="Search"
                style={{ maxWidth: "50%" }}
              />
              <Divider />

              <Table
                loading={timesheetLoading}
                dataSource={timsheets}
                size="small"
                columns={columns}
                pagination={false}
                rowKey={"id"}
              />
            </>
          ) : (
            <Empty description="No Timesheet found" />
          )}
        </Card>
      </Col>

      {/* Right Card - Additional Content */}
      <Col span={8}>
        <RecruiterVideoContainer canUpload={false} />
        <Card loading={loading} style={{ marginTop: "10px" }}>
          <Flex gap={5}>
            <BriefcaseIcon />
            <Typography.Title
              level={4}
              style={{ ...TEXT_STYLE, fontWeight: "400" }}
            >
              Services
            </Typography.Title>
          </Flex>
          <Flex gap={5}>
            <InfoIcon />
            <Typography.Text style={TEXT_STYLE}>
              Please click on the check boxes to select a service.
            </Typography.Text>
          </Flex>
          <ServiceCollapse services={services} recruiterId={id} />
        </Card>
      </Col>
    </Row>
  );
};

export default StaffMemberProfile;
