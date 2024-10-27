import {
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  message,
  Row,
  Table,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons"; // Importing the chevron down icon
import React, { useEffect, useState } from "react";
import { CalendarDashboardIcon } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";
import { useParams } from "react-router-dom";
import { getAppliedJobListApi } from "../../features/employerDashboard/employerDashboardApi";
const DIVIDER_STYLE = {
  borderColor: "#DEDCE4",
};

const ViewJobApplicantList = () => {
  const { id } = useParams();
  const [applicantList, setApplicantList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobApplicant = async () => {
      try {
        const result = await getAppliedJobListApi(id);
        setApplicantList(result.data);
      } catch (error) {
        message.error(
          error.message || "Failed to fetch job details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplicant();
  }, [id]);

  // Sample data for the table

  const columns = [
    {
      title: "Candidate",
      dataIndex: "fullname",
      key: "fullname",
      width: 100,
    },
    {
      title: "Date of Application",
      dataIndex: "dateOfApplication",
      key: "dateOfApplication",
    },
    {
      title: "Work Experience",
      dataIndex: "workExperience",
      key: "workExperience",
      width: 100,
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
      width: 100,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 100,
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
      width: 100,
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      width: 140,
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background:
              "linear-gradient(287.99deg, #001F3F -20.42%, #009DD1 62.87%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Resume PDF
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let style = {};
        switch (status) {
          case "IN_PROGRESS":
            style = { backgroundColor: "#FAF4EE", color: "#F9912E" };
            break;
          case "RESUMED_REVIEWED":
          case "INTERVIEW_SCHEDULED":
            style = { backgroundColor: "#E2F3F9", color: "#0077A6" };
            break;
          case "SHORTLISTED":
            style = { backgroundColor: "#DAF9E8", color: "#1BBB62" };
            break;
          case "REJECTED":
            style = { backgroundColor: "#FAF4EE", color: "#F9912E" };
            break;
          default:
            style = {};
        }
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center", // Center the icon vertically
              padding: "4px 8px",
              borderRadius: "4px",
              ...style,
            }}
          >
            {status}
            <DownOutlined style={{ marginLeft: "8px" }} />{" "}
            {/* Chevron down icon */}
          </span>
        );
      },
    },
  ];

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "960px",
        width: "100%",
      }}
    >
      <Typography.Title level={4} style={{ fontWeight: "400" }}>
        Dashboard / ID #{id.toUpperCase()} / Job Applicants
      </Typography.Title>
      <Card
        style={{ width: "100%" }}
        styles={{
          body: {
            padding: 0,
          },
        }}
        loading={loading}
      >
        <div style={{ padding: "20px" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Input.Search
                size="large"
                placeholder="Search"
                allowClear
                onSearch={(value) => console.log(value)}
              />
            </Col>
            <Col span={8}>
              <DatePicker
                size="large"
                className="w-100"
                suffixIcon={<CalendarDashboardIcon />}
              />
            </Col>
            <Col span={8}>
              <DatePicker
                size="large"
                className="w-100"
                suffixIcon={<CalendarDashboardIcon />}
              />
            </Col>
          </Row>
        </div>
        <Divider style={{ ...DIVIDER_STYLE, marginTop: "0" }} />
        <div style={{ padding: "0px 20px 20px 20px" }}>
          <Table
            dataSource={applicantList}
            columns={columns}
            pagination={false}
            style={{ background: "white" }} // Table background
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "white",
                      fontWeight: "500",
                      color: "#000",
                    }}
                  />
                ),
              },
            }}
          />
          {applicantList?.length >= 10 && <CustomPagination />}
        </div>
      </Card>
    </div>
  );
};

export default ViewJobApplicantList;
