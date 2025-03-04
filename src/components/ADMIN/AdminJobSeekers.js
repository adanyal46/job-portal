import {
  Card,
  Dropdown,
  Flex,
  Input,
  Select,
  Table,
  Typography,
  notification,
} from "antd";
import {
  AdminNotepadIcon,
  AdminSearchIcon,
  DownloadIcon,
  MenuEmployerProfileIcon,
} from "../../assets/svg";
import "./admin-employer-styles.scss";
import CustomPagination from "../customPagination";
import { useCallback, useEffect, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobSeekers } from "../../features/admin/user/jobSeekersSlice";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const columns = [
  {
    title: "#",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => text || "N/A",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => text || "N/A",
  },
  {
    title: "Phone No",
    dataIndex: "phoneNo",
    key: "phoneNo",
    render: (text) => text || "N/A",
  },
  {
    title: "State",
    dataIndex: "address",
    key: "address",
    render: (text) => text || "N/A",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    render: (text) => text || "N/A",
  },
  {
    title: "Resume",
    dataIndex: "resume",
    key: "resume",
    render: (text) => <DownloadIcon />,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link
                    to={"/admin/user/job-seeker/" + record?.userId}
                    style={{ fontSize: "14px" }}
                  >
                    {" "}
                    View Details
                  </Link>
                ),
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
      );
    },
  },
];

const AdminJobSeeker = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.jobSeekers
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
      fetchJobSeekers({
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
        Job Seeker
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
          rowKey="userId"
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

export default AdminJobSeeker;
