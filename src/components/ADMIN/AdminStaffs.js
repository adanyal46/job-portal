import { Card, Flex, Input, Select, Table, Tag, Typography } from "antd";
import {
  AdminBookingIcon,
  AdminNotepadIcon,
  AdminSearchIcon,
  DownloadIcon,
  MenuEmployerProfileIcon,
} from "../../assets/svg";
import "./admin-employer-styles.scss";
import CustomPagination from "../customPagination";
import { useState } from "react";
import DownloadButton from "./components/DownloadBtn";

const TEXT_COLOR = {
  color: "#0C0C0C",
};

const columns = [
  { title: "ID#", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Employer", dataIndex: "employer", key: "employer" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: () => <Tag color="green">Engaged</Tag>,
  },
];
const data = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    employer: "Tech Corp",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    employer: "Innovate LLC",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol.white@example.com",
    employer: "Alpha Inc.",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@example.com",
    employer: "Creative Solutions",
  },
  {
    id: 5,
    name: "Eve Black",
    email: "eve.black@example.com",
    employer: "Green Tech",
  },
  {
    id: 6,
    name: "Frank Blue",
    email: "frank.blue@example.com",
    employer: "Next Gen Labs",
  },
  {
    id: 7,
    name: "Grace Green",
    email: "grace.green@example.com",
    employer: "Future Holdings",
  },
  {
    id: 8,
    name: "Henry Yellow",
    email: "henry.yellow@example.com",
    employer: "Bright Ideas",
  },
  {
    id: 9,
    name: "Isabel Purple",
    email: "isabel.purple@example.com",
    employer: "Skyline Ventures",
  },
  {
    id: 10,
    name: "Jack Red",
    email: "jack.red@example.com",
    employer: "Urban Innovations",
  },
  {
    id: 11,
    name: "Karen Cyan",
    email: "karen.cyan@example.com",
    employer: "Apex Solutions",
  },
  {
    id: 12,
    name: "Liam Violet",
    email: "liam.violet@example.com",
    employer: "DataWave",
  },
  {
    id: 13,
    name: "Mia Gold",
    email: "mia.gold@example.com",
    employer: "Quantum Leap",
  },
  {
    id: 14,
    name: "Noah Silver",
    email: "noah.silver@example.com",
    employer: "Tech Horizons",
  },
  {
    id: 15,
    name: "Olivia Bronze",
    email: "olivia.bronze@example.com",
    employer: "Prime Solutions",
  },
];
const AdminStaffs = () => {
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
        Staff
      </Typography.Title>
      <Card>
        <Flex gap={10} justify="space-between" align="center" wrap="wrap">
          <Flex flex={1} gap={10} wrap="wrap">
            <Input
              size="large"
              style={{ maxWidth: "400px", width: "100%" }}
              placeholder="Search"
              prefix={<AdminSearchIcon />}
            />
            <Select
              size="large"
              style={{ maxWidth: "200px", width: "100%" }}
              placeholder="Sort By"
              prefix={<AdminSearchIcon />}
            />
          </Flex>
          <Flex gap={10} flex={1} justify="end" wrap="wrap">
            <DownloadButton title="Download CVS" icon={<DownloadIcon />} />
            <DownloadButton title="Download PDF" icon={<DownloadIcon />} />
          </Flex>
        </Flex>

        <Table
          columns={columns}
          dataSource={paginatedData}
          bordered={false}
          pagination={false}
          className="custom-table"
          rowKey="id"
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

export default AdminStaffs;
