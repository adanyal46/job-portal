import { Card, Flex, Form, Typography } from "antd";
import React, { useState } from "react";
import CommonInput from "../../commonInput";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles
import CustomButton from "../../customButton";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const TermCondition = () => {
  const [description, setDescription] = useState("");
  return (
    <div>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Terms & Conditions
      </Typography.Title>
      <Card>
        <Form layout="vertical">
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
              style={{ height: "calc(100vh - 350px)", marginBottom: "20px" }}
            />
          </Form.Item>
        </Form>
        <Flex justify="end" style={{ paddingTop: "20px" }}>
          <CustomButton name="Save" category="plain"></CustomButton>
        </Flex>
      </Card>
    </div>
  );
};

export default TermCondition;
