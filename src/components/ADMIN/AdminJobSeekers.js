import { Card, Flex, Input, Select, Table, Typography } from "antd";
import {
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
  { title: "#", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone No", dataIndex: "phone", key: "phone" },
  { title: "State", dataIndex: "state", key: "state" },
  { title: "City", dataIndex: "city", key: "city" },
  {
    title: "Purchased Plan",
    dataIndex: "plan",
    key: "plan",
    render: (text) => <AdminNotepadIcon />,
  },
  {
    title: "Resume",
    dataIndex: "resume",
    key: "resume",
    render: (text) => <DownloadIcon />,
  },
  {
    title: "Actions",
    key: "actions",
    render: () => <MenuEmployerProfileIcon />,
  },
];

const data = [
  {
    id: 1,
    name: "Olivia Green",
    email: "olivia.green@example.com",
    phone: "+123456789",
    state: "California",
    city: "Los Angeles",
    plan: "Standard",
    resume: "/resumes/olivia-green.pdf",
  },
  {
    id: 2,
    name: "Noah Blue",
    email: "noah.blue@example.com",
    phone: "+987654321",
    state: "New York",
    city: "New York City",
    plan: "Premium",
    resume: "/resumes/noah-blue.pdf",
  },
  {
    id: 3,
    name: "Emma White",
    email: "emma.white@example.com",
    phone: "+192837465",
    state: "Texas",
    city: "Houston",
    plan: "Basic",
    resume: "/resumes/emma-white.pdf",
  },
  {
    id: 4,
    name: "Liam Black",
    email: "liam.black@example.com",
    phone: "+564738291",
    state: "Florida",
    city: "Miami",
    plan: "Premium",
    resume: "/resumes/liam-black.pdf",
  },
  {
    id: 5,
    name: "Ava Brown",
    email: "ava.brown@example.com",
    phone: "+102938475",
    state: "Illinois",
    city: "Chicago",
    plan: "Standard",
    resume: "/resumes/ava-brown.pdf",
  },
  {
    id: 6,
    name: "Mason Grey",
    email: "mason.grey@example.com",
    phone: "+918273645",
    state: "Georgia",
    city: "Atlanta",
    plan: "Standard",
    resume: "/resumes/mason-grey.pdf",
  },
  {
    id: 7,
    name: "Sophia Violet",
    email: "sophia.violet@example.com",
    phone: "+5647382910",
    state: "Arizona",
    city: "Phoenix",
    plan: "Basic",
    resume: "/resumes/sophia-violet.pdf",
  },
  {
    id: 8,
    name: "Lucas Red",
    email: "lucas.red@example.com",
    phone: "+182736455",
    state: "North Carolina",
    city: "Charlotte",
    plan: "Premium",
    resume: "/resumes/lucas-red.pdf",
  },
  {
    id: 9,
    name: "Isabella Orange",
    email: "isabella.orange@example.com",
    phone: "+374849292",
    state: "Washington",
    city: "Seattle",
    plan: "Standard",
    resume: "/resumes/isabella-orange.pdf",
  },
  {
    id: 10,
    name: "Elijah Yellow",
    email: "elijah.yellow@example.com",
    phone: "+283746120",
    state: "Colorado",
    city: "Denver",
    plan: "Basic",
    resume: "/resumes/elijah-yellow.pdf",
  },
  {
    id: 11,
    name: "Mia Cyan",
    email: "mia.cyan@example.com",
    phone: "+384756109",
    state: "Virginia",
    city: "Virginia Beach",
    plan: "Standard",
    resume: "/resumes/mia-cyan.pdf",
  },
  {
    id: 12,
    name: "Henry Blue",
    email: "henry.blue@example.com",
    phone: "+564738392",
    state: "Ohio",
    city: "Columbus",
    plan: "Premium",
    resume: "/resumes/henry-blue.pdf",
  },
  {
    id: 13,
    name: "Evelyn Gold",
    email: "evelyn.gold@example.com",
    phone: "+384756291",
    state: "Michigan",
    city: "Detroit",
    plan: "Basic",
    resume: "/resumes/evelyn-gold.pdf",
  },
  {
    id: 14,
    name: "William Green",
    email: "william.green@example.com",
    phone: "+849302184",
    state: "Oregon",
    city: "Portland",
    plan: "Standard",
    resume: "/resumes/william-green.pdf",
  },
  {
    id: 15,
    name: "Ella Brown",
    email: "ella.brown@example.com",
    phone: "+937485120",
    state: "Tennessee",
    city: "Nashville",
    plan: "Premium",
    resume: "/resumes/ella-brown.pdf",
  },
];
const AdminJobSeeker = () => {
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
        Job Seeker
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

export default AdminJobSeeker;
