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

const AccountAdmin = () => {
  return (
    <Card title="Account Admin Details">
      <Flex style={{ marginBottom: "20px" }}>
        <Image src="/images/no-image.jpg" width={180} preview={false} />
        <Flex vertical>
          <Typography.Title level={4} style={{ marginBottom: "10px" }}>
            Account Admin
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{ fontWeight: "400", marginTop: 0 }}
          >
            Jannet Summers
          </Typography.Title>
          <Typography.Text style={{ color: "#52595C" }}>
            Jannetsummers@gmail.com
          </Typography.Text>
          <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>
            +1 305 3216549
          </Typography.Text>
          <CustomButton name="Details" category="primary" />
        </Flex>
      </Flex>
      <Typography.Title level={4}>Transfer Account</Typography.Title>
      <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />
      <Form layout="vertical" size="large">
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
        />
        <CustomButton
          category="plain"
          name="Delete"
          classes="delete"
          style={{ backgroundColor: "#E8381A", color: "white" }}
        />
      </Flex>
      <Flex justify={"end"}>
        <CustomButton
          category="primary"
          name="Save"
          classes="save"
          handleClick={() => {}}
        />
      </Flex>
    </Card>
  );
};

export default AccountAdmin;
