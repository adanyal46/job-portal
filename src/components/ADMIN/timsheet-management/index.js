import React, { useState } from "react";
import {
  AdminSearchIcon,
  CalendarDashboardIcon,
  MenuEmployerProfileIcon,
} from "../../../assets/svg";
import {
  Card,
  Col,
  DatePicker,
  Flex,
  Input,
  Row,
  Table,
  Typography,
} from "antd";
import CustomButton from "../../customButton";
import CustomTag from "../components/CustomTag";
import CustomPagination from "../../customPagination";
import TimesheetCounts from "./TimesheetCounts";
import TimesheetList from "./TimesheetList";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const data = [
  {
    key: "1",
    timesheetNo: "TS12345",
    bookingId: "B12345",
    recruiterName: "John Doe",
    companyName: "Tech Solutions",
    date: "2024-11-08",
    totalAmount: "$2000",
    recruiterAmount: "$500",
    status: "Approved",
    paymentStatus: "Paid",
    invoiceNo: "INV12345",
  },
  {
    key: "2",
    timesheetNo: "TS67890",
    bookingId: "B67890",
    recruiterName: "Jane Smith",
    companyName: "Design Corp",
    date: "2024-11-07",
    totalAmount: "$1500",
    recruiterAmount: "$300",
    status: "Pending",
    paymentStatus: "Unpaid",
    invoiceNo: "INV67890",
  },
  {
    key: "3",
    timesheetNo: "TS23456",
    bookingId: "B23456",
    recruiterName: "Alice Johnson",
    companyName: "Global Industries",
    date: "2024-11-06",
    totalAmount: "$1800",
    recruiterAmount: "$450",
    status: "Disapproved",
    paymentStatus: "Pending",
    invoiceNo: "INV23456",
  },
  {
    key: "4",
    timesheetNo: "TS34567",
    bookingId: "B34567",
    recruiterName: "Robert Brown",
    companyName: "NextGen Corp",
    date: "2024-11-05",
    totalAmount: "$2200",
    recruiterAmount: "$550",
    status: "Approved",
    paymentStatus: "Paid",
    invoiceNo: "INV34567",
  },
  {
    key: "5",
    timesheetNo: "TS45678",
    bookingId: "B45678",
    recruiterName: "Linda White",
    companyName: "Innovatech",
    date: "2024-11-04",
    totalAmount: "$2400",
    recruiterAmount: "$600",
    status: "Pending",
    paymentStatus: "Paid",
    invoiceNo: "INV45678",
  },
  {
    key: "6",
    timesheetNo: "TS56789",
    bookingId: "B56789",
    recruiterName: "Michael Green",
    companyName: "Alpha Solutions",
    date: "2024-11-03",
    totalAmount: "$2100",
    recruiterAmount: "$525",
    status: "Approved",
    paymentStatus: "Unpaid",
    invoiceNo: "INV56789",
  },
  {
    key: "7",
    timesheetNo: "TS67891",
    bookingId: "B67891",
    recruiterName: "Sarah Blue",
    companyName: "Beta Innovations",
    date: "2024-11-02",
    totalAmount: "$1900",
    recruiterAmount: "$475",
    status: "Disapproved",
    paymentStatus: "Pending",
    invoiceNo: "INV67891",
  },
  {
    key: "8",
    timesheetNo: "TS78901",
    bookingId: "B78901",
    recruiterName: "James Black",
    companyName: "Future Tech",
    date: "2024-11-01",
    totalAmount: "$2500",
    recruiterAmount: "$625",
    status: "Approved",
    paymentStatus: "Paid",
    invoiceNo: "INV78901",
  },
  {
    key: "9",
    timesheetNo: "TS89012",
    bookingId: "B89012",
    recruiterName: "Rachel Violet",
    companyName: "Optimum Solutions",
    date: "2024-10-31",
    totalAmount: "$2700",
    recruiterAmount: "$675",
    status: "Pending",
    paymentStatus: "Paid",
    invoiceNo: "INV89012",
  },
  {
    key: "10",
    timesheetNo: "TS90123",
    bookingId: "B90123",
    recruiterName: "Tom Gray",
    companyName: "Advance Networks",
    date: "2024-10-30",
    totalAmount: "$2300",
    recruiterAmount: "$575",
    status: "Disapproved",
    paymentStatus: "Unpaid",
    invoiceNo: "INV90123",
  },
  {
    key: "11",
    timesheetNo: "TS01234",
    bookingId: "B01234",
    recruiterName: "Emma Orange",
    companyName: "Blue Sky",
    date: "2024-10-29",
    totalAmount: "$2500",
    recruiterAmount: "$600",
    status: "Approved",
    paymentStatus: "Paid",
    invoiceNo: "INV01234",
  },
  {
    key: "12",
    timesheetNo: "TS11234",
    bookingId: "B11234",
    recruiterName: "John White",
    companyName: "Golden Horizon",
    date: "2024-10-28",
    totalAmount: "$1600",
    recruiterAmount: "$400",
    status: "Pending",
    paymentStatus: "Unpaid",
    invoiceNo: "INV11234",
  },
  {
    key: "13",
    timesheetNo: "TS21234",
    bookingId: "B21234",
    recruiterName: "Amy Purple",
    companyName: "Creative Minds",
    date: "2024-10-27",
    totalAmount: "$2100",
    recruiterAmount: "$525",
    status: "Approved",
    paymentStatus: "Paid",
    invoiceNo: "INV21234",
  },
  {
    key: "14",
    timesheetNo: "TS31234",
    bookingId: "B31234",
    recruiterName: "Chris Brown",
    companyName: "Urban Dynamics",
    date: "2024-10-26",
    totalAmount: "$1900",
    recruiterAmount: "$475",
    status: "Pending",
    paymentStatus: "Pending",
    invoiceNo: "INV31234",
  },
  {
    key: "15",
    timesheetNo: "TS41234",
    bookingId: "B41234",
    recruiterName: "Anna Grey",
    companyName: "Spark Tech",
    date: "2024-10-25",
    totalAmount: "$1800",
    recruiterAmount: "$450",
    status: "Disapproved",
    paymentStatus: "Unpaid",
    invoiceNo: "INV41234",
  },
];

const TimesheetManagement = () => {
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
        Timesheet Management
      </Typography.Title>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <TimesheetCounts />
        <TimesheetList />
      </Row>
    </div>
  );
};

export default TimesheetManagement;
