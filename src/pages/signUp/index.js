import React, { useState } from "react";
import {
  Form,
  Input,
  Typography,
  message,
  Row,
  Col,
  Image,
  Flex,
  Button,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../login/login.css";
import "../../guest-view/main.css";
import PhotoUpload from "../../components/photoUpload";
import axiosInstance from "../../api/axiosInstance";

const { Title } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [form] = Form.useForm();

  // Handle login submission
  const handleSubmit = async (values) => {
    const formData = new FormData();
    if (values["password"] !== values["password_confirmation"]) {
      message.open({
        type: "error",
        content: "Password does not match!",
      });
      return;
    }
    if (!profilePic) {
      message.open({
        type: "error",
        content: "Profile Image is required!",
      });
      return;
    }

    // Combine first and last name
    const fullName = `${values.firstName} ${values.lastName}`.trim();

    formData.append("fullname", fullName);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("profilePic", profilePic);
    formData.append("role", role);

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      if (response.status === 201 && response.data) {
        message.open({
          type: "success",
          content: "Register Successfully",
        });
        navigate("/login");
      }
      setIsLoading(false);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || error.error || "Internal Server Error.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Row>
        <Col xs={0} md={10}>
          <div className="left-container">
            <div className="left-content">
              <Flex vertical gap={20}>
                <Image
                  src="/guest/login-logo.svg"
                  preview={false}
                  width={177}
                  height={65}
                />
                <Image
                  src={`/guest/${
                    role === "JOB_SEEKER"
                      ? "login-img.svg"
                      : role === "MENTOR"
                      ? "register-mentor.svg"
                      : role === "RECRUITER"
                      ? "register-recruiter.svg"
                      : "register-employer.svg"
                  }`}
                  preview={false}
                />
                <Typography.Title
                  level={2}
                  style={{ color: "#2F2C39", marginBottom: 0 }}
                >
                  Fuse in your platform to take it to the next level.
                </Typography.Title>
                <Flex vertical gap={10}>
                  <Flex align="center" gap={10}>
                    <img src="/guest/check-icon.svg" alt="check-icon" />
                    <Typography.Text style={{ color: "#1C1C1C" }}>
                      Upload your resume
                    </Typography.Text>
                  </Flex>
                  <Flex align="center" gap={10}>
                    <img src="/guest/check-icon.svg" alt="check-icon" />
                    <Typography.Text style={{ color: "#1C1C1C" }}>
                      View job opportunities
                    </Typography.Text>
                  </Flex>
                  <Flex align="center" gap={10}>
                    <img src="/guest/check-icon.svg" alt="check-icon" />
                    <Typography.Text style={{ color: "#1C1C1C" }}>
                      Get access to current news with our blogs
                    </Typography.Text>
                  </Flex>
                  <Flex align="center" gap={10}>
                    <img src="/guest/check-icon.svg" alt="check-icon" />
                    <Typography.Text style={{ color: "#1C1C1C" }}>
                      Step-by-step guidance from Career Mentors/Life Coaches.
                      Resume Writing and Review, Interview Prep, Etiquette
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </div>
        </Col>
        <Col xs={24} md={14}>
          <div className="right-container">
            <div className="right-content">
              <Flex
                justify="center"
                align="center"
                vertical
                gap={0}
                style={{ marginBottom: "20px", width: "100%" }}
              >
                <Title level={2} style={{ color: "#001F3F" }}>
                  Let's get started
                </Title>
                <Typography.Text style={{ color: "#2F2F2F" }}>
                  Enter the information mentioned below to create your account.
                </Typography.Text>
              </Flex>

              <Form
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
                form={form}
              >
                <Row gutter={[12, 12]} justify={"center"}>
                  <Col xs={24} style={{ textAlign: "center" }}>
                    <Form.Item name={"avatar"}>
                      <PhotoUpload
                        onChange={(_, file) => setProfilePic(file)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={"firstName"}
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your first name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your first name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name={"lastName"}
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your last name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your last name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
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
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={"password"}
                      label="Password"
                      rules={[
                        { required: true, message: "Please enter password" },
                        {
                          min: 6,
                          message: "Password must be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter your Password" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={"password_confirmation"}
                      label="Confirm Password"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Confirm your password" />
                    </Form.Item>
                  </Col>
                </Row>

                <Flex justify="space-between" align="center">
                  <Typography.Text>
                    Already have an account?
                    <Link to={"/login"} style={{ fontSize: "14px" }}>
                      {" "}
                      Login
                    </Link>
                  </Typography.Text>
                  <Flex gap={10} justify="center">
                    <Link to={"/"}>
                      <Button className="secondary_btn" loading={isLoading}>
                        Go Back
                      </Button>
                    </Link>
                    <Button
                      className="primary_btn"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Next
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterForm;
