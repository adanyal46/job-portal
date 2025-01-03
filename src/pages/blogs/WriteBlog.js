import React, { useEffect, useState } from "react";
import { Card, Flex, Form, FormItem, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlogLayout from "./BlogLayout";
import CustomButton from "../../components/customButton";
import CommonInput from "../../components/commonInput";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (!values["title"] || !values["content"]) {
      message.open({
        type: "error",
        content: "Title & Content both are required!",
      });
      return;
    }
    try {
      const response = await axiosInstance.post("/user/postblog", values);
      console.log(response);

      if (response.data && response.status === 201) {
        navigate("/job-seeker/blogs");
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
    <BlogLayout title={"Write a Blog"}>
      <Form onFinish={handleSubmit} form={form} size="large" layout="vertical">
        <Card
          title={
            <Flex justify="end">
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
    </BlogLayout>
  );
};

export default WriteBlog;
