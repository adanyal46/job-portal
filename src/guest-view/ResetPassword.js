import React, { useState, useEffect } from "react";
import "./ResetPassword.css"; // External CSS file for styles
import "./main.css";
import { Button, Col, Flex, Form, Input, Row, Typography, message } from "antd";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Get token from URL parameter
  const location = useLocation();

  // Extract token from URL if not in params
  useEffect(() => {
    if (!resetToken) {
      // Alternative method to get token from URL if not using route params
      const urlToken =
        new URLSearchParams(location.search).get("token") ||
        location.pathname.split("/").pop();

      if (!urlToken) {
        message.error(
          "Reset token is missing. Please use the link from your email."
        );
        setTimeout(() => navigate("/login"), 3000);
      }
    }
  }, [resetToken, location, navigate]);

  const handleSubmit = async (values) => {
    // Check if passwords match
    if (values.password !== values.password_confirmation) {
      message.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Get token either from params or from URL
      const token =
        resetToken ||
        new URLSearchParams(location.search).get("token") ||
        location.pathname.split("/").pop();

      const response = await axiosInstance.post("/auth/resetpassword", {
        resetToken: token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });

      if (response.data.success) {
        message.success(response.data.message || "Password reset successfully");
        form.resetFields();
        // Redirect to login page after 2 seconds
        setTimeout(() => navigate("/login"), 2000);
      } else {
        message.error(response.data.message || "Failed to reset password");
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
    navigate("/login");
  };

  return (
    <div className="container-guest">
      <div className="container-child">
        <div className="centered-text">
          <Typography.Title level={2}>Reset Password</Typography.Title>
          <p>Enter your new password and continue</p>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            form={form}
          >
            <Row gutter={[12, 12]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter password" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Enter your Password" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="password_confirmation"
                  label="Re-Enter Password"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please re-enter password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match")
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Re-Enter Password" />
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
