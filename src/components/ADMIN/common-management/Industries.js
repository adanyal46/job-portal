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
  { id: 1, ServiceName: "Web Development" },
  { id: 2, ServiceName: "Mobile Development" },
  { id: 3, ServiceName: "SEO Optimization" },
  { id: 4, ServiceName: "Graphic Design" },
  { id: 5, ServiceName: "Digital Marketing" },
  { id: 6, ServiceName: "Content Writing" },
  { id: 7, ServiceName: "Data Analysis" },
  { id: 8, ServiceName: "IT Consulting" },
  { id: 9, ServiceName: "Cybersecurity" },
  { id: 10, ServiceName: "Project Management" },
  { id: 11, ServiceName: "Cloud Computing" },
  { id: 12, ServiceName: "Video Editing" },
  { id: 13, ServiceName: "Machine Learning" },
  { id: 14, ServiceName: "Artificial Intelligence" },
  { id: 15, ServiceName: "Social Media Management" },
  { id: 16, ServiceName: "Customer Support" },
  { id: 17, ServiceName: "Network Administration" },
  { id: 18, ServiceName: "Database Management" },
  { id: 19, ServiceName: "Blockchain Development" },
  { id: 20, ServiceName: "Game Development" },
  { id: 21, ServiceName: "Software Testing" },
  { id: 22, ServiceName: "E-commerce Solutions" },
  { id: 23, ServiceName: "UI/UX Design" },
  { id: 24, ServiceName: "Big Data Solutions" },
  { id: 25, ServiceName: "Augmented Reality" },
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

const Industries = () => {
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
        Industries
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
          <CustomButton category="plain" name="Add Industries" />
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

export default Industries;
