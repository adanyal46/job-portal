import React from "react";
import "./ResetPassword.css"; // External CSS file for styles
import "./main.css";
import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";

const ForgetPassword = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container-guest">
      <div className="container-child">
        <div className="centered-text">
          <Typography.Title level={2}>Forgot Password?</Typography.Title>
          <p>
            Enter your email ID so that we can send you a link to reset password
          </p>
          <Form layout="vertical" onFinish={handleSubmit} size="large">
            <Row gutter={[12, 12]} justify={"center"}>
              <Col xs={24} md={14}>
                <Form.Item
                  name={"email"}
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter email",
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email" />
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
                    Submit
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

export default ForgetPassword;
