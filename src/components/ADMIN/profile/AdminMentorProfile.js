import React, { useEffect, useId, useState } from "react";
import { Card, Row, Col, Typography, Flex, Tag, Rate } from "antd";
import {
  DownloadIcon,
  LinkedinIcon,
  MentorBriefcaseIcon,
  MentorTranslateIcon,
  VerifiedIcon,
  WorkIndustriesIcon,
} from "../../../assets/svg";
import { Link, useParams } from "react-router-dom";
import LocationWithIcon from "../../locationWithIcon";
import Rating from "../../rating";
import Location from "../../location";
import CustomButton from "../../customButton";
import { fetchMentorProfileApi } from "../../../features/admin/user/userApi";

const { Title, Text } = Typography;
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const AdminMentorProfile = () => {
  const { id: userId } = useParams();
  const [recruiterDetail, setRecruiterDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [mentor, setMentor] = useState(null);
  const services = mentor?.services;
  const helpServices = services?.map((item) => item.name);
  const reviews = mentor?.sessions[0]?.reviews;

  const TEXT_STYLE = { fontSize: "16px" };

  useEffect(() => {
    if (userId) {
      getMentorProfile(userId);
    }
  }, [userId]);

  const getMentorProfile = async (userId) => {
    try {
      setLoading(true);
      const result = await fetchMentorProfileApi(userId);
      if (result && Array.isArray(result.data) && result.data.length > 0) {
        setMentor(result.data[0]);
      } else {
        setMentor(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(mentor);

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={5} className="fw-400" style={TEXT_COLOR}>
          Mentor <strong>/</strong> Profile
        </Typography.Title>
      </Col>
      {/* Left Card - Profile Details */}
      <Col span={16} style={{ marginBottom: "20px" }}>
        <Card style={{ height: "100%" }} loading={loading}>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={6}>
              <img
                src={
                  mentor?.avatarId
                    ? process.env.REACT_APP_MEDIA_URL + mentor?.avatarId
                    : "/images/no-image.jpg"
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col span={18}>
              <Flex justify="space-between">
                <Flex vertical gap={8} style={{ marginLeft: "20px" }}>
                  <Title level={3} style={{ marginBottom: 0 }}>
                    {mentor?.name ?? "N/A"}
                  </Title>
                  <Rating rating={mentor?.rating} reviews={mentor?.rating} />
                  <LocationWithIcon location={mentor?.location ?? "US"} />

                  <Text block style={{ ...TEXT_STYLE, color: "#333333" }}>
                    Rate: $60/Hour
                  </Text>
                  <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                    {mentor?.email ?? "Alina Smith@gmail.com"}
                  </Text>
                  <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                    {mentor?.phnumber ?? "+1 305 3216549"}
                  </Text>
                  <a href="#" className="verified-profile">
                    <VerifiedIcon />
                    Verified
                  </a>
                </Flex>
                <Flex vertical gap={10} align="end">
                  <CustomButton
                    name="Download Resume"
                    category="additional"
                    style={{
                      backgroundColor: "#E9F0F3",
                      borderColor: "#E9F0F3",
                    }}
                    icon={<DownloadIcon />}
                  />
                  <CustomButton
                    name="Visit Profile"
                    category="additional"
                    style={{
                      backgroundColor: "#E9F0F3",
                      borderColor: "#E9F0F3",
                    }}
                    icon={<LinkedinIcon />}
                  />
                </Flex>
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
            {/* {profile?.language && ( */}
            <Flex align="center" gap={"small"}>
              <MentorTranslateIcon />
              <p className="i-can-do-item">
                I can Speak <strong>{mentor?.languages ?? "N/A"}</strong>{" "}
                (Conversational)
              </p>
            </Flex>
            {/* )} */}

            <Flex align="center" gap={"small"}>
              <MentorBriefcaseIcon />
              <p className="i-can-do-item">
                I can help you{" "}
                {helpServices && helpServices.length > 0 ? (
                  helpServices?.map((item, index) => (
                    <strong key={index}>{item}, </strong>
                  ))
                ) : (
                  <strong>No services available</strong>
                )}
                and more
              </p>
            </Flex>
          </Flex>

          <hr className="mentor-detail-divider" />
          <Typography.Title
            level={3}
            style={{ color: "#333", marginBlock: "10px" }}
          >
            Hired For
          </Typography.Title>
          <Flex gap={10} wrap="wrap" style={{ marginBlock: "10px 20px" }}>
            <Tag
              style={{
                fontSize: "16px",
                color: "#2F2C39",
                fontWeight: 500,
                padding: "4px 10px",
              }}
            >
              Recruitment Coordinator
            </Tag>
            <Tag
              style={{
                fontSize: "16px",
                color: "#2F2C39",
                fontWeight: 500,
                padding: "4px 10px",
              }}
            >
              Recruitment Marketing Specialist
            </Tag>
            <Tag
              style={{
                fontSize: "16px",
                color: "#2F2C39",
                fontWeight: 500,
                padding: "4px 10px",
              }}
            >
              Conduct Interviews
            </Tag>
          </Flex>
          <hr className="mentor-detail-divider" />
          <Typography.Title
            level={3}
            style={{ color: "#333", marginBlock: "10px" }}
          >
            Reviews
          </Typography.Title>

          <Row gutter={[12, 12]}>
            {reviews?.map((item, index) => {
              return (
                <Col xs={24} md={12} key={index}>
                  <Card
                    style={{ borderColor: "#DBDADE" }}
                    bordered
                    styles={{
                      body: {
                        padding: "15px",
                      },
                    }}
                  >
                    <Flex
                      align="center"
                      gap={"small"}
                      style={{ marginBottom: "10px" }}
                    >
                      <img
                        src="/images/review-write-icon.png"
                        alt="review-write-icon"
                        width={"80px"}
                        height={"80px"}
                        style={{ borderRadius: "8px" }}
                      />
                      <Flex vertical gap={0}>
                        <Typography.Title level={5}>
                          {item?.name ?? "N/A"}
                        </Typography.Title>
                        <Flex gap={"small"}>
                          <Typography.Text strong>
                            {item?.rating ?? 0}
                          </Typography.Text>
                          <Rate disabled defaultValue={item?.rating ?? 0} />
                        </Flex>
                      </Flex>
                    </Flex>
                    <Typography.Paragraph
                      style={{
                        color: "#2F2C39",
                        minHeight: "50px",
                        height: "100%",
                      }}
                    >
                      {item?.content ?? "N/A"}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      </Col>
      <Col span={8}>
        <Card></Card>
      </Col>
    </Row>
  );
};

export default AdminMentorProfile;
