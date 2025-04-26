import React, { useState } from "react";
import "./ResetPassword.css"; // External CSS file for styles
import "./main.css";
import { Button, Col, Flex, Form, Input, Row, Typography, message } from "antd";
import axiosInstance from "../api/axiosInstance";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/forgetpassword", {
        email: values.email,
      });

      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields();
      } else {
        message.error(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to connect to server. Please try again later.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to login page
    window.history.back();
    // If you're using react-router-dom, you could use navigate(-1) instead
  };

  return (
    <div className="container-guest">
      <div className="container-child">
        <div className="centered-text">
          <Typography.Title level={2}>Forgot Password?</Typography.Title>
          <p>
            Enter your email ID so that we can send you a link to reset password
          </p>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            form={form}
          >
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
                  <Button className="secondary_btn" onClick={handleGoBack}>
                    Go Back
                  </Button>
                  <Button
                    className="primary_btn"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
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
