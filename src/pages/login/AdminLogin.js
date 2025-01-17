import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, clearMessage, login } from "../../features/auth/authSlice";
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
import { Link, useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utils"; // Utility function to check if token is valid
import Loader from "../../components/Loader";
import "./login.css";
import "../../guest-view/main.css";

const { Title } = Typography;

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Function to check token and navigate to appropriate page if valid
  const checkTokenAndNavigate = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      // If token is valid, navigate to the main page
      navigate("/", { replace: true });
    } else {
      // If token is not valid, clear it and stay on the login page
      localStorage.removeItem("token");
    }
    setIsLoading(false);
  };

  // Check token on component mount
  useEffect(() => {
    checkTokenAndNavigate();
  }, []);

  // Display error message if login fails
  useEffect(() => {
    if (error) {
      message.open({
        type: "error",
        content: error,
      });
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [error, dispatch]);

  // Handle login submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        adminLogin({ email: values.email, password: values.password })
      ).unwrap();
      console.log(response);

      if (response.token) {
        const { token, user } = response;

        // Store token in localStorage
        localStorage.setItem("token", token);

        const role = user.role;
        setIsNavigating(true);
        setTimeout(() => {
          if (role === "ADMIN") {
            window.location.replace("/admin/dashboard");
          } else {
            window.location.replace("/admin/login");
          }
          setIsNavigating(false);
        }, 500); // Delay navigation by 500ms

        // Navigate based on user role after successful login

        message.open({
          type: "success",
          content: "Login Successfully!",
        });
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Login failed. Please try again.",
      });
      setIsLoading(false);
    }
  };

  // Show loader while processing login or navigating
  if (isLoading || isNavigating) {
    return <Loader />;
  }

  return (
    <div>
      <Row>
        <Col xs={0} md={14}>
          <div className="left-container">
            <div className="left-content">
              <Flex vertical gap={20}>
                <Image
                  src="/guest/login-logo.svg"
                  preview={false}
                  width={177}
                  height={65}
                />
                <Image src="/guest/login-img.svg" preview={false} />
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
        <Col xs={24} md={10}>
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
                  Admin Login
                </Title>
                <Typography.Text style={{ color: "#2F2F2F" }}>
                  Login to your account and continue
                </Typography.Text>
              </Flex>
              <Form layout="vertical" onFinish={handleSubmit} size="large">
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
                <Form.Item
                  name={"password"}
                  label="Password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password placeholder="Enter your Password" />
                </Form.Item>
                <Flex justify="space-between" align="center">
                  <Typography.Text>
                    Don’t have an account?
                    <Link to={"/signup-type"}> Register Now</Link>
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
                      loading={loading || isLoading}
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

export default AdminLogin;
