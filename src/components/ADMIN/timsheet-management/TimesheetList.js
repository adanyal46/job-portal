import { useState, useEffect } from "react";
import {
  Card,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  Menu,
  message,
  Select,
  Table,
} from "antd"; // or any other pagination library
import {
  AdminSearchIcon,
  CalendarDashboardIcon,
  MenuEmployerProfileIcon,
} from "../../../assets/svg";
import CustomPagination from "../../customPagination";
import axiosInstance from "../../../api/axiosInstance";
import CustomButton from "../../customButton";
import CustomTag from "../components/CustomTag";
import { useNavigate } from "react-router-dom";
import { getDayDate } from "../../../utils";

function TimesheetList() {
  const navigate = useNavigate();
  const [timesheetData, setTimesheetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  useEffect(() => {
    fetchTimesheetDetails();
  }, []);
  const fetchTimesheetDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/timesheetDetails");
      console.log(response);

      setTimesheetData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (timesheetId, status) => {
    try {
      await axiosInstance.put(`/admin/adminapprovalstatus/${timesheetId}`, {
        adminApprovalStatus: status,
      });
      fetchTimesheetDetails();
    } catch (error) {
      message.open({
        type: "error",
        content: error.message,
      });
    }
  };
  const handlePaymentStatusChange = async (timesheetId, status) => {
    try {
      await axiosInstance.put(`/admin/paymentstatus/${timesheetId}`, {
        paymentStatus: status,
      });
      fetchTimesheetDetails();
    } catch (error) {
      message.open({
        type: "error",
        content: error.message,
      });
    }
  };
  const menu = (record) => (
    <Menu style={{ width: 200 }}>
      <Menu.Item key="3">
        <a
          onClick={() => {
            navigate(`/admin/timesheet/view/${record.timesheetNo}`);
          }}
          style={{ fontSize: "15px" }}
        >
          View Details
        </a>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    { title: "Timesheet No", dataIndex: "timesheetNo", key: "timesheetNo" },
    { title: "Booking ID", dataIndex: "bookingID", key: "bookingID" },
    {
      title: "Recruiter Name",
      dataIndex: "recruiterName",
      key: "recruiterName",
    },
    {
      title: "Company Name",
      dataIndex: "employerCompanyName",
      key: "employerCompanyName",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => {
        if (record?.createdAt) {
          return getDayDate(record?.createdAt);
        }
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmountDue",
      key: "totalAmountDue",
    },
    {
      title: "Recruiter Amount",
      dataIndex: "recruiterAmount",
      key: "recruiterAmount",
    },
    {
      title: "Status",
      dataIndex: "adminApprovalStatus",
      key: "adminApprovalStatus",
      width: 200,
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: "100%" }}
          onChange={(value) => handleStatusChange(record.timesheetNo, value)}
          options={[
            {
              label: "Accepted",
              value: "ACCEPTED",
            },
            {
              label: "Approved",
              value: "APPROVED",
            },
            {
              label: "Declined",
              value: "DECLINED",
            },
            {
              label: "Decline",
              value: "DECLINE",
            },
            {
              label: "Cancelled",
              value: "CANCELLED",
            },
            {
              label: "Pending",
              value: "PENDING",
            },
          ]}
        />
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 200,
      render: (status, record) => (
        <Select
          style={{ width: "100%" }}
          value={status}
          onChange={(value) =>
            handlePaymentStatusChange(record.timesheetNo, value)
          }
          options={[
            {
              label: "Pending",
              value: "PENDING",
            },
            {
              label: "Decline",
              value: "DECLINE",
            },

            {
              label: "Completed",
              value: "COMPLETED",
            },
            {
              label: "Failed",
              value: "FAILED",
            },
            {
              label: "Refunded",
              value: "REFUNDED",
            },
            {
              label: "Cancelled",
              value: "CANCELLED",
            },
            {
              label: "Paid",
              value: "PAID",
            },
          ]}
        />
      ),
    },
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      render: () => (
        <CustomButton
          style={{ backgroundColor: "white", borderColor: "#AEACB4" }}
          category="plain"
          name="Add Invoice No."
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <a className="ant-dropdown-link" href="#">
            <MenuEmployerProfileIcon />,
          </a>
        </Dropdown>
      ),
    },
  ];
  return (
    <Col xs={24}>
      <Card loading={loading}>
        <Flex gap={10} align="center" wrap="wrap">
          <Input
            size="large"
            style={{ flex: 2, width: "100%" }}
            placeholder="Search"
            prefix={<AdminSearchIcon />}
          />
          <DatePicker
            style={{ flex: 1 }}
            placeholder="Select From"
            size="large"
            suffixIcon={<CalendarDashboardIcon />}
          />
          <DatePicker
            style={{ flex: 1 }}
            placeholder="Select To"
            size="large"
            suffixIcon={<CalendarDashboardIcon />}
          />
          {/* <Flex gap={10} flex={1} justify="end" wrap="wrap">
            <DownloadButton title="Download CVS" icon={<DownloadIcon />} />
            <DownloadButton title="Download PDF" icon={<DownloadIcon />} />
          </Flex> */}
        </Flex>
        <Table
          columns={columns}
          dataSource={timesheetData?.timesheets ?? []}
          scroll={{
            x: 200,
          }}
          bordered={false}
          pagination={false}
          className="custom-table"
          rowKey="timesheetNo"
        />
        {timesheetData?.timesheets?.length > 10 && (
          <CustomPagination
            total={timesheetData?.totalTimesheets}
            pageSize={timesheetData?.pageSize ?? pageSize}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Card>
    </Col>
  );
}

export default TimesheetList;
