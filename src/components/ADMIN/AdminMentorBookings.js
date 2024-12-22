import {
  Card,
  Flex,
  Input,
  Select,
  Table,
  Typography,
  notification,
} from "antd";
import { AdminSearchIcon, DownloadIcon } from "../../assets/svg";
import "./admin-employer-styles.scss";
import CustomPagination from "../customPagination";
import { useEffect, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import CustomTag from "./components/CustomTag";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getMentorBookings,
} from "../../features/admin/booking/bookingSlice";
import { useParams } from "react-router-dom";
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
    title: "Mentor Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone No.",
    dataIndex: "phNumber",
    key: "phNumber",
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
    title: "Status",
    dataIndex: "bookingStatus",
    key: "bookingStatus",
    render: (status) => {
      return <CustomTag label={status} />;
    },
  },
];

const AdminMentorBookings = () => {
  const { id: userId } = useParams();

  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.adminMentorBookings
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  useEffect(() => {
    if (searchQuery.length > 3) {
      setDebouncedSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      getMentorBookings({
        userId,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        sortOrder,
        search: debouncedSearchQuery ?? "",
      })
    );
  }, [
    dispatch,
    pagination.currentPage,
    pagination.pageSize,
    sortOrder,
    debouncedSearchQuery,
    userId,
  ]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error Loading Data",
        description: error,
      });
    }
    dispatch(clearError());
  }, [error, dispatch]);

  const handleTableChange = (pagination) => {
    dispatch(
      getMentorBookings({
        page: pagination.current,
        pageSize: pagination.pageSize,
        sortOrder,
        search: searchQuery,
      })
    );
  };

  const handleSorting = (value) => {
    setSortOrder(value);
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
          rowKey="bookingId"
          scroll={{
            x: 200,
          }}
        />
        <CustomPagination
          total={pagination.totalItems}
          pageSize={pagination.pageSize}
          currentPage={pagination.current}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default AdminMentorBookings;
