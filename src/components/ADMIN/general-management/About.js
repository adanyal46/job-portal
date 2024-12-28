import { Card, Flex, Form, Typography, Button, message } from "antd";
import React, { useState } from "react";
import CommonInput from "../../commonInput";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles
import axiosInstance from "../../../api/axiosInstance";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const About = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = form.getFieldsValue();
      const response = await axiosInstance.post("/admin/AdminSettings", {
        aboutUs: JSON.stringify(values),
      });
      if (response.data && response.status === 200) {
        message.open({
          type: "success",
          content: response.data.message || "Saved!",
        });
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error?.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        About Us
      </Typography.Title>
      <Card loading={loading}>
        <Form layout="vertical" form={form} size="large">
          <Form.Item name={"title"} label={"Title"}>
            <CommonInput placeholder="Enter Title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter the job description." },
            ]}
          >
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
              style={{
                height: "calc(100vh - 320px)",
                marginBottom: "20px",
              }}
            />
          </Form.Item>
          <Flex justify="end" style={{ paddingTop: "20px" }}>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#E9F0F3",
                color: "#2F2C39",
                fontWeight: "600",
                fontSize: "16px",
                borderColor: "#E9F0F3",
              }}
            >
              Save
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export default About;
