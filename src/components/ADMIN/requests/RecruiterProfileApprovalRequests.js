import { Button, Card, Dropdown, Flex, Input, Table, Typography } from "antd";
import React, { useState } from "react";
import { AdminSearchIcon } from "../../../assets/svg";
import CustomPagination from "../../customPagination";
import "../admin-employer-styles.scss";
import CustomTag from "../components/CustomTag";
import { Link } from "react-router-dom";

const TEXT_COLOR = {
  color: "#0C0C0C",
};
let data = [
  { id: 1, RecruiterName: "John Doe", Date: "2024-11-01", Status: "Pending" },
  {
    id: 2,
    RecruiterName: "Jane Smith",
    Date: "2024-11-02",
    Status: "Approved",
  },
  {
    id: 3,
    RecruiterName: "Emily Johnson",
    Date: "2024-11-03",
    Status: "Disapproved",
  },
  {
    id: 4,
    RecruiterName: "Michael Brown",
    Date: "2024-11-04",
    Status: "Pending",
  },
  {
    id: 5,
    RecruiterName: "Sophia Williams",
    Date: "2024-11-05",
    Status: "Approved",
  },
  {
    id: 6,
    RecruiterName: "Daniel Jones",
    Date: "2024-11-06",
    Status: "Disapproved",
  },
  {
    id: 7,
    RecruiterName: "Olivia Garcia",
    Date: "2024-11-07",
    Status: "Pending",
  },
  {
    id: 8,
    RecruiterName: "David Miller",
    Date: "2024-11-08",
    Status: "Approved",
  },
  { id: 9, RecruiterName: "Emma Davis", Date: "2024-11-09", Status: "Pending" },
  {
    id: 10,
    RecruiterName: "Liam Wilson",
    Date: "2024-11-10",
    Status: "Disapproved",
  },
];
const columns = [
  {
    title: "Recruiter Name",
    dataIndex: "RecruiterName",
    key: "MentorName",
    width: 400,
  },
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date",
    width: 400,
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    width: 500,

    render: (status, record) => {
      const color = getTagColor(status);
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: "Approved",
                label: "Approved",
                onClick: () => changeStatus(record?.id, "Approved"),
              },
              {
                key: "Disapproved",
                label: "Disapproved",
                onClick: () => changeStatus(record?.id, "Disapproved"),
              },
              {
                key: "Pending",
                label: "Pending",
                onClick: () => changeStatus(record?.id, "Pending"),
              },
            ],
          }}
          trigger={["click"]}
        >
          <CustomTag label={status} color={color} />
        </Dropdown>
      );
    },
  },
  {
    title: "Action",
    key: "Action",
    width: 500,

    render: (text, record) => (
      <Link to={"/admin/recruiter-profile/" + record.id}>
        <Button style={{ width: "200px" }} size="large">
          View Profile
        </Button>
      </Link>
    ),
  },
];

// Function to get tag color based on status
const getTagColor = (status) => {
  switch (status) {
    case "Approved":
      return "#DAF9E8";
    case "Disapproved":
      return "#F8EEED";
    case "Pending":
      return "#FAF4EE";
    default:
      return "#FAF4EE";
  }
};

// Dummy function to change the status
const changeStatus = (id, newStatus) => {
  return data
    .filter((item) => item.id === id)
    .map((item) => item.Status === newStatus);
};

const RecruiterProfileApprovalRequests = () => {
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
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Recruiter Profile Approval Requests
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
        </Flex>
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          className="custom-table"
          scroll={{
            x: 200,
          }}
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

export default RecruiterProfileApprovalRequests;
