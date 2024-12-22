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
  StarRatingIcon,
} from "../../assets/svg";
import "./admin-employer-styles.scss";
import CustomPagination from "../customPagination";
import { useEffect, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruiters } from "../../features/admin/user/recruiterSlice";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const columns = [
  { title: "#", dataIndex: "userId", key: "userId" },
  { title: "Name", dataIndex: "name", key: "name" },
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
    title: "Rating",
    dataIndex: "ratings",
    key: "ratings",
    render: (_, record) => (
      <Link to={"/admin/user/mentors/review/" + record.userId}>
        <Flex align="baseline" gap={5}>
          <Typography.Text>{record.ratings ?? 0}</Typography.Text>{" "}
          <StarRatingIcon />
        </Flex>
      </Link>
    ),
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
                <Link
                  to={"/admin/user/recruiters/" + record.userId}
                  style={{ color: "#2F2C39", fontWeight: "500" }}
                >
                  View Details
                </Link>
              ),
              key: "0",
            },
            {
              label: "Delete",
              key: "3",
              danger: true,
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

const data = [
  {
    id: 1,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "+123456789",
    address: "1 Apple St",
  },
  {
    id: 2,
    name: "Bob Green",
    email: "bob.green@example.com",
    phone: "+987654321",
    address: "2 Banana St",
  },
  {
    id: 3,
    name: "Charlie White",
    email: "charlie.white@example.com",
    phone: "+192837465",
    address: "3 Cherry St",
  },
  {
    id: 4,
    name: "Diana Blue",
    email: "diana.blue@example.com",
    phone: "+564738291",
    address: "4 Date St",
  },
  {
    id: 5,
    name: "Edward Black",
    email: "edward.black@example.com",
    phone: "+102938475",
    address: "5 Elder St",
  },
  {
    id: 6,
    name: "Fiona Grey",
    email: "fiona.grey@example.com",
    phone: "+918273645",
    address: "6 Fig St",
  },
  {
    id: 7,
    name: "George Purple",
    email: "george.purple@example.com",
    phone: "+5647382910",
    address: "7 Grape St",
  },
  {
    id: 8,
    name: "Hannah Red",
    email: "hannah.red@example.com",
    phone: "+182736455",
    address: "8 Honey St",
  },
  {
    id: 9,
    name: "Ian Orange",
    email: "ian.orange@example.com",
    phone: "+374849292",
    address: "9 Ivy St",
  },
  {
    id: 10,
    name: "Jack Yellow",
    email: "jack.yellow@example.com",
    phone: "+283746120",
    address: "10 Jasmine St",
  },
  {
    id: 11,
    name: "Kate Brown",
    email: "kate.brown@example.com",
    phone: "+384756109",
    address: "11 Kiwi St",
  },
  {
    id: 12,
    name: "Leo Cyan",
    email: "leo.cyan@example.com",
    phone: "+564738392",
    address: "12 Lemon St",
  },
  {
    id: 13,
    name: "Mona Violet",
    email: "mona.violet@example.com",
    phone: "+384756291",
    address: "13 Mango St",
  },
  {
    id: 14,
    name: "Nina Gold",
    email: "nina.gold@example.com",
    phone: "+849302184",
    address: "14 Nectarine St",
  },
  {
    id: 15,
    name: "Oscar Green",
    email: "oscar.green@example.com",
    phone: "+937485120",
    address: "15 Olive St",
  },
];
const AdminRecruiters = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.recruiters
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
      fetchRecruiters({
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
        Recruiters
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

export default AdminRecruiters;
