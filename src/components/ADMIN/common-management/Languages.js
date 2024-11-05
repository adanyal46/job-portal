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
  { id: 1, LanguageName: "English" },
  { id: 2, LanguageName: "Spanish" },
  { id: 3, LanguageName: "Mandarin Chinese" },
  { id: 4, LanguageName: "French" },
  { id: 5, LanguageName: "German" },
  { id: 6, LanguageName: "Japanese" },
  { id: 7, LanguageName: "Russian" },
  { id: 8, LanguageName: "Portuguese" },
  { id: 9, LanguageName: "Hindi" },
  { id: 10, LanguageName: "Arabic" },
  { id: 11, LanguageName: "Italian" },
  { id: 12, LanguageName: "Korean" },
  { id: 13, LanguageName: "Turkish" },
  { id: 14, LanguageName: "Dutch" },
  { id: 15, LanguageName: "Greek" },
  { id: 16, LanguageName: "Swedish" },
  { id: 17, LanguageName: "Thai" },
  { id: 18, LanguageName: "Polish" },
  { id: 19, LanguageName: "Norwegian" },
  { id: 20, LanguageName: "Danish" },
  { id: 21, LanguageName: "Finnish" },
  { id: 22, LanguageName: "Hebrew" },
  { id: 23, LanguageName: "Czech" },
  { id: 24, LanguageName: "Hungarian" },
  { id: 25, LanguageName: "Vietnamese" },
];

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (text, record, index) => index + 1, // Display row number instead of ID
  },
  {
    title: "Language Name",
    dataIndex: "LanguageName",
    key: "LanguageName",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => <MenuEmployerProfileIcon />,
  },
];

const Languages = () => {
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
        Languages
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
          <CustomButton category="plain" name="Add Languages" />
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

export default Languages;
