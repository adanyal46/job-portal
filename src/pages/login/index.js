import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, login } from "../../features/auth/authSlice";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utils"; // Utility function to check if token is valid
import Loader from "../../components/Loader";

const { Title } = Typography;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        login({ email: values.email, password: values.password })
      ).unwrap();

      if (response.token) {
        const { token, user } = response;

        // Store token in localStorage
        localStorage.setItem("token", token);

        const role = user.role;
        setIsNavigating(true);

        // Navigate based on user role after successful login
        setTimeout(() => {
          if (role === "MENTOR") {
            window.location.replace("/mentor/profile");
          } else if (role === "JOB_SEEKER") {
            window.location.replace("/job-seeker/jobs/search?type=search");
          } else {
            window.location.replace("/recruiter/profile");
          }
          setIsNavigating(false);
        }, 500); // Delay navigation by 500ms

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 600, padding: 20 }} bordered>
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form onFinish={handleSubmit} layout="vertical" size="large">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>

          <Typography.Text style={{ fontSize: "16px", textAlign: "center" }}>
            Not registered yet? <Link to="/signUp">Sign Up</Link>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
