import { Card, Flex, Input, Table, Typography } from "antd";
import React, { useState } from "react";
import { AdminSearchIcon, MenuEmployerProfileIcon } from "../../../assets/svg";
import CustomButton from "../../customButton";
import CustomPagination from "../../customPagination";
import "../admin-employer-styles.scss";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const data = [
  { id: 1, ServiceName: "Executive Search" },
  { id: 2, ServiceName: "IT Recruiting" },
  { id: 3, ServiceName: "Healthcare Recruiting" },
  { id: 4, ServiceName: "Engineering Recruitment" },
  { id: 5, ServiceName: "Sales & Marketing Recruitment" },
  { id: 6, ServiceName: "Finance & Accounting Recruitment" },
  { id: 7, ServiceName: "Temporary Staffing" },
  { id: 8, ServiceName: "Contract Staffing" },
  { id: 9, ServiceName: "Permanent Placement" },
  { id: 10, ServiceName: "Diversity Recruitment" },
  { id: 11, ServiceName: "Remote Hiring Solutions" },
  { id: 12, ServiceName: "Freelance Talent Sourcing" },
  { id: 13, ServiceName: "Campus Recruiting" },
  { id: 14, ServiceName: "Retail & Hospitality Recruitment" },
  { id: 15, ServiceName: "Legal & Compliance Recruiting" },
  { id: 16, ServiceName: "Operations & Supply Chain Recruiting" },
  { id: 17, ServiceName: "Human Resources Recruiting" },
  { id: 18, ServiceName: "Customer Service Staffing" },
  { id: 19, ServiceName: "Creative & Design Talent Recruitment" },
  { id: 20, ServiceName: "Manufacturing & Industrial Staffing" },
  { id: 21, ServiceName: "Onboarding Support Services" },
  { id: 22, ServiceName: "Background Screening" },
  { id: 23, ServiceName: "Recruitment Process Outsourcing (RPO)" },
  { id: 24, ServiceName: "Skill Assessment & Testing" },
  { id: 25, ServiceName: "Outplacement Services" },
];

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (text, record, index) => index + 1, // Display row number instead of ID
  },
  {
    title: "ServiceName",
    dataIndex: "ServiceName",
    key: "ServiceName",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => <MenuEmployerProfileIcon />,
  },
];

const RecruiterServices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div style={{ maxWidth: "946px", width: "100%", margin: "0 auto" }}>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Recruiter Services
      </Typography.Title>
      <Card style={{ boxShadow: "0px 2px 4px 0px #A5A3AE4D" }}>
        <Flex gap={10} wrap="wrap" justify="space-between" align="center">
          <Input
            size="large"
            style={{
              maxWidth: "400px",
              width: "100%",
              borderColor: "#AEACB4",
              borderRadius: "6px",
            }}
            placeholder="Search"
            prefix={<AdminSearchIcon />}
          />
          <CustomButton category="plain" name="Add Service" />
        </Flex>
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          className="custom-table"
        />
        <CustomPagination
          total={data.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default RecruiterServices;
