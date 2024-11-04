import { Card, Flex, Input, Select, Table, Typography } from "antd";
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
  { title: "#", dataIndex: "id", key: "id" },
  { title: "Contact Name", dataIndex: "contactName", key: "contactName" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone No", dataIndex: "phone", key: "phone" },
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Booking",
    dataIndex: "booking",
    key: "booking",
    render: () => <AdminBookingIcon />,
  },
  {
    title: "Purchased Plan",
    dataIndex: "plan",
    key: "plan",
    render: () => <AdminNotepadIcon />,
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
    contactName: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    address: "123 Main St",
    booking: "Yes",
    plan: "Premium",
  },
  {
    id: 2,
    contactName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+987654321",
    address: "456 Elm St",
    booking: "No",
    plan: "Basic",
  },
  {
    id: 3,
    contactName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+192837465",
    address: "789 Oak St",
    booking: "Yes",
    plan: "Standard",
  },
  {
    id: 4,
    contactName: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+564738291",
    address: "101 Pine St",
    booking: "Yes",
    plan: "Premium",
  },
  {
    id: 5,
    contactName: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+102938475",
    address: "202 Maple St",
    booking: "No",
    plan: "Basic",
  },
  {
    id: 6,
    contactName: "James Taylor",
    email: "james.taylor@example.com",
    phone: "+918273645",
    address: "303 Cedar St",
    booking: "Yes",
    plan: "Standard",
  },
  {
    id: 7,
    contactName: "Olivia Martin",
    email: "olivia.martin@example.com",
    phone: "+5647382910",
    address: "404 Birch St",
    booking: "No",
    plan: "Premium",
  },
  {
    id: 8,
    contactName: "William Moore",
    email: "william.moore@example.com",
    phone: "+182736455",
    address: "505 Willow St",
    booking: "Yes",
    plan: "Basic",
  },
  {
    id: 9,
    contactName: "Sophia Anderson",
    email: "sophia.anderson@example.com",
    phone: "+374849292",
    address: "606 Aspen St",
    booking: "No",
    plan: "Standard",
  },
  {
    id: 10,
    contactName: "Mason Clark",
    email: "mason.clark@example.com",
    phone: "+283746120",
    address: "707 Spruce St",
    booking: "Yes",
    plan: "Premium",
  },
  {
    id: 11,
    contactName: "Isabella Wright",
    email: "isabella.wright@example.com",
    phone: "+384756109",
    address: "808 Chestnut St",
    booking: "No",
    plan: "Basic",
  },
  {
    id: 12,
    contactName: "Ethan Lee",
    email: "ethan.lee@example.com",
    phone: "+564738392",
    address: "909 Redwood St",
    booking: "Yes",
    plan: "Standard",
  },
  {
    id: 13,
    contactName: "Ava Young",
    email: "ava.young@example.com",
    phone: "+384756291",
    address: "1010 Palm St",
    booking: "Yes",
    plan: "Premium",
  },
  {
    id: 14,
    contactName: "Lucas Hill",
    email: "lucas.hill@example.com",
    phone: "+849302184",
    address: "1111 Cypress St",
    booking: "No",
    plan: "Basic",
  },
  {
    id: 15,
    contactName: "Mia Scott",
    email: "mia.scott@example.com",
    phone: "+937485120",
    address: "1212 Olive St",
    booking: "Yes",
    plan: "Standard",
  },
];

const AdminEmployer = () => {
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

export default AdminEmployer;
