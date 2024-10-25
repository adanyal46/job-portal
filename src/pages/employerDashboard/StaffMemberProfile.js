import React from "react";
import { Card, Row, Col, Typography, Rate, Divider, Flex, Input, Table } from "antd";
import LocationWithIcon from "../../components/locationWithIcon";
import { BriefcaseIcon, InfoIcon, MentorBriefcaseIcon, MentorTranslateIcon, VerifiedIcon, VideoIconProfile, WorkIndustriesIcon } from "../../assets/svg";
import Rating from "../../components/rating";
import Tag from "../../components/tag";
import ReviewCard from "../../components/reviewCard";
import CustomPagination from "../../components/customPagination";
import CustomButton from "../../components/customButton";
import { Link } from "react-router-dom";
import MentorServiceCollapse from "../../components/mentorServiceCollapse";
import RecruiterVideoContainer from "../../components/RecruiterVideoContainer";

const { Title, Text } = Typography;

const StaffMemberProfile = () => {
  const TEXT_STYLE = { fontSize: "16px" };
  const dataSource = [
    { key: "1", id: "001", date: "2023-10-01", service: "Web Development", amount: "$500" },
    { key: "2", id: "002", date: "2023-10-02", service: "Graphic Design", amount: "$300" },
    { key: "3", id: "003", date: "2023-10-03", service: "SEO Optimization", amount: "$400" },
    { key: "4", id: "004", date: "2023-10-04", service: "Content Writing", amount: "$250" },
    { key: "5", id: "005", date: "2023-10-05", service: "Digital Marketing", amount: "$600" },
    { key: "6", id: "006", date: "2023-10-06", service: "App Development", amount: "$750" },
    { key: "7", id: "007", date: "2023-10-07", service: "UI/UX Design", amount: "$450" },
    { key: "8", id: "008", date: "2023-10-08", service: "Consulting", amount: "$350" },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={"/employer/view-timesheet-recruiter/1"}>
          <CustomButton name="View" category="plain" />
        </Link>
      ),
    },
  ];
  return (
    <Row gutter={16}>
      {/* Left Card - Profile Details */}
      <Col span={16}>
        <Card style={{ height: "100%" }}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={6}>
              <img src="/images/mentors/mentor-1.png" alt="Profile" style={{ width: "250px", height: "250px", borderRadius: "8px", objectFit: "cover" }} />
            </Col>
            <Col span={18}>
              <Flex vertical gap={8}>
                <Title level={3} style={{ marginBottom: 0 }}>
                  John Doe
                </Title>
                <Rating rating="4.6" reviews="32" />
                <LocationWithIcon location={"US"} />

                <Text block style={{ ...TEXT_STYLE, color: "#333333" }}>
                  Recruiter at Atos
                </Text>
                <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                  Alina Smith@gmail.com
                </Text>
                <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                  +1 305 3216549
                </Text>
                <a href="#" className="verified-profile">
                  <VerifiedIcon />
                  Verified
                </a>
              </Flex>
            </Col>
          </Row>
          <hr className="mentor-detail-divider" />
          <Flex vertical gap={"small"} className="I-can-do-container" style={{ marginBlock: "20px" }}>
            <Flex align="center" gap={"small"}>
              <MentorTranslateIcon />
              <p className="i-can-do-item">
                I can Speak <strong>Spanish</strong> (Conversational)
              </p>
            </Flex>

            <Flex align="center" gap={"small"}>
              <MentorBriefcaseIcon />
              <p className="i-can-do-item">
                I can help you <strong>Interview prep, Resume Review, Job Search Strategy,</strong> and more
              </p>
            </Flex>

            <Flex align="center" gap={"small"}>
              <WorkIndustriesIcon />
              <p className="i-can-do-item">
                I work in <strong> FMCG, Supply Chain, Logistics,</strong> industries
              </p>
            </Flex>
          </Flex>

          <hr className="mentor-detail-divider" />

          <div style={{ marginBlock: "20px" }}>
            <Typography.Title level={3}>Hired For</Typography.Title>
            <Flex gap={6}>
              <Tag label={"Recruitment Coordinator"} />
              <Tag label={"Recruitment Marketing Specialist"} />
              <Tag label={"Conduct Interviews"} />
            </Flex>
          </div>

          <hr className="mentor-detail-divider" />

          <article className="about-mentor-container" style={{ marginBlock: "20px" }}>
            <Typography.Title level={3}>Reviews</Typography.Title>
            <Flex className="review-cards-layout" gap={"small"}>
              <ReviewCard />
              <ReviewCard />
            </Flex>
            <CustomPagination />
          </article>

          <Typography.Title level={3}>Timesheet</Typography.Title>
          <Typography.Title level={3}>190$</Typography.Title>
          <Typography.Title level={5}>You Earning after fuse platform fee</Typography.Title>
          <Typography.Title level={5}>Total Bill 200$</Typography.Title>
          <Typography.Title level={5}>Total Fee 10$</Typography.Title>

          <Divider />
          <Input.Search size="large" placeholder="Search" style={{ maxWidth: "50%" }} />
          <Divider />

          <Table dataSource={dataSource} size="small" columns={columns} pagination={false} />
        </Card>
      </Col>

      {/* Right Card - Additional Content */}
      <Col span={8}>
        <Card style={{ marginBottom: "10px" }}>
          <RecruiterVideoContainer canUpload={false} />
        </Card>
        <Card>
          <Flex gap={5}>
            <BriefcaseIcon />
            <Typography.Title level={4} style={{ ...TEXT_STYLE, fontWeight: "400" }}>
              Services
            </Typography.Title>
          </Flex>
          <Flex gap={5}>
            <InfoIcon />
            <Typography.Text style={TEXT_STYLE}>Please click on the check boxes to select a service.</Typography.Text>
          </Flex>
          <MentorServiceCollapse />
        </Card>
      </Col>
    </Row>
  );
};

export default StaffMemberProfile;
