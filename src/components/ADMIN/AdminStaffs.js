import {
  Card,
  Flex,
  Input,
  message,
  notification,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  AdminBookingIcon,
  AdminNotepadIcon,
  AdminSearchIcon,
  DownloadIcon,
  MenuEmployerProfileIcon,
} from "../../assets/svg";
import "./admin-employer-styles.scss";
import CustomPagination from "../customPagination";
import { useEffect, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import { fetchStaffs } from "../../features/admin/user/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import StaffStatusDropdown from "./components/StaffStatusDropdown";
import axiosInstance from "../../api/axiosInstance";

const TEXT_COLOR = {
  color: "#0C0C0C",
};

const AdminStaffs = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.staffs
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchQuery.length > 3) {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    } else {
      setDebouncedSearchQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      fetchStaffs({
        page: currentPage,
        pageSize: pagination.pageSize,
        sortOrder,
        search: debouncedSearchQuery ?? "",
      })
    );
  }, [
    dispatch,
    currentPage,
    pagination.pageSize,
    sortOrder,
    debouncedSearchQuery,
  ]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error Loading Data",
        description: error,
      });
    }
  }, [error]);

  const columns = [
    { title: "ID#", dataIndex: "userId", key: "userId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Employer", dataIndex: "employer", key: "employer" },
    {
      title: "Status",
      dataIndex: "staffStatus",
      key: "staffStatus",
      render: (staffStatus, record, index) => {
        return (
          <StaffStatusDropdown
            value={staffStatus}
            onChange={(newValue) => handleStatusChange(record.userId, newValue)}
          />
        );
      },
    },
  ];
  const handleStatusChange = async (key, newStatus) => {
    try {
      const response = await axiosInstance.put("/admin/SFstatus/" + key, {
        staffStatus: newStatus,
      });
      message.open({
        type: "success",
        content: response.data.message || "Status Updated!",
      });
      dispatch(
        fetchStaffs({
          page: currentPage,
          pageSize: pagination.pageSize,
          sortOrder,
          search: debouncedSearchQuery ?? "",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleTableChange = (page) => {
    setCurrentPage(page);
  };

  const handleSorting = (value) => {
    setSortOrder(value);
  };

  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Staff
      </Typography.Title>
      <Card>
        <Flex gap={10} justify="space-between" align="center" wrap="wrap">
          <Flex flex={1} gap={10} wrap="wrap">
            <Input
              size="large"
              style={{ maxWidth: "400px", width: "100%" }}
              placeholder="Search"
              prefix={<AdminSearchIcon />}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
            <Select
              size="large"
              style={{ maxWidth: "200px", width: "100%" }}
              placeholder="Sort By"
              prefix={<AdminSearchIcon />}
              defaultValue={"asc"}
              options={[
                {
                  label: "Ascending",
                  value: "asc",
                },
                {
                  label: "Descending",
                  value: "desc",
                },
              ]}
              onChange={handleSorting}
            />
          </Flex>
          <Flex gap={10} flex={1} justify="end" wrap="wrap">
            <DownloadButton title="Download CVS" icon={<DownloadIcon />} />
            <DownloadButton title="Download PDF" icon={<DownloadIcon />} />
          </Flex>
        </Flex>

        <Table
          columns={columns}
          dataSource={Array.isArray(data) && data.length > 0 ? data : []}
          bordered={false}
          pagination={false}
          className="custom-table"
          rowKey="id"
          scroll={{
            x: 200,
          }}
        />
        <CustomPagination
          total={pagination.totalItems}
          pageSize={pagination.pageSize}
          currentPage={currentPage}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default AdminStaffs;
