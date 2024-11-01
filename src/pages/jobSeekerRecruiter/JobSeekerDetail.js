import { Card, Empty, Flex, Image, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  CertificationsIcon,
  EducationIcon,
  EmploymentIcon,
  LocationEmployerProfileIcon,
} from "../../assets/svg";
import { useParams } from "react-router-dom";
import { getTalentDetailApi } from "../../features/employerDashboard/employerDashboardApi";
const TEXT_COLOR = {
  color: "#4B465C",
  fontSize: "16px",
};
const HEADING_COLOR = {
  color: "#333333",
};
const JobSeekerDetail = () => {
  const { id } = useParams();

  const [talentDetail, setTalentDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(talentDetail);

  useEffect(() => {
    if (id) {
      fetchTalentDetail(id);
    }
  }, [id]);

  const fetchTalentDetail = async (talentId) => {
    try {
      const result = await getTalentDetailApi(talentId);
      setTalentDetail(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const profile = talentDetail?.Profile?.[0];
  const educations = talentDetail?.Education;
  const certificates = talentDetail?.Certificate;
  const experiences = talentDetail?.EmpolymentHistory;
  const location = talentDetail?.Location?.[0];

  return (
    <div style={{ maxWidth: "969px", width: "100%", margin: "0 auto" }}>
      <Card loading={loading}>
        <Flex align="center" gap={10}>
          <Flex>
            <Image
              width={200}
              height={200}
              src={
                profile?.avatarId === null
                  ? "/images/no-image.jpg"
                  : process.env.REACT_APP_MEDIA_URL + profile?.avatarId
              }
              preview={false}
            />
          </Flex>
          <Flex flex={1} vertical>
            <Typography.Title level={3} style={HEADING_COLOR}>
              {profile?.fullname}
            </Typography.Title>
            <Typography.Text style={TEXT_COLOR}>
              {talentDetail?.email}
            </Typography.Text>
            <Typography.Text style={TEXT_COLOR}>
              {profile?.phnumber}
            </Typography.Text>
          </Flex>
        </Flex>
        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Education and Certifications
        </Typography.Title>
        {educations?.map((education) => (
          <Flex gap={10} style={{ marginTop: "20px" }}>
            <EducationIcon />

            <Flex vertical gap={4}>
              <Typography.Text style={TEXT_COLOR}>
                {education?.degreName}
              </Typography.Text>
              <Typography.Text type="secondary">
                {education?.universityName}
              </Typography.Text>
              <Typography.Text type="secondary">
                {new Date(education?.startFrom).getFullYear()} -{" "}
                {new Date(education?.endIn).getFullYear()}
              </Typography.Text>
            </Flex>
          </Flex>
        ))}

        {certificates?.map((certificate) => (
          <Flex gap={10} style={{ marginBlock: "20px" }}>
            <CertificationsIcon />

            <Flex vertical gap={4}>
              <Typography.Text style={TEXT_COLOR}>
                {certificate?.certName}
              </Typography.Text>
              <Typography.Text type="secondary">
                {certificate?.orgName}
              </Typography.Text>
              <Typography.Text type="secondary">
                {new Date(certificate?.startedOn).getFullYear()} •{" "}
                {new Date(certificate?.completedOn).getFullYear()}
              </Typography.Text>
            </Flex>
          </Flex>
        ))}

        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Employment and Experience History
        </Typography.Title>
        {experiences?.map((experience) => (
          <Flex gap={10} style={{ marginBlock: "20px" }}>
            <EmploymentIcon />

            <Flex vertical gap={4} className="w-100">
              <Typography.Text style={TEXT_COLOR}>
                {experience?.jobTitle}
              </Typography.Text>
              <Flex justify="space-between" align="center">
                <Typography.Text strong style={{ color: TEXT_COLOR.color }}>
                  {experience?.company}
                </Typography.Text>
                <Typography.Text type="secondary">
                  {new Date(experience?.startedOn).getFullYear()} -{" "}
                  {new Date(experience?.endOn).getFullYear()}
                </Typography.Text>
              </Flex>
              <Typography.Paragraph>
                <ul>
                  <li style={{ fontSize: 14, color: TEXT_COLOR.color }}>
                    {experience?.description}
                  </li>
                </ul>
              </Typography.Paragraph>
            </Flex>
          </Flex>
        ))}

        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Location
        </Typography.Title>

        <Flex gap={10} style={{ marginBlock: "20px" }}>
          <LocationEmployerProfileIcon />

          <Flex vertical gap={4}>
            <Typography.Text style={TEXT_COLOR}>
              {location?.city}
            </Typography.Text>
            <Typography.Text strong style={{ color: TEXT_COLOR.color }}>
              {location?.country}
            </Typography.Text>
            <Typography.Text type="secondary">
              {location?.postalCode}
            </Typography.Text>
          </Flex>
        </Flex>
        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Documents & Links
        </Typography.Title>
        <Flex gap={10} style={{ marginBlock: "20px", width: "100%" }}>
          <EducationIcon />
          <Flex justify="center">
            <Empty description="N/A" />
          </Flex>

          {/* <Flex vertical gap={4}>
            <Typography.Text style={TEXT_COLOR}>
              Resume Alina Smith
            </Typography.Text>

            <Typography.Text type="secondary">
              Added 20 jan, 2024
            </Typography.Text>
          </Flex> */}
        </Flex>
      </Card>
    </div>
  );
};

export default JobSeekerDetail;
