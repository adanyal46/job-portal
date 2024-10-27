import { Card, Flex, Image, Typography } from "antd";
import React from "react";
import {
  CertificationsIcon,
  EducationIcon,
  EmploymentIcon,
  LocationEmployerProfileIcon,
} from "../../assets/svg";
const TEXT_COLOR = {
  color: "#4B465C",
  fontSize: "16px",
};
const HEADING_COLOR = {
  color: "#333333",
};
const JobSeekerDetail = () => {
  return (
    <div style={{ maxWidth: "969px", width: "100%", margin: "0 auto" }}>
      <Card>
        <Flex align="center">
          <Flex>
            <Image
              width={200}
              height={200}
              src="/images/no-image.jpg"
              preview={false}
            />
          </Flex>
          <Flex flex={1} vertical>
            <Typography.Title level={3} style={HEADING_COLOR}>
              Alina Smith
            </Typography.Title>
            <Typography.Text style={TEXT_COLOR}>
              Alina Smith@gmail.com
            </Typography.Text>
            <Typography.Text style={TEXT_COLOR}>+1 305 3216549</Typography.Text>
          </Flex>
        </Flex>
        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Education and Certifications
        </Typography.Title>
        <Flex gap={10} style={{ marginTop: "20px" }}>
          <EducationIcon />

          <Flex vertical gap={4}>
            <Typography.Text style={TEXT_COLOR}>
              Bachelors of Science in Computer Science
            </Typography.Text>
            <Typography.Text type="secondary">
              The University of North Carolina at Chapel Hill
            </Typography.Text>
            <Typography.Text type="secondary">2010 - 2014</Typography.Text>
          </Flex>
        </Flex>

        <Flex gap={10} style={{ marginBlock: "20px" }}>
          <CertificationsIcon />

          <Flex vertical gap={4}>
            <Typography.Text style={TEXT_COLOR}>
              Certificate in UX Foundations
            </Typography.Text>
            <Typography.Text type="secondary">
              The University of North Carolina at Chapel Hill
            </Typography.Text>
            <Typography.Text type="secondary">2018 • Sep</Typography.Text>
          </Flex>
        </Flex>

        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Employment and Experience History
        </Typography.Title>
        <Flex gap={10} style={{ marginBlock: "20px" }}>
          <EmploymentIcon />

          <Flex vertical gap={4} className="w-100">
            <Typography.Text style={TEXT_COLOR}>
              Product Designer
            </Typography.Text>
            <Flex justify="space-between" align="center">
              <Typography.Text strong style={{ color: TEXT_COLOR.color }}>
                Sierra Interactive
              </Typography.Text>
              <Typography.Text type="secondary">2010 - Present</Typography.Text>
            </Flex>
            <Typography.Paragraph>
              <ul>
                <li style={{ fontSize: 14, color: TEXT_COLOR.color }}>
                  this is ver importna tex
                </li>
              </ul>
            </Typography.Paragraph>
          </Flex>
        </Flex>

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
              California City
            </Typography.Text>
            <Typography.Text strong style={{ color: TEXT_COLOR.color }}>
              Calfornia
            </Typography.Text>
            <Typography.Text type="secondary">20323</Typography.Text>
          </Flex>
        </Flex>
        <hr
          className="mentor-detail-divider"
          style={{ marginBottom: "20px" }}
        />
        <Typography.Title level={3} style={HEADING_COLOR}>
          Documents & Links
        </Typography.Title>
        <Flex gap={10} style={{ marginBlock: "20px" }}>
          <EducationIcon />

          <Flex vertical gap={4}>
            <Typography.Text style={TEXT_COLOR}>
              Resume Alina Smith
            </Typography.Text>

            <Typography.Text type="secondary">
              Added 20 jan, 2024
            </Typography.Text>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default JobSeekerDetail;
