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
  { id: 1, SkillName: "JavaScript" },
  { id: 2, SkillName: "Python" },
  { id: 3, SkillName: "HTML & CSS" },
  { id: 4, SkillName: "React.js" },
  { id: 5, SkillName: "Node.js" },
  { id: 6, SkillName: "Database Management" },
  { id: 7, SkillName: "Machine Learning" },
  { id: 8, SkillName: "Project Management" },
  { id: 9, SkillName: "Digital Marketing" },
  { id: 10, SkillName: "Graphic Design" },
  { id: 11, SkillName: "SEO Optimization" },
  { id: 12, SkillName: "Data Analysis" },
  { id: 13, SkillName: "UI/UX Design" },
  { id: 14, SkillName: "Cybersecurity" },
  { id: 15, SkillName: "Cloud Computing" },
  { id: 16, SkillName: "DevOps" },
  { id: 17, SkillName: "Copywriting" },
  { id: 18, SkillName: "Business Analysis" },
  { id: 19, SkillName: "Salesforce" },
  { id: 20, SkillName: "Customer Service" },
  { id: 21, SkillName: "Content Creation" },
  { id: 22, SkillName: "Agile Methodologies" },
  { id: 23, SkillName: "Networking" },
  { id: 24, SkillName: "Blockchain" },
  { id: 25, SkillName: "Public Speaking" },
];

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (text, record, index) => index + 1, // Display row number instead of ID
  },
  {
    title: "Skill Name",
    dataIndex: "SkillName",
    key: "SkillName",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => <MenuEmployerProfileIcon />,
  },
];

const Skills = () => {
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
        Skills
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
          <CustomButton category="plain" name="Add Skills" />
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

export default Skills;
