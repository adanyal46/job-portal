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
  { id: 1, ServiceName: "Career Coaching" },
  { id: 2, ServiceName: "Leadership Development" },
  { id: 3, ServiceName: "Entrepreneurship Mentorship" },
  { id: 4, ServiceName: "Life Coaching" },
  { id: 5, ServiceName: "Financial Planning" },
  { id: 6, ServiceName: "Public Speaking" },
  { id: 7, ServiceName: "Marketing Strategy" },
  { id: 8, ServiceName: "Sales Training" },
  { id: 9, ServiceName: "Product Management" },
  { id: 10, ServiceName: "Customer Experience" },
  { id: 11, ServiceName: "Technical Skills Coaching" },
  { id: 12, ServiceName: "Software Development Mentorship" },
  { id: 13, ServiceName: "Data Science Mentorship" },
  { id: 14, ServiceName: "AI & Machine Learning" },
  { id: 15, ServiceName: "UI/UX Design Mentorship" },
  { id: 16, ServiceName: "Cybersecurity Mentorship" },
  { id: 17, ServiceName: "Healthcare Coaching" },
  { id: 18, ServiceName: "Academic Counseling" },
  { id: 19, ServiceName: "Project Management" },
  { id: 20, ServiceName: "Fitness and Wellness" },
  { id: 21, ServiceName: "Mental Health Support" },
  { id: 22, ServiceName: "Parenting Coaching" },
  { id: 23, ServiceName: "Time Management" },
  { id: 24, ServiceName: "Creativity & Innovation" },
  { id: 25, ServiceName: "Negotiation Skills" },
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

const MentorServices = () => {
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
        Mentor Services
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

export default MentorServices;
