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
import CustomTag from "./components/CustomTag";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const columns = [
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    key: "bookingId",
  },
  {
    title: "Recruiter Name",
    dataIndex: "recruiterName",
    key: "recruiterName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone No.",
    dataIndex: "phoneNo",
    key: "phoneNo",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Timesheet Created",
    dataIndex: "timesheetCreated",
    key: "timesheetCreated",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      return <CustomTag label={status} />;
    },
  },
];
const data = [
  {
    key: "1",
    bookingId: "B12345",
    recruiterName: "John Doe",
    email: "john.doe@example.com",
    phoneNo: "(123) 456-7890",
    state: "California",
    city: "Los Angeles",
    timesheetCreated: "2024-11-01",
    status: "Approved",
  },
  {
    key: "2",
    bookingId: "B12346",
    recruiterName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNo: "(123) 456-7891",
    state: "Texas",
    city: "Houston",
    timesheetCreated: "2024-11-02",
    status: "Pending",
  },
  {
    key: "3",
    bookingId: "B12347",
    recruiterName: "Michael Johnson",
    email: "michael.johnson@example.com",
    phoneNo: "(123) 456-7892",
    state: "Florida",
    city: "Miami",
    timesheetCreated: "2024-11-03",
    status: "Disapproved",
  },
  {
    key: "4",
    bookingId: "B12348",
    recruiterName: "Emily Davis",
    email: "emily.davis@example.com",
    phoneNo: "(123) 456-7893",
    state: "New York",
    city: "New York City",
    timesheetCreated: "2024-11-04",
    status: "Approved",
  },
  {
    key: "5",
    bookingId: "B12349",
    recruiterName: "James Brown",
    email: "james.brown@example.com",
    phoneNo: "(123) 456-7894",
    state: "California",
    city: "San Francisco",
    timesheetCreated: "2024-11-05",
    status: "Pending",
  },
  {
    key: "6",
    bookingId: "B12350",
    recruiterName: "Alice Wilson",
    email: "alice.wilson@example.com",
    phoneNo: "(123) 456-7895",
    state: "Texas",
    city: "Dallas",
    timesheetCreated: "2024-11-06",
    status: "Disapproved",
  },
  {
    key: "7",
    bookingId: "B12351",
    recruiterName: "David Miller",
    email: "david.miller@example.com",
    phoneNo: "(123) 456-7896",
    state: "Florida",
    city: "Orlando",
    timesheetCreated: "2024-11-07",
    status: "Approved",
  },
  {
    key: "8",
    bookingId: "B12352",
    recruiterName: "Sophia Moore",
    email: "sophia.moore@example.com",
    phoneNo: "(123) 456-7897",
    state: "New York",
    city: "Buffalo",
    timesheetCreated: "2024-11-08",
    status: "Pending",
  },
  {
    key: "9",
    bookingId: "B12353",
    recruiterName: "William Taylor",
    email: "william.taylor@example.com",
    phoneNo: "(123) 456-7898",
    state: "California",
    city: "San Diego",
    timesheetCreated: "2024-11-09",
    status: "Disapproved",
  },
  {
    key: "10",
    bookingId: "B12354",
    recruiterName: "Olivia Anderson",
    email: "olivia.anderson@example.com",
    phoneNo: "(123) 456-7899",
    state: "Texas",
    city: "Austin",
    timesheetCreated: "2024-11-10",
    status: "Approved",
  },
  {
    key: "11",
    bookingId: "B12355",
    recruiterName: "Liam Thomas",
    email: "liam.thomas@example.com",
    phoneNo: "(123) 456-7800",
    state: "Florida",
    city: "Tampa",
    timesheetCreated: "2024-11-11",
    status: "Pending",
  },
  {
    key: "12",
    bookingId: "B12356",
    recruiterName: "Isabella Jackson",
    email: "isabella.jackson@example.com",
    phoneNo: "(123) 456-7801",
    state: "New York",
    city: "Rochester",
    timesheetCreated: "2024-11-12",
    status: "Disapproved",
  },
  {
    key: "13",
    bookingId: "B12357",
    recruiterName: "Ethan White",
    email: "ethan.white@example.com",
    phoneNo: "(123) 456-7802",
    state: "California",
    city: "Sacramento",
    timesheetCreated: "2024-11-13",
    status: "Approved",
  },
  {
    key: "14",
    bookingId: "B12358",
    recruiterName: "Mason Harris",
    email: "mason.harris@example.com",
    phoneNo: "(123) 456-7803",
    state: "Texas",
    city: "Fort Worth",
    timesheetCreated: "2024-11-14",
    status: "Pending",
  },
  {
    key: "15",
    bookingId: "B12359",
    recruiterName: "Amelia Clark",
    email: "amelia.clark@example.com",
    phoneNo: "(123) 456-7804",
    state: "Florida",
    city: "Jacksonville",
    timesheetCreated: "2024-11-15",
    status: "Disapproved",
  },
];

const AdminBookings = () => {
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
        Bookings
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

export default AdminBookings;
