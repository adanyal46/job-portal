import { Card, DatePicker, Input, Table, Typography, Flex, Form } from "antd";
import React, { useState } from "react";
import CustomPagination from "../../customPagination";
import { AdminSearchIcon, CalendarDashboardIcon } from "../../../assets/svg";
import CustomSelect from "../../customSelect";
import CustomTag from "../components/CustomTag";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const data = [
  {
    key: "1",
    transactionNo: "TXN12345",
    paidBy: "Alice Johnson",
    paidOnDate: "2024-11-01",
    paidFor: "Session",
    paymentStatus: "Paid",
    price: "$50",
  },
  {
    key: "2",
    transactionNo: "TXN67890",
    paidBy: "Bob Smith",
    paidOnDate: "2024-11-02",
    paidFor: "Session",
    paymentStatus: "Pending",
    price: "$150",
  },
  {
    key: "3",
    transactionNo: "TXN54321",
    paidBy: "Carol Williams",
    paidOnDate: "2024-11-03",
    paidFor: "Premium",
    paymentStatus: "Unpaid",
    price: "$200",
  },
  {
    key: "4",
    transactionNo: "TXN98765",
    paidBy: "David Brown",
    paidOnDate: "2024-11-04",
    paidFor: "Job Postings",
    paymentStatus: "Paid",
    price: "$75",
  },
  {
    key: "5",
    transactionNo: "TXN23456",
    paidBy: "Eva Green",
    paidOnDate: "2024-11-05",
    paidFor: "Resume Search",
    paymentStatus: "Paid",
    price: "$120",
  },
  // Add more dummy records as needed
  {
    key: "6",
    transactionNo: "TXN34567",
    paidBy: "Frank White",
    paidOnDate: "2024-11-06",
    paidFor: "Resume Search",
    paymentStatus: "Pending",
    price: "$35",
  },
  {
    key: "7",
    transactionNo: "TXN45678",
    paidBy: "Grace Lee",
    paidOnDate: "2024-11-07",
    paidFor: "Donation",
    paymentStatus: "Paid",
    price: "$250",
  },
  {
    key: "8",
    transactionNo: "TXN56789",
    paidBy: "Henry King",
    paidOnDate: "2024-11-08",
    paidFor: "Subscription",
    paymentStatus: "Unpaid",
    price: "$50",
  },
  {
    key: "9",
    transactionNo: "TXN67891",
    paidBy: "Ivy Scott",
    paidOnDate: "2024-11-09",
    paidFor: "Course Fee",
    paymentStatus: "Paid",
    price: "$100",
  },
  {
    key: "10",
    transactionNo: "TXN78912",
    paidBy: "Jack Miller",
    paidOnDate: "2024-11-10",
    paidFor: "Membership",
    paymentStatus: "Pending",
    price: "$75",
  },
  {
    key: "11",
    transactionNo: "TXN89012",
    paidBy: "Kathy Nelson",
    paidOnDate: "2024-11-11",
    paidFor: "Consultation",
    paymentStatus: "Paid",
    price: "$60",
  },
  {
    key: "12",
    transactionNo: "TXN90123",
    paidBy: "Leo Hall",
    paidOnDate: "2024-11-12",
    paidFor: "Workshop",
    paymentStatus: "Unpaid",
    price: "$80",
  },
  {
    key: "13",
    transactionNo: "TXN01234",
    paidBy: "Mona Clark",
    paidOnDate: "2024-11-13",
    paidFor: "Event Ticket",
    paymentStatus: "Pending",
    price: "$40",
  },
  {
    key: "14",
    transactionNo: "TXN12346",
    paidBy: "Nate Young",
    paidOnDate: "2024-11-14",
    paidFor: "Donation",
    paymentStatus: "Paid",
    price: "$150",
  },
  {
    key: "15",
    transactionNo: "TXN23457",
    paidBy: "Olivia Perez",
    paidOnDate: "2024-11-15",
    paidFor: "Subscription",
    paymentStatus: "Unpaid",
    price: "$60",
  },
];
const columns = [
  {
    title: "Transaction No.",
    dataIndex: "transactionNo",
    key: "transactionNo",
  },
  {
    title: "Paid By",
    dataIndex: "paidBy",
    key: "paidBy",
  },
  {
    title: "Paid on Date",
    dataIndex: "paidOnDate",
    key: "paidOnDate",
  },
  {
    title: "Paid For",
    dataIndex: "paidFor",
    key: "paidFor",
    render: (status) => {
      return <CustomTag label={status} />;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (status) => {
      return <CustomTag label={status} />;
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];
const PaymentList = () => {
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
        Payment List
      </Typography.Title>
      <Card>
        <Flex gap={10} wrap="wrap">
          <Input
            size="large"
            style={{ flex: 2, width: "100%" }}
            placeholder="Search"
            prefix={<AdminSearchIcon />}
          />
          <CustomSelect styles={{ flex: 1 }} placeholder="Paid For" />
          <CustomSelect styles={{ flex: 1 }} placeholder="Payment Status" />
          <CustomSelect styles={{ flex: 1 }} placeholder="Pay" />
          <CustomSelect styles={{ flex: 1 }} placeholder="Price" />
          <DatePicker
            style={{ flex: 1 }}
            placeholder="Date Range"
            size="large"
            suffixIcon={<CalendarDashboardIcon />}
          />
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

export default PaymentList;
