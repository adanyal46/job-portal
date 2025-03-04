import {
  Card,
  DatePicker,
  Input,
  Table,
  Typography,
  Flex,
  Form,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../customPagination";
import { AdminSearchIcon, CalendarDashboardIcon } from "../../../assets/svg";
import CustomSelect from "../../customSelect";
import CustomTag from "../components/CustomTag";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentList } from "../../../features/admin/user/paymentSlice";
import { formatDateToShort } from "../../../utils/index";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const columns = [
  {
    title: "Transaction No.",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_, record) => {
      return <span>{record?.transactionId ?? "-"}</span>;
    },
  },
  {
    title: "Paid By",
    dataIndex: "fullname",
    key: "fullname",
    render: (_, record) => {
      if (record.fullname) {
        return (
          <Flex gap={2}>
            <span>{record?.fullname}</span>
            <strong>{"(" + record?.source.charAt(0) + ")"}</strong>
          </Flex>
        );
      }
      return <span>-</span>;
    },
  },
  {
    title: "Paid on Date",
    dataIndex: "paidOn",
    key: "paidOn",
    render: (_, record) => {
      return (
        <span>{record?.paidOn ? formatDateToShort(record?.paidOn) : "-"}</span>
      );
    },
  },
  {
    title: "Paid For",
    dataIndex: "paidFor",
    key: "paidFor",
    render: (_, record) => {
      return <span>{record?.paidFor ?? "-"}</span>;
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
    dataIndex: "servicePrice",
    render: (_, record) => {
      return <strong>${record?.servicePrice ?? "-"}</strong>;
    },
  },
];
const PaymentList = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.payment);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  useEffect(() => {
    dispatch(fetchPaymentList());
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error Loading Data",
        description: error,
      });
    }
  }, [error]);

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
          dataSource={data ?? []}
          bordered={false}
          pagination={false}
          className="custom-table"
          scroll={{
            x: 200,
          }}
          rowKey="createdAt"
        />
        <CustomPagination
          total={data?.length}
          pageSize={10}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default PaymentList;
