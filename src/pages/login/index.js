// src/components/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, login } from "../../features/auth/authSlice";
import { Form, Input, Button, Typography, Alert, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utils";
import { profile } from "../../features/profile/profileSlice";
import Loader from "../../components/Loader";

const { Title } = Typography;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkTokenAndNavigate = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      navigate("/jobs/search?type=search");
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkTokenAndNavigate();
  }, [navigate]);

  useEffect(() => {
    if (error) {
      message.open({
        type: "error",
        content: error,
      });
      setTimeout(() => {
        clearMessage();
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (values) => {
    try {
      const response = await dispatch(
        login({ email: values.email, password: values.password })
      ).unwrap();
      if (response.token) {
        navigate("/jobs/search?type=search");
        return;
      }
    } catch (error) {}
  };

  if (isLoading) {
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
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
