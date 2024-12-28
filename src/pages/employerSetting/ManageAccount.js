import { Card, Col, Divider, Flex, Form, Input, Row, Typography } from "antd";
import React from "react";
import CommonInput from "../../components/commonInput";
import CustomButton from "../../components/customButton";

const ManageAccount = ({ manageAcountForm }) => {
  return (
    <Card title={"Change Email Address"}>
      <Form layout={"vertical"} size={"large"} form={manageAcountForm}>
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
        <Typography.Title level={5}>Change Password</Typography.Title>
        <Divider />
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
      <Typography.Title level={5}>Profile Actions</Typography.Title>
      <Divider />
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

export default ManageAccount;
