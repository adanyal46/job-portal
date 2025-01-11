import { Card, Flex, Image, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  LinkEmployerProfileIcon,
  LocationIcon,
  MenuEmployerProfileIcon,
  MoneyIcon,
} from "../../assets/svg";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";
import { Link, useParams } from "react-router-dom";
import { getJobDetailApi } from "../../features/employerDashboard/employerDashboardApi";
import { useSelector } from "react-redux";

const TEXT_STYLE = {
  color: "#2F2C39",
};
const JobDetail = () => {
  const { user } = useSelector((state) => state.profile);
  const ROLE = user?.role;
  const route = ROLE === "STAFF_MEMBER" ? "/staff" : "/employer";
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const result = await getJobDetailApi(id);
        setJobDetails(result.data);
      } catch (error) {
        message.error(
          error.message || "Failed to fetch job details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "960px",
        width: "100%",
      }}
    >
      <Typography.Title level={4} style={{ fontWeight: "400" }}>
        Dashboard / ID #{id.toUpperCase()}
      </Typography.Title>
      <Card style={{ width: "100%" }} loading={loading}>
        <Flex justify="space-between">
          <Flex gap={"small"} align="center">
            <Image src="/images/job-icon.png" />
            <Typography.Title level={3} style={TEXT_STYLE}>
              {jobDetails?.jobTitle ?? "-"}
            </Typography.Title>
          </Flex>
          <MenuEmployerProfileIcon style={{ cursor: "pointer" }} />
        </Flex>
        <Flex vertical gap={5}>
          <Flex gap={"small"} style={{ marginTop: "10px" }}>
            <Typography.Text style={{ ...TEXT_STYLE, fontSize: "16px" }}>
              {jobDetails?.companyName ?? "-"}
            </Typography.Text>
            <LinkEmployerProfileIcon />
          </Flex>
          <Typography.Text style={{ ...TEXT_STYLE, fontSize: "16px" }}>
            {jobDetails?.location ?? "-"}
          </Typography.Text>
          <Typography.Text
            style={{
              ...TEXT_STYLE,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            ${jobDetails?.minPrice ?? "-"} - ${jobDetails?.maxPrice ?? "-"}
          </Typography.Text>
          <div>
            <Link to={route + "/job-applicants/" + jobDetails?.randomId}>
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
          <Tag
            label={
              "$" +
              (jobDetails?.minPrice ?? "-") +
              "-" +
              "$" +
              (jobDetails?.maxPrice ?? "-")
            }
          />
          <Flex gap={4} style={{ marginBottom: "5px", marginTop: "10px" }}>
            <MoneyIcon />
            <Typography.Text style={TEXT_STYLE}>Pay</Typography.Text>
          </Flex>
          <Flex gap={5} style={{ textTransform: "capitalize" }}>
            <Tag label={jobDetails?.jobType} />
          </Flex>
        </Flex>

        <Flex vertical style={{ marginTop: "20px" }}>
          <Typography.Title level={3} style={TEXT_STYLE}>
            Location
          </Typography.Title>
          <Flex gap={5}>
            <LocationIcon />
            <Typography.Text style={TEXT_STYLE}>
              {jobDetails?.location ?? "-"}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex vertical style={{ marginTop: "20px" }} gap={0}>
          <Typography.Title level={3} style={TEXT_STYLE}>
            Full job description
          </Typography.Title>
          <Typography.Title level={4} style={{ ...TEXT_STYLE, marginTop: 0 }}>
            Full job description:
            {jobDetails?.jobTitle ?? "-"}
          </Typography.Title>
          <Typography.Title level={4} style={{ ...TEXT_STYLE, marginTop: 0 }}>
            Summary:
          </Typography.Title>
          <Typography.Paragraph style={TEXT_STYLE}>
            <span
              dangerouslySetInnerHTML={{
                __html: jobDetails?.description ?? "-",
              }}
            />
          </Typography.Paragraph>
        </Flex>
      </Card>
    </div>
  );
};

export default JobDetail;
