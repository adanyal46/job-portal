import React from "react";
import CustomButton from "../../components/customButton";
import {
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import CommonInput from "../../components/commonInput";
import { Link } from "react-router-dom";

const AccountAdmin = ({
  user,
  manageAdminForm,
  handleSubmitManageAccount,
  manageLoading,
}) => {
  return (
    <Card title="Account Admin Details">
      <Flex style={{ marginBottom: "20px" }} gap={15}>
        <Image
          src={
            user?.Profile[0]?.avatarId
              ? process.env.REACT_APP_MEDIA_URL + user?.Profile[0]?.avatarId
              : "/images/no-image.jpg"
          }
          width={180}
          preview={false}
        />
        <Flex vertical>
          <Typography.Title level={4} style={{ marginBottom: "10px" }}>
            Account Admin
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{ fontWeight: "400", marginTop: 0 }}
          >
            {user?.Profile[0]?.fullname}
          </Typography.Title>
          <Typography.Text style={{ color: "#52595C" }}>
            {user?.email}
          </Typography.Text>
          <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>
            {user?.Profile[0]?.phnumber ?? "N/A"}
          </Typography.Text>
          <Link to={"/employer/profile"}>
            <CustomButton name="Details" block={true} category="primary" />
          </Link>
        </Flex>
      </Flex>
      <Typography.Title level={4}>Transfer Account</Typography.Title>
      <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />
      <Form layout="vertical" size="large" manageAdminForm={manageAdminForm}>
        <Row gutter={[12, 12]} align={"middle"}>
          <Col flex={1}>
            <Form.Item name={"adminId"} label={"Enter New Admin ID"}>
              <CommonInput placeholder="Enter New Admin ID" />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <CustomButton
              name="Transfer"
              category="plain"
              style={{ maxWidth: "200px", width: "200px" }}
            />
          </Col>
        </Row>
      </Form>
      <Typography.Title level={4}>Change Password</Typography.Title>
      <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />
      <Form layout="vertical" size="large">
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name={"currentPassword"} label={"Current Password"}>
              <Input.Password placeholder="Enter current Password" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col flex={"1"}>
            <Form.Item name={"newPassword"} label={"New Password"}>
              <Input.Password placeholder="Enter New Password" />
            </Form.Item>
          </Col>
          <Col flex={"1"}>
            <Form.Item name={"confirmPassword"} label={"Confirm Password"}>
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Typography.Title level={4}>Profile Actions</Typography.Title>
      <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />

      <Flex gap={6}>
        <CustomButton
          category="plain"
          name="Deactivate"
          classes="deactivate"
          style={{ backgroundColor: "#E9F0F3" }}
          loading={manageLoading}
        />
        <CustomButton
          category="plain"
          name="Delete"
          classes="delete"
          style={{ backgroundColor: "#E8381A", color: "white" }}
          loading={manageLoading}
        />
      </Flex>
      <Flex justify={"end"}>
        <CustomButton
          category="primary"
          name="Save"
          classes="save"
          handleClick={handleSubmitManageAccount}
          loading={manageLoading}
        />
      </Flex>
    </Card>
  );
};

export default AccountAdmin;
