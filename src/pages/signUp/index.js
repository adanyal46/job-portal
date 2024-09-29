import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  Upload,
  Card,
  Flex,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
let formStyles = {
  flex: 1,
};
const SignupForm = () => {
  const handleSubmit = (values) => {
    values["role"] = "JOB_SEEKER";
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={0} md={12} lg={10}></Col>

      <Col xs={24} md={12} lg={14} style={{ padding: "40px" }}>
        <Typography.Title
          level={2}
          style={{ color: "#001F3F", fontWeight: 700 }}
        >
          Let’s get started
        </Typography.Title>
        <Typography.Paragraph>
          Enter the information mentioned below to create your account.
        </Typography.Paragraph>

        {/* Form Fields */}
        <Form
          onFinish={handleSubmit}
          size="large"
          layout="vertical"
          style={{ marginTop: "24px" }}
        >
          <Flex justify="center" style={{ marginBottom: "20px" }}>
            <Upload
              listType="picture-card"
              maxCount={1}
              action={""}
              beforeUpload={() => false}
            >
              <UploadOutlined />
            </Upload>
          </Flex>

          <Flex gap={"small"}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
              style={formStyles}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              style={formStyles}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Flex>
          <Flex gap={"small"}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={formStyles}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              label="Retype Password"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
              style={formStyles}
            >
              <Input.Password placeholder="Retype Password" />
            </Form.Item>
          </Flex>

          {/* Bottom Buttons and Links */}
          <Flex justify="space-between">
            <Typography.Text style={{ fontSize: "15px" }}>
              Already have an account? <a href="/login">Login</a>
            </Typography.Text>
            <Flex>
              {" "}
              <Button type="default" style={{ marginRight: "8px" }}>
                Back
              </Button>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupForm;
