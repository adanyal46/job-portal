import { Card, Flex, Input, Select, Table, Typography } from "antd";
import {
  AdminBookingIcon,
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
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Booking",
    dataIndex: "booking",
    key: "booking",
    render: () => <AdminBookingIcon />,
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
    name: "Liam Brown",
    email: "liam.brown@example.com",
    phone: "+123456789",
    address: "1 Pine St",
    booking: "Yes",
  },
  {
    id: 2,
    name: "Emma Smith",
    email: "emma.smith@example.com",
    phone: "+987654321",
    address: "2 Oak St",
    booking: "No",
  },
  {
    id: 3,
    name: "Oliver White",
    email: "oliver.white@example.com",
    phone: "+192837465",
    address: "3 Maple St",
    booking: "Yes",
  },
  {
    id: 4,
    name: "Ava Blue",
    email: "ava.blue@example.com",
    phone: "+564738291",
    address: "4 Birch St",
    booking: "No",
  },
  {
    id: 5,
    name: "Sophia Black",
    email: "sophia.black@example.com",
    phone: "+102938475",
    address: "5 Cedar St",
    booking: "Yes",
  },
  {
    id: 6,
    name: "Isabella Grey",
    email: "isabella.grey@example.com",
    phone: "+918273645",
    address: "6 Willow St",
    booking: "Yes",
  },
  {
    id: 7,
    name: "Mason Purple",
    email: "mason.purple@example.com",
    phone: "+5647382910",
    address: "7 Ash St",
    booking: "No",
  },
  {
    id: 8,
    name: "Mia Red",
    email: "mia.red@example.com",
    phone: "+182736455",
    address: "8 Elm St",
    booking: "Yes",
  },
  {
    id: 9,
    name: "Lucas Orange",
    email: "lucas.orange@example.com",
    phone: "+374849292",
    address: "9 Alder St",
    booking: "No",
  },
  {
    id: 10,
    name: "Harper Yellow",
    email: "harper.yellow@example.com",
    phone: "+283746120",
    address: "10 Hickory St",
    booking: "Yes",
  },
  {
    id: 11,
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    phone: "+384756109",
    address: "11 Fir St",
    booking: "No",
  },
  {
    id: 12,
    name: "Charlotte Cyan",
    email: "charlotte.cyan@example.com",
    phone: "+564738392",
    address: "12 Spruce St",
    booking: "Yes",
  },
  {
    id: 13,
    name: "James Violet",
    email: "james.violet@example.com",
    phone: "+384756291",
    address: "13 Poplar St",
    booking: "Yes",
  },
  {
    id: 14,
    name: "Amelia Gold",
    email: "amelia.gold@example.com",
    phone: "+849302184",
    address: "14 Pine St",
    booking: "No",
  },
  {
    id: 15,
    name: "Alexander Green",
    email: "alexander.green@example.com",
    phone: "+937485120",
    address: "15 Sycamore St",
    booking: "Yes",
  },
];
const AdminMentors = () => {
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
        Mentors
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

export default AdminMentors;
