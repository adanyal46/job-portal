import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import { AdminSearchIcon, InfoIcon } from "../../../assets/svg";
import CustomButton from "../../customButton";
import PhotoUpload from "../../photoUpload";
import CommonInput from "../../commonInput";
import { useEffect } from "react";

const SettingCard = ({
  type = "job-seeker",
  DIVIDER_COLOR,
  TEXT_COLOR,
  searchQuery,
  setSearchQuery,
  handleSearch,
  user,
  loading,
  updateUser,
}) => {
  let [form] = Form.useForm();
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        secondaryEmail: user.secondaryEmail,
      });
    }
  }, [user]);

  const handleDeactivate = () => {
    updateUser(user?.id, {
      deActivate: !user.deActivate,
      isActive: !user.isActive,
      action: "updateProfile",
    });
  };

  const handleDelete = () => {
    updateUser(user?.id, {
      action: "delete",
    });
  };

  const handleSave = () => {
    updateUser(user?.id, form.getFieldsValue());
  };

  return (
    <Card loading={loading}>
      <Typography.Title level={5} style={TEXT_COLOR}>
        Manage Users Account
      </Typography.Title>
      <Divider style={DIVIDER_COLOR} />
      <Flex gap={4} align="center" style={{ marginBottom: "10px" }}>
        <InfoIcon />
        <Typography.Text>
          Enter user to search and edit user details
        </Typography.Text>
      </Flex>
      <Input
        value={searchQuery}
        size="large"
        style={{ maxWidth: "400px", width: "100%" }}
        placeholder="Search user id"
        prefix={<AdminSearchIcon />}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
      <Divider style={DIVIDER_COLOR} />
      <PhotoUpload name="profilePic" initialImageUrl={user?.avatarUrl} />
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        size="large"
        form={form}
      >
        <Row gutter={[12, 12]}>
          <Col flex={1}>
            <Form.Item name={"email"} label={"Primary Email"}>
              <CommonInput placeholder="Enter Primary Email" />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item name={"secondaryEmail"} label={"Secondary Email"}>
              <CommonInput placeholder="Enter Secondary Email" />
            </Form.Item>
          </Col>
        </Row>

        <Typography.Title level={5} style={TEXT_COLOR}>
          Change Email Address
        </Typography.Title>
        <Divider style={DIVIDER_COLOR} />
        <Form.Item
          name={"email"}
          label={"Send new Password"}
          style={{ maxWidth: "400px" }}
        >
          <Flex gap={4} align="center" style={{ marginBottom: "10px" }}>
            <InfoIcon />
            <Typography.Text>
              Send an Auto Generate Password to the User’s Email
            </Typography.Text>
          </Flex>
          <CommonInput placeholder="Enter Email " />
        </Form.Item>
        <CustomButton
          category="plain"
          name="Send Password"
          style={{
            marginBottom: "20px",
            backgroundColor: "#E9F0F3",
            borderColor: "#E9F0F3",
          }}
        />

        <Typography.Title level={5} style={TEXT_COLOR}>
          Profile Actions
        </Typography.Title>
        <Divider style={DIVIDER_COLOR} />
        <Flex gap={6}>
          <Popconfirm
            title="Are you sure you want to deactivate?"
            onConfirm={handleDeactivate}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{
                backgroundColor: "#E9F0F3",
                borderColor: "#E9F0F3",
                fontWeight: 500,
              }}
              disabled={!user}
            >
              {user?.deActivate ? "Activate" : "Deactivate"}
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to delete user?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{
                backgroundColor: "#E8381A",
                color: "#fff",
                fontWeight: 500,
              }}
              disabled={!user}
            >
              Delete
            </Button>
          </Popconfirm>
        </Flex>
        <Flex justify="end">
          <CustomButton
            category="primary"
            name="Save"
            handleClick={handleSave}
          />
        </Flex>
      </Form>
    </Card>
  );
};

export default SettingCard;
