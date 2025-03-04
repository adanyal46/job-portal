import {
  Card,
  DatePicker,
  Input,
  Table,
  Typography,
  Flex,
  notification,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import CustomPagination from "../customPagination";
import CustomSelect from "../customSelect";
import CustomTag from "./components/CustomTag";
import { AdminSearchIcon, CalendarDashboardIcon } from "../../assets/svg";
import { formatDateToShort } from "../../utils";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const columns = [
  {
    title: "#ID",
    dataIndex: "subscriptionId",
    key: "subscriptionId",
    render: (_, record) => {
      return <span>{record?.subscriptionId ?? "-"}</span>;
    },
  },
  {
    title: "Plan Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Job Slot",
    dataIndex: "jobSlots",
    key: "jobSlots",
  },
  {
    title: "Resume Searches",
    dataIndex: "resumeSearches",
    key: "resumeSearches",
  },

  {
    title: "Price",
    dataIndex: "pricePaid",
    render: (_, record) => {
      return <strong>$ {record?.pricePaid ?? "-"}</strong>;
    },
  },
  {
    title: "Purchased At",
    dataIndex: "purchasedAt",
    key: "purchasedAt",
    render: (_, record) => {
      return (
        <span>
          {record?.purchasedAt ? formatDateToShort(record?.purchasedAt) : "-"}
        </span>
      );
    },
  },
];
const AdminEmployerPayment = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    fetchPlans(id);
  }, [id]);

  const fetchPlans = async (id) => {
    try {
      const response = await axiosInstance.get("/admin/getPlainDetail/" + id);
      setData(response.data.data.subscriptionsBought || []);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Purchased Plan List
      </Typography.Title>
      <Card>
        {/* <Flex gap={10} wrap="wrap">
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
        </Flex> */}
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

export default AdminEmployerPayment;
