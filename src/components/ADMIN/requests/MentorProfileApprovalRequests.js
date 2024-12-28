import {
  Button,
  Card,
  Dropdown,
  Flex,
  Input,
  message,
  notification,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { AdminSearchIcon } from "../../../assets/svg";
import CustomPagination from "../../customPagination";
import "../admin-employer-styles.scss";
import CustomTag from "../components/CustomTag";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileApproval } from "../../../features/admin/user/profileApprovalSlice";
import { formatDateToShort } from "../../../utils";
import axiosInstance from "../../../api/axiosInstance";

const TEXT_COLOR = {
  color: "#0C0C0C",
};
let data = [
  { id: 1, MentorName: "John Doe", Date: "2024-11-01", Status: "Pending" },
  { id: 2, MentorName: "Jane Smith", Date: "2024-11-02", Status: "Approved" },
  {
    id: 3,
    MentorName: "Emily Johnson",
    Date: "2024-11-03",
    Status: "Disapproved",
  },
  { id: 4, MentorName: "Michael Brown", Date: "2024-11-04", Status: "Pending" },
  {
    id: 5,
    MentorName: "Sophia Williams",
    Date: "2024-11-05",
    Status: "Approved",
  },
  {
    id: 6,
    MentorName: "Daniel Jones",
    Date: "2024-11-06",
    Status: "Disapproved",
  },
  { id: 7, MentorName: "Olivia Garcia", Date: "2024-11-07", Status: "Pending" },
  { id: 8, MentorName: "David Miller", Date: "2024-11-08", Status: "Approved" },
  { id: 9, MentorName: "Emma Davis", Date: "2024-11-09", Status: "Pending" },
  {
    id: 10,
    MentorName: "Liam Wilson",
    Date: "2024-11-10",
    Status: "Disapproved",
  },
];
const columns = [
  {
    title: "Mentor Name",
    dataIndex: "fullname",
    key: "fullname",
    width: 400,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 400,
    render: (_, record) => {
      return <span> {formatDateToShort(record.createdAt)}</span>;
    },
  },
  {
    title: "Status",
    dataIndex: "userStatus",
    key: "userStatus",
    width: 500,

    render: (status, record) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: "Approved",
                label: "Approved",
                onClick: () => changeStatus(record?.userId, "APPROVED"),
                disabled: record.userStatus === "APPROVED",
              },
              {
                key: "Disapproved",
                label: "Disapproved",
                onClick: () => changeStatus(record?.userId, "DISAPPROVED"),
                disabled: record.userStatus === "DISAPPROVED",
              },
              {
                key: "Pending",
                label: "Pending",
                onClick: () => changeStatus(record?.userId, "PENDING"),
                disabled: record.userStatus === "PENDING",
              },
            ],
          }}
          trigger={["click"]}
        >
          <CustomTag label={status} />
        </Dropdown>
      );
    },
  },
  {
    title: "Action",
    key: "Action",
    width: 500,

    render: (text, record) => (
      <Link to={"/admin/mentor-profile/" + record.userId}>
        <Button style={{ width: "200px" }} size="large">
          View Profile
        </Button>
      </Link>
    ),
  },
];

// Dummy function to change the status
const changeStatus = async (id, newStatus) => {
  try {
    const response = await axiosInstance.put("/admin/updateUserStatus", {
      userId: id,
      userStatus: newStatus,
    });

    if (response.data && response.status === 200) {
      message.open({
        type: "success",
        content: response.data.message || "Status Updated",
      });
      setTimeout(() => {
        window.location.reload();
      }, 300);
      return;
    }
  } catch (error) {
    message.open({
      type: "error",
      content: error?.response?.data?.message || "Internal Server Error",
    });
  }
};
const MentorProfileApprovalRequests = () => {
  const dispatch = useDispatch();
  const { data, pagination, error } = useSelector(
    (state) => state.profileApproval
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

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
      fetchProfileApproval({
        role: "MENTOR",
        page: currentPage,
        pageSize: pagination.perPage ?? 10,
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Mentor Profile Approval Requests
      </Typography.Title>
      <Card style={{ boxShadow: "0px 2px 4px 0px #A5A3AE4D" }}>
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
          dataSource={data ?? []}
          pagination={false}
          rowKey={"userId"}
          scroll={{
            x: 200,
          }}
          className="custom-table"
        />
        <CustomPagination
          total={pagination.totalUsers}
          pageSize={pagination.pageSize ?? 10}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default MentorProfileApprovalRequests;
