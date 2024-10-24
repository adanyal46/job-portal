import { Card, Flex, Image, List, Typography } from "antd";
import React from "react";
import {
  LinkEmployerProfileIcon,
  LocationIcon,
  MenuEmployerProfileIcon,
  MoneyIcon,
} from "../../assets/svg";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";
import { Link } from "react-router-dom";

const responsibilities = [
  "Conduct user research and evaluate user feedback.",
  "Develop wireframes and prototypes for user interfaces.",
  "Collaborate with product managers and developers to create optimal designs.",
  "Design and optimize user interactions for various platforms.",
  "Stay up-to-date with the latest design trends and technologies.",
];

const requirements = [
  "Proficiency in design software such as Adobe XD, Figma, or Sketch.",
  "Strong understanding of user-centered design principles.",
  "Experience with responsive design and mobile-first approaches.",
  "Ability to present design ideas clearly and effectively.",
  "Good communication and collaboration skills.",
];

const JobDetail = () => {
  const TEXT_STYLE = {
    color: "#2F2C39",
  };
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "960px",
        width: "100%",
      }}
    >
      <Typography.Title level={4} style={{ fontWeight: "400" }}>
        Dashboard / ID #A324BC
      </Typography.Title>
      <Card style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Flex gap={"small"} align="center">
            <Image src="/images/job-icon.png" />
            <Typography.Title level={3} style={TEXT_STYLE}>
              UI/UX Designer
            </Typography.Title>
          </Flex>
          <MenuEmployerProfileIcon style={{ cursor: "pointer" }} />
        </Flex>
        <Flex vertical gap={5}>
          <Flex gap={"small"} style={{ marginTop: "10px" }}>
            <Typography.Text style={{ ...TEXT_STYLE, fontSize: "16px" }}>
              Kosmic AI
            </Typography.Text>
            <LinkEmployerProfileIcon />
          </Flex>
          <Typography.Text style={{ ...TEXT_STYLE, fontSize: "16px" }}>
            Surat
          </Typography.Text>
          <Typography.Text
            style={{
              ...TEXT_STYLE,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            $60,000-$80,000
          </Typography.Text>
          <div>
            <Link to={"/employer/job-applicants"}>
              <CustomButton name="View Job Applicants" category="primary" />
            </Link>
          </div>
        </Flex>

        <Flex vertical style={{ marginTop: "20px" }}>
          <Typography.Title level={3} style={TEXT_STYLE}>
            Job Details
          </Typography.Title>
          <Flex gap={4} style={{ marginBottom: "5px" }}>
            <MoneyIcon />
            <Typography.Text style={TEXT_STYLE}>Pay</Typography.Text>
          </Flex>
          <Tag label={"$60,000-$80,000 a month"} />
          <Flex gap={4} style={{ marginBottom: "5px", marginTop: "10px" }}>
            <MoneyIcon />
            <Typography.Text style={TEXT_STYLE}>Pay</Typography.Text>
          </Flex>
          <Flex gap={5}>
            <Tag label={"Full Time"} />
            <Tag label={"Contract"} />
          </Flex>
        </Flex>

        <Flex vertical style={{ marginTop: "20px" }}>
          <Typography.Title level={3} style={TEXT_STYLE}>
            Location
          </Typography.Title>
          <Flex gap={5}>
            <LocationIcon />
            <Typography.Text style={TEXT_STYLE}>Surat</Typography.Text>
          </Flex>
        </Flex>

        <Flex vertical style={{ marginTop: "20px" }} gap={0}>
          <Typography.Title level={3} style={TEXT_STYLE}>
            Full job description
          </Typography.Title>
          <Typography.Title level={4} style={{ ...TEXT_STYLE, marginTop: 0 }}>
            Full job description: UI/UX Designer
          </Typography.Title>
          <Typography.Title level={4} style={{ ...TEXT_STYLE, marginTop: 0 }}>
            Summary:
          </Typography.Title>

          <Typography.Text style={TEXT_STYLE}>
            We are seeking a talented UI/UX designer to join our team For
            Contractual basis of 3 months . As a designer, you will be
            responsible for creating visually appealing and user-friendly web
            pages and landing pages that align with clients brand and business
            objectives. You will collaborate with cross-functional teams,
            including marketing, development, and content, to ensure the design
            meets the needs of our clients and target audience.
          </Typography.Text>
          <Typography.Title
            level={4}
            style={{ ...TEXT_STYLE, marginTop: "10px" }}
          >
            Responsibilities:
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: "0" }}>
            <ul>
              {responsibilities.map((item) => (
                <li style={{ fontSize: "14px" }}>{item}</li>
              ))}
            </ul>
          </Typography.Paragraph>

          <Typography.Title level={4} style={{ ...TEXT_STYLE, marginTop: "0" }}>
            Requirements:
          </Typography.Title>

          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <ul>
              {requirements.map((item) => (
                <li style={{ fontSize: "14px" }}>{item}</li>
              ))}
            </ul>
          </Typography.Paragraph>
        </Flex>
      </Card>
    </div>
  );
};

export default JobDetail;
