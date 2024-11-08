import { Card, Dropdown, Flex, Input, Select, Table, Typography } from "antd";
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
import { Link } from "react-router-dom";
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
    title: "Actions",
    key: "actions",
    render: () => (
      <Dropdown
        menu={{
          items: [
            {
              label: <Link to={"/admin/user/bookings"}> View Details</Link>,
              key: "0",
            },
            {
              label: "Edit ",
              key: "1",
            },
            {
              type: "divider",
            },
            {
              label: "Delete",
              key: "3",
            },
          ],
        }}
        trigger={["click"]}
      >
        <MenuEmployerProfileIcon />
      </Dropdown>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "+123456789",
    address: "1 Apple St",
  },
  {
    id: 2,
    name: "Bob Green",
    email: "bob.green@example.com",
    phone: "+987654321",
    address: "2 Banana St",
  },
  {
    id: 3,
    name: "Charlie White",
    email: "charlie.white@example.com",
    phone: "+192837465",
    address: "3 Cherry St",
  },
  {
    id: 4,
    name: "Diana Blue",
    email: "diana.blue@example.com",
    phone: "+564738291",
    address: "4 Date St",
  },
  {
    id: 5,
    name: "Edward Black",
    email: "edward.black@example.com",
    phone: "+102938475",
    address: "5 Elder St",
  },
  {
    id: 6,
    name: "Fiona Grey",
    email: "fiona.grey@example.com",
    phone: "+918273645",
    address: "6 Fig St",
  },
  {
    id: 7,
    name: "George Purple",
    email: "george.purple@example.com",
    phone: "+5647382910",
    address: "7 Grape St",
  },
  {
    id: 8,
    name: "Hannah Red",
    email: "hannah.red@example.com",
    phone: "+182736455",
    address: "8 Honey St",
  },
  {
    id: 9,
    name: "Ian Orange",
    email: "ian.orange@example.com",
    phone: "+374849292",
    address: "9 Ivy St",
  },
  {
    id: 10,
    name: "Jack Yellow",
    email: "jack.yellow@example.com",
    phone: "+283746120",
    address: "10 Jasmine St",
  },
  {
    id: 11,
    name: "Kate Brown",
    email: "kate.brown@example.com",
    phone: "+384756109",
    address: "11 Kiwi St",
  },
  {
    id: 12,
    name: "Leo Cyan",
    email: "leo.cyan@example.com",
    phone: "+564738392",
    address: "12 Lemon St",
  },
  {
    id: 13,
    name: "Mona Violet",
    email: "mona.violet@example.com",
    phone: "+384756291",
    address: "13 Mango St",
  },
  {
    id: 14,
    name: "Nina Gold",
    email: "nina.gold@example.com",
    phone: "+849302184",
    address: "14 Nectarine St",
  },
  {
    id: 15,
    name: "Oscar Green",
    email: "oscar.green@example.com",
    phone: "+937485120",
    address: "15 Olive St",
  },
];
const AdminRecruiters = () => {
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
        Recruiters
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

export default AdminRecruiters;
