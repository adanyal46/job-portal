import {
  Card,
  Dropdown,
  Flex,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { AdminSearchIcon, MenuEmployerProfileIcon } from "../../../assets/svg";
import CustomButton from "../../customButton";
import CustomPagination from "../../customPagination";
import "../admin-employer-styles.scss";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../../commonModal";
import CommonInput from "../../commonInput";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { debounce } from "lodash"; // Install lodash if not already installed
import {
  addMentorService,
  deleteMentorService,
  fetchMentorServices,
  updateMentorService,
} from "../../../features/admin/common-management/slices/mentorServicesSlice";
import {
  addLanguage,
  deleteLanguage,
  fetchLanguages,
  updateLanguage,
} from "../../../features/admin/common-management/slices/languageSlice";

const TEXT_COLOR = {
  color: "#0C0C0C",
};

const Languages = () => {
  let [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data, loading, error, pagination } = useSelector(
    (state) => state.languages
  );
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [industryId, setIndustryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    try {
      dispatch(
        fetchLanguages({
          page: currentPage,
          search: debouncedSearchQuery ?? "",
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentPage, debouncedSearchQuery]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Language Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlayStyle={{ width: "150px" }}
          menu={{
            items: [
              {
                label: "Edit",
                onClick: () => {
                  setOpenModal(true);
                  form.setFieldValue("name", record.name);
                  setIndustryId(record.id);
                },
              },
              {
                label: "Delete",
                danger: true,
                onClick: () => {
                  Modal.confirm({
                    title: "Are you sure you want to delete this industry?",
                    icon: <ExclamationCircleOutlined />,
                    content: "This action cannot be undone.",
                    okText: "Yes, delete it",
                    okType: "danger",
                    cancelText: "No, cancel",
                    onOk() {
                      try {
                        dispatch(deleteLanguage(record?.id));
                        message.open({
                          type: "success",
                          content: "Language Deleted",
                        });
                      } catch (error) {
                        message.error(error.message || "Internal Server Error");
                      }
                    },
                    onCancel() {
                      console.log("Delete action canceled");
                    },
                  });
                },
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    form.resetFields();
    setIndustryId(null);
    setOpenModal(true);
  };

  const handleADD = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await dispatch(addLanguage(values)).unwrap();
      handleClose();
      message.open({
        type: "success",
        content: "Language Created",
      });
    } catch (error) {
      message.error(error.message || "Internal Server Error");
    }
  };

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await dispatch(updateLanguage({ id: industryId, data: values })).unwrap();
      handleClose();
      message.open({
        type: "success",
        content: "Language Updated",
      });
    } catch (error) {
      message.error(error.message || "Internal Server Error");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSearchChange = debounce((value) => {
    if (value.length > 3) {
      setCurrentPage(1);
      setDebouncedSearchQuery(value);
    } else {
      setDebouncedSearchQuery("");
    }
  }, 300); // Adjust the debounce delay as needed

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearchChange(value);
  };

  return (
    <div style={{ maxWidth: "946px", width: "100%", margin: "0 auto" }}>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Languages
      </Typography.Title>
      <Card
        style={{ boxShadow: "0px 2px 4px 0px #A5A3AE4D" }}
        loading={loading}
      >
        <Flex gap={10} wrap="wrap" justify="space-between" align="center">
          <Input
            size="large"
            style={{ maxWidth: "400px", width: "100%" }}
            placeholder="Search"
            prefix={<AdminSearchIcon />}
            onChange={handleInputChange}
            value={searchQuery}
            allowClear
          />
          <CustomButton
            category="plain"
            name="Add Languages"
            handleClick={handleOpenModal}
          />
        </Flex>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="custom-table"
          rowKey={"id"}
        />
        {data && Array.isArray(data) && data.length > 0 && (
          <CustomPagination
            total={pagination?.totalItems}
            pageSize={pagination?.itemsPerPage}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        )}
        <CommonModal
          isModalOpen={openModal}
          isDelete={false}
          saveBtnText={industryId ? "Update" : "Add"}
          handleOk={industryId ? handleUpdate : handleADD}
          handleClose={handleClose}
          loading={loading}
        >
          <Form size="large" form={form}>
            <Typography.Title
              level={3}
              style={{
                textAlign: "center",
                fontWeight: "400",
                color: "#0C0C0C",
              }}
            >
              Languages
            </Typography.Title>
            <Form.Item
              name={"name"}
              rules={[{ required: true, message: "Enter languages?" }]}
            >
              <CommonInput placeholder="Enter Languages" />
            </Form.Item>
          </Form>
        </CommonModal>
      </Card>
    </div>
  );
};

export default Languages;
