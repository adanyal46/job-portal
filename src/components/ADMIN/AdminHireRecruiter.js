import {
  Button,
  Card,
  Dropdown,
  Flex,
  Form,
  Input,
  message,
  notification,
  Table,
  Typography,
} from "antd";
import { AdminSearchIcon, MenuEmployerProfileIcon } from "../../assets/svg";
import "./admin-employer-styles.scss";
import CustomPagination from "../customPagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHireRecruiter } from "../../features/admin/user/hireRecruiterSlice";
import CustomTag from "./components/CustomTag";
import CommonModal from "../commonModal";
import { formatDateToShort } from "../../utils";
import CommonInput from "../commonInput";
import axiosInstance from "../../api/axiosInstance";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const AdminHireRecruiter = () => {
  const dispatch = useDispatch();
  const [invoiceForm] = Form.useForm();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.hireRecruiter
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const columns = [
    { title: "#Booking ID", dataIndex: "bookingId", key: "bookingId" },
    {
      title: "Recruiter Name",
      dataIndex: "recruiterName",
      key: "recruiterName",
    },
    {
      title: "Hired by(Employer)",
      dataIndex: "employerCompanyName",
      key: "employerCompanyName",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
      key: "appliedOn",
      render: (_, record) => {
        return <span>{formatDateToShort(record.appliedOn)}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "adminStatus",
      key: "adminStatus",
      render: (_, record) => {
        return <CustomTag label={record.adminStatus} />;
      },
    },
    {
      title: "Invoice No.",
      dataIndex: "invoice",
      key: "invoice",
      render: (_, record) => {
        if (record.invoice) {
          return (
            <span
              onClick={() => {
                setBookingId(record.bookingId);
                setOpenInvoiceModal(true);
              }}
            >
              {record.invoice}
            </span>
          );
        }
        return (
          <Button
            onClick={() => {
              setBookingId(record.bookingId);
              setOpenInvoiceModal(true);
            }}
            style={{
              color: "#52595C",
              fontSize: "15px",
              fontWeight: "500",
              padding: "14px 20px",
              minHeight: "40px",
              borderColor: "#AEACB4",
            }}
          >
            Add Invoice No.
          </Button>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => {
        return <CustomTag label={record.paymentStatus} />;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link style={{ color: "#2F2C39", fontWeight: "500" }}>
                    Send to Recruiter
                  </Link>
                ),
                key: "0",
              },
              {
                label: (
                  <Link
                    to={"/admin/hire-recruiter/" + record.bookingId}
                    style={{ color: "#2F2C39", fontWeight: "500" }}
                  >
                    View Job Details
                  </Link>
                ),
                key: "1",
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
  useEffect(() => {
    if (searchQuery.length > 3) {
      setCurrentPage(1);
      setDebouncedSearchQuery(searchQuery);
    } else {
      setDebouncedSearchQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      fetchHireRecruiter({
        page: currentPage,
        pageSize: pagination.perPage,
        search: debouncedSearchQuery ?? "",
      })
    );
  }, [dispatch, currentPage, pagination.pageSize, debouncedSearchQuery]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error Loading Data",
        description: error,
      });
    }
  }, [error]);

  const handleTableChange = (page) => {
    setCurrentPage(page);
  };

  const handleClose = () => {
    setOpenInvoiceModal(false);
  };

  const handleSubmit = async () => {
    try {
      await invoiceForm.validateFields();
      const values = invoiceForm.getFieldsValue();

      const response = await axiosInstance.put(
        "/admin/updateInvoice/" + bookingId,
        values
      );
      if (response.data && response.status === 200) {
        message.open({
          type: "success",
          content: response.data.message || "Invoice Added",
        });
        handleClose();
        window.location.reload();
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error?.response?.data?.message || "Internal Server Error",
      });
    }
  };

  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Hired Recruiter Requests
      </Typography.Title>
      <Card>
        <Flex flex={1} gap={10} wrap="wrap">
          <Input
            size="large"
            style={{ maxWidth: "400px", width: "100%" }}
            placeholder="Search"
            prefix={<AdminSearchIcon />}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </Flex>

        <Table
          columns={columns}
          dataSource={data}
          bordered={false}
          pagination={false}
          className="custom-table"
          rowKey="bookingId"
          scroll={{
            x: 200,
          }}
        />
        <CustomPagination
          total={pagination?.totalRecords}
          pageSize={pagination?.perPage}
          currentPage={currentPage}
          onChange={handleTableChange}
        />
      </Card>
      <CommonModal
        isModalOpen={openInvoiceModal}
        isDelete={false}
        saveBtnText={"Add"}
        handleClose={handleClose}
        handleOk={handleSubmit}
      >
        <Form size="large" form={invoiceForm}>
          <Typography.Title
            level={3}
            style={{
              textAlign: "center",
              fontWeight: "500",
              color: "#0C0C0C",
            }}
          >
            Add Invoice Number
          </Typography.Title>
          <Form.Item
            name={"invoice"}
            rules={[{ required: true, message: "Enter number?" }]}
          >
            <CommonInput placeholder="Enter Number" />
          </Form.Item>
        </Form>
      </CommonModal>
    </div>
  );
};

export default AdminHireRecruiter;
