import { Card, Flex, Input, Select, Table, Typography } from "antd";
import { useState } from "react";
import CustomTag from "../components/CustomTag";
import {
  AdminSearchIcon,
  DownloadIcon,
  MenuEmployerProfileIcon,
} from "../../../assets/svg";
import CustomPagination from "../../customPagination";
import DownloadButton from "../components/DownloadBtn";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const columns = [
  {
    title: "#",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Posted By",
    dataIndex: "postedBy",
    key: "postedBy",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      return <CustomTag label={status} />;
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => <MenuEmployerProfileIcon />,
  },
];
const data = [
  {
    key: "1",
    number: "1",
    title: "Post 1",
    postedBy: "Alice",
    createdAt: "2024-11-01",
    status: "Approved",
  },
  {
    key: "2",
    number: "2",
    title: "Post 2",
    postedBy: "Bob",
    createdAt: "2024-11-02",
    status: "Pending",
  },
  {
    key: "3",
    number: "3",
    title: "Post 3",
    postedBy: "Charlie",
    createdAt: "2024-11-03",
    status: "Disapproved",
  },
  {
    key: "4",
    number: "4",
    title: "Post 4",
    postedBy: "David",
    createdAt: "2024-11-04",
    status: "Approved",
  },
  {
    key: "5",
    number: "5",
    title: "Post 5",
    postedBy: "Eva",
    createdAt: "2024-11-05",
    status: "Pending",
  },
  {
    key: "6",
    number: "6",
    title: "Post 6",
    postedBy: "Frank",
    createdAt: "2024-11-06",
    status: "Disapproved",
  },
  {
    key: "7",
    number: "7",
    title: "Post 7",
    postedBy: "Grace",
    createdAt: "2024-11-07",
    status: "Approved",
  },
  {
    key: "8",
    number: "8",
    title: "Post 8",
    postedBy: "Henry",
    createdAt: "2024-11-08",
    status: "Pending",
  },
  {
    key: "9",
    number: "9",
    title: "Post 9",
    postedBy: "Ivy",
    createdAt: "2024-11-09",
    status: "Disapproved",
  },
  {
    key: "10",
    number: "10",
    title: "Post 10",
    postedBy: "Jack",
    createdAt: "2024-11-10",
    status: "Approved",
  },
  {
    key: "11",
    number: "11",
    title: "Post 11",
    postedBy: "Karen",
    createdAt: "2024-11-11",
    status: "Pending",
  },
  {
    key: "12",
    number: "12",
    title: "Post 12",
    postedBy: "Leo",
    createdAt: "2024-11-12",
    status: "Disapproved",
  },
  {
    key: "13",
    number: "13",
    title: "Post 13",
    postedBy: "Mona",
    createdAt: "2024-11-13",
    status: "Approved",
  },
  {
    key: "14",
    number: "14",
    title: "Post 14",
    postedBy: "Nate",
    createdAt: "2024-11-14",
    status: "Pending",
  },
  {
    key: "15",
    number: "15",
    title: "Post 15",
    postedBy: "Olivia",
    createdAt: "2024-11-15",
    status: "Disapproved",
  },
];

const Blogs = () => {
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
        Employers
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
          scroll={{
            x: 200,
          }}
          rowKey="key"
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

export default Blogs;
