import {
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Table,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons"; // Importing the chevron down icon
import React from "react";
import { CalendarDashboardIcon } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";

const ViewJobApplicantList = () => {
  const DIVIDER_STYLE = {
    borderColor: "#DEDCE4",
  };

  // Sample data for the table
  const dataSource = [
    {
      key: "1",
      candidate: "John Doe",
      dateOfApplication: "2024-01-01",
      workExperience: "5 years",
      qualification: "Bachelor’s Degree",
      location: "New York",
      zipCode: "10001",
      resume: "link-to-resume-1.pdf",
      status: "In Progress", // Status can be: "In Progress", "Resume Reviewed", "Interview Scheduled", "Shortlisted", "Rejected"
    },
    {
      key: "2",
      candidate: "Jane Smith",
      dateOfApplication: "2024-02-01",
      workExperience: "3 years",
      qualification: "Master’s Degree",
      location: "Los Angeles",
      zipCode: "90001",
      resume: "link-to-resume-2.pdf",
      status: "Shortlisted",
    },
    {
      key: "3",
      candidate: "Michael Johnson",
      dateOfApplication: "2024-03-01",
      workExperience: "4 years",
      qualification: "Bachelor’s Degree",
      location: "Chicago",
      zipCode: "60601",
      resume: "link-to-resume-3.pdf",
      status: "Rejected",
    },
    {
      key: "4",
      candidate: "Michael Johnson",
      dateOfApplication: "2024-03-01",
      workExperience: "4 years",
      qualification: "Bachelor’s Degree",
      location: "Chicago",
      zipCode: "60601",
      resume: "link-to-resume-3.pdf",
      status: "Resume Reviewed",
    },
    {
      key: "5",
      candidate: "Michael Johnson",
      dateOfApplication: "2024-03-01",
      workExperience: "4 years",
      qualification: "Bachelor’s Degree",
      location: "Chicago",
      zipCode: "60601",
      resume: "link-to-resume-3.pdf",
      status: "Shortlisted",
    },
    // Add more sample data as needed
  ];

  const columns = [
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "candidate",
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
          case "In Progress":
            style = { backgroundColor: "#FAF4EE", color: "#F9912E" };
            break;
          case "Resume Reviewed":
          case "Interview Scheduled":
            style = { backgroundColor: "#E2F3F9", color: "#0077A6" };
            break;
          case "Shortlisted":
            style = { backgroundColor: "#DAF9E8", color: "#1BBB62" };
            break;
          case "Rejected":
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
        Dashboard / ID #A324BC / Job Applicants
      </Typography.Title>
      <Card
        style={{ width: "100%" }}
        styles={{
          body: {
            padding: 0,
          },
        }}
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
            dataSource={dataSource}
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
          <CustomPagination />
        </div>
      </Card>
    </div>
  );
};

export default ViewJobApplicantList;
