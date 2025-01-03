import React, { useEffect, useState } from "react";
import { Card, Flex, Form, FormItem, message, Typography } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import CommonInput from "../../commonInput";
import CustomButton from "../../customButton";
import axiosInstance from "../../../api/axiosInstance";

const AdminEditBlog = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlog();
    }
  }, [id]);

  const getBlog = async () => {
    try {
      const response = await axiosInstance.get("/admin/blogs/" + id);
      const blog = response.data;
      form.setFieldsValue({
        title: blog.title,
        content: blog.content,
      });
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };

  const handleSubmit = async (values) => {
    if (!values["title"] || !values["content"]) {
      message.open({
        type: "error",
        content: "Title & Content both are required!",
      });
      return;
    }
    try {
      const response = await axiosInstance.put("/admin/blogs/" + id, values);
      if (response.data && response.status === 200) {
        navigate("/admin/blogs");
        message.open({
          type: "success",
          content: "Blog Updated!",
        });
      }
    } catch (error) {
      console.log(error);

      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };

  return (
    <Form onFinish={handleSubmit} form={form} size="large" layout="vertical">
      <Card
        title={
          <Flex justify="space-between" align="center">
            <Typography.Title level={4} style={{ margin: 0 }}>
              Edit Blog
            </Typography.Title>
            <CustomButton
              category="primary"
              name="Post"
              style={{ height: "40px" }}
            />
          </Flex>
        }
      >
        <Form.Item name={"title"} label="Title">
          <CommonInput placeholder="Enter title here" />
        </Form.Item>
        <Form.Item name={"content"} label="Content">
          <ReactQuill
            style={{
              height: "calc(100vh - 300px)",
              paddingBottom: "20px",
              overflow: "auto",
            }}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default AdminEditBlog;
