import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, register } from "../../features/auth/authSlice";
import { Form, Input, Button, Typography, message, Card, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const { Title } = Typography;
const { Option } = Select;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("JOB_SEEKER");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    "JOB_SEEKER",
    "MENTOR",
    "RECRUITER",
    "EMPLOYER",
    "STAFF_MEMBER",
  ];

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

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        register({
          email: values.email,
          password: values.password,
          role,
        })
      ).unwrap();

      if (response) {
        message.open({
          type: "success",
          content: "Registration Successful! You can now log in.",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
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
          Register
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

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select
              value={role}
              onChange={(value) => setRole(value)}
              placeholder="Select a role"
            >
              {roles.map((role) => (
                <Option key={role} value={role}>
                  {role.replace("_", " ")}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Typography.Text style={{ fontSize: "16px" }}>
              Already have an account?{" "}
            </Typography.Text>
            <Typography.Link href="/login">Login</Typography.Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
