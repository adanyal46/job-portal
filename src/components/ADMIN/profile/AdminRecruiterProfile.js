import React, { useState } from "react";
import { Card, Row, Col, Typography, Flex } from "antd";
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

const { Title, Text } = Typography;
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const AdminRecruiterProfile = () => {
  const { id } = useParams();
  const [recruiterDetail, setRecruiterDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const profile = recruiterDetail && recruiterDetail?.Profile?.[0];
  const location = recruiterDetail && recruiterDetail?.Location?.[0];

  const TEXT_STYLE = { fontSize: "16px" };

  return (
    <Row gutter={[24, 24]} justify={"center"}>
      {/* Left Card - Profile Details */}
      <Col span={16} style={{ marginBottom: "20px" }}>
        <Typography.Title level={5} className="fw-400" style={TEXT_COLOR}>
          Dashboard <strong>/</strong> Recruiter Profile
        </Typography.Title>
        <Card style={{ height: "100%" }} loading={loading}>
          <Row style={{ marginBottom: "20px" }}>
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
              <Flex justify="space-between">
                <Flex vertical gap={8} style={{ marginLeft: "20px" }}>
                  <Title level={3} style={{ marginBottom: 0 }}>
                    {profile?.fullname ?? "Olivia Roy"}
                  </Title>
                  <Rating rating={0} reviews={0} />
                  <LocationWithIcon location={profile?.location ?? "US"} />

                  <Text block style={{ ...TEXT_STYLE, color: "#333333" }}>
                    Rate: $60/Hour
                  </Text>
                  <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                    {recruiterDetail?.email ?? "Alina Smith@gmail.com"}
                  </Text>
                  <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                    {profile?.phnumber ?? "+1 305 3216549"}
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
                I can Speak <strong>{profile?.language ?? "Spanish"}</strong>{" "}
                (Conversational)
              </p>
            </Flex>
            {/* )} */}

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
            <Flex align="center" gap={"small"}>
              <MentorBriefcaseIcon />
              <p className="i-can-do-item">
                I can available
                <strong>Full Time</strong> or
                <strong>Part Time</strong>
              </p>
            </Flex>
          </Flex>

          <hr className="mentor-detail-divider" />

          <div style={{ marginBlock: "20px" }}>
            <Typography.Title level={3}>About</Typography.Title>
            <Typography.Text>
              The power of design is nothing unless you can turn it into
              influence, this is the reason why I am here. My passion is for
              understanding human behavior, needs, and desires. I leverage a
              human-centered approach to help organizations identify business
              opportunities and design breakthrough products, services, and
              experience solutions. The power of design is nothing unless you
              can turn it into influence, this is the reason why I am here. My
              passion is for understanding human behavior, needs, and desires. I
              leverage a human-centered approach to help organizations identify
              business opportunities and design breakthrough products, services,
              and experience solutions. The power of design is nothing unless
              you can turn it into influence, this is the reason why I am here.
              My passion is for understanding human behavior, needs, and
              desires. I leverage a human-centered approach to help
              organizations identify business opportunities and design
              breakthrough products, services, and experience solutions. The
              power of design is nothing unless you can turn it into influence,
              this is the reason why I am here. My passion is for understanding
              human behavior, needs, and desires.
            </Typography.Text>
          </div>

          <hr className="mentor-detail-divider" />

          <div>
            <Location
              btnShow={false}
              showLocationModal={showLocationModal}
              setShowLocationModal={setShowLocationModal}
              location={location}
            />
          </div>
        </Card>
      </Col>
      <Col span={16}>
        <Flex gap={"small"}>
          <CustomButton category="primary" name="Approve" />
          <CustomButton
            category="plain"
            style={{ backgroundColor: "#E9F0F3" }}
            name="Disapprove"
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default AdminRecruiterProfile;
