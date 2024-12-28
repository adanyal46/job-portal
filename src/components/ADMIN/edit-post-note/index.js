import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Typography,
} from "antd";
import React, { useState } from "react";
import CustomTabs from "../../customTabs";
import axiosInstance from "../../../api/axiosInstance";
const TEXT_COLOR = {
  color: "#0C0C0C",
};

const EditPostNote = () => {
  const [postForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState(null);

  const saveSetting = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/admin/AdminSettings", values);
      if (response.status === 200 && response.data) {
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

  const handlePostForm = async () => {
    try {
      await postForm.validateFields();
      const values = postForm.getFieldsValue();
      await saveSetting(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "915px", width: "100%" }}>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Edit Post Note
      </Typography.Title>
      <Card loading={loading}>
        <Form layout="vertical" size="large" form={postForm}>
          <Form.Item
            label="Title"
            name={"postTitle"}
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"postDes"}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Enter Description"
              rows={4}
            ></Input.TextArea>
          </Form.Item>
          <Flex justify="end">
            <Button
              style={{
                backgroundColor: "#E9F0F3",
                color: "#2F2C39",
                fontWeight: "600",
                fontSize: "16px",
                borderColor: "#E9F0F3",
              }}
              onClick={handlePostForm}
            >
              Save
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export default EditPostNote;
