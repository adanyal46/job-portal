import React from "react";
import "./ResetPassword.css"; // External CSS file for styles
import "./main.css";
import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";

const ResetPassword = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container-guest">
      <div className="container-child">
        <div className="centered-text">
          <Typography.Title level={2}>Reset Password</Typography.Title>
          <p>Enter your new password and continue</p>
          <Form layout="vertical" onFinish={handleSubmit} size="large">
            <Row gutter={[12, 12]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name={"password"}
                  label="Password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password placeholder="Enter your Password" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name={"password_confirmation"}
                  label="Re-Enter Password*"
                  rules={[
                    { required: true, message: "Please re-enter password" },
                  ]}
                >
                  <Input.Password placeholder="Enter Re-Enter Password" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Flex gap={10} justify="center">
                  <Button className="secondary_btn">Go Back</Button>
                  <Button
                    className="primary_btn"
                    type="primary"
                    htmlType="submit"
                  >
                    Confirm
                  </Button>
                </Flex>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
