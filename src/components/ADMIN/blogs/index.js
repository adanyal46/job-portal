import {
  Card,
  Dropdown,
  Flex,
  Input,
  Menu,
  notification,
  Select,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import CustomTag from "../components/CustomTag";
import {
  AdminSearchIcon,
  DownloadIcon,
  MenuEmployerProfileIcon,
} from "../../../assets/svg";
import CustomPagination from "../../customPagination";
import DownloadButton from "../components/DownloadBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogList } from "../../../features/admin/user/blogSlice";
import CustomButton from "../../customButton";
import axiosInstance from "../../../api/axiosInstance";
import { formatDateToShort } from "../../../utils";
import { useNavigate } from "react-router-dom";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector((state) => state.blog);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  useEffect(() => {
    dispatch(fetchBlogList());
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
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Replace with your actual API endpoint
      const response = await axiosInstance.put(`/admin/blogStatus/${id}`, {
        status: newStatus,
      });
      if (response.data.success) {
        notification.success({
          message: "Status Updated",
          description: `Status updated to ${newStatus} successfully.`,
        });
      }
      dispatch(fetchBlogList());
    } catch (error) {
      notification.error({
        message: "Error Updating Status",
        description: error.response?.data?.message || "An error occurred.",
      });
    }
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => {
        return (
          <span>
            {record?.createdAt ? formatDateToShort(record?.createdAt) : "-"}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <Select
            value={record.status}
            onChange={(value) => handleStatusChange(record.id, value)}
            style={{ width: 120 }}
          >
            {/* Replace with your actual status options */}
            <Select.Option value="PENDING">PENDING</Select.Option>
            <Select.Option value="APPROVED">APPROVED</Select.Option>
            <Select.Option value="REJECTED">REJECTED</Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            <Menu.Item key="edit">Edit</Menu.Item>
            {/* <Menu.Item key="delete">Delete</Menu.Item> */}
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MenuEmployerProfileIcon />
            </a>
          </Dropdown>
        );
      },
    },
  ];
  const handleMenuClick = (action, record) => {
    if (action === "edit") {
      navigate("/admin/blogs/" + record?.id);
    } else if (action === "delete") {
      // Implement delete logic here
      notification.warning({
        message: "Delete Action",
        description: `Deleting blog with ID: ${record.id}`,
      });
    }
  };
  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Blogs
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
            <CustomButton name="Add" category="primary" />
          </Flex>
        </Flex>

        <Table
          columns={columns}
          dataSource={data}
          bordered={false}
          pagination={false}
          className="custom-table"
          scroll={{
            x: 200,
          }}
          rowKey="id"
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

export default Blogs;
