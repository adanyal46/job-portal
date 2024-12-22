import {
  Card,
  Dropdown,
  Flex,
  Input,
  notification,
  Select,
  Table,
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployers } from "../../features/admin/user/employerSlice";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const items = [
  {
    label: "View Details",
    key: "0",
  },
  {
    label: "Edit ",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "Delete",
    key: "3",
  },
];
const columns = [
  { title: "#", dataIndex: "userId", key: "userId" },
  { title: "Contact Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone No", dataIndex: "phoneNo", key: "phoneNo" },
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Booking",
    dataIndex: "booking",
    key: "booking",
    render: (_, record) => (
      <Link to={"/admin/user/employers/bookings/" + record.userId}>
        <AdminBookingIcon />
      </Link>
    ),
  },
  {
    title: "Purchased Plan",
    dataIndex: "plan",
    key: "plan",
    render: () => <AdminNotepadIcon />,
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Dropdown
        menu={{
          items: [
            {
              label: <Link to={"/admin/user/bookings"}> View Details</Link>,
              key: "0",
            },
            {
              label: "Edit ",
              key: "1",
            },
            {
              type: "divider",
            },
            {
              label: "Delete",
              key: "3",
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

const AdminEmployer = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.employers
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

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
      fetchEmployers({
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

  const handleTableChange = (page) => {
    setCurrentPage(page);
  };

  const handleSorting = (value) => {
    setSortOrder(value);
  };

  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Employers
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
          dataSource={data}
          bordered={false}
          pagination={false}
          className="custom-table"
          scroll={{
            x: 200,
          }}
          rowKey="userId"
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

export default AdminEmployer;
