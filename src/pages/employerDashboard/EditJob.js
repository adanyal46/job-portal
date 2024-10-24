import React, { useState } from "react";
import { Card, Typography, Form, Input, Select, Row, Col, Button } from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles

const { Option } = Select;

const EditJob = () => {
  // Initialize with sample description
  const [description, setDescription] = useState(
    "This is a sample job description for testing purposes. You can format this text, add links, images, etc."
  );

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "960px",
        width: "100%",
      }}
    >
      <Typography.Title level={4} style={{ fontWeight: "400" }}>
        Dashboard / ID #A324BC
      </Typography.Title>
      <Card>
        <Form layout="vertical" size="large">
          {/* Job ID and Job Title Fields in One Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Job ID" required>
                <Input placeholder="Enter Job ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Job Title" required>
                <Input placeholder="Enter Job Title" />
              </Form.Item>
            </Col>
          </Row>

          {/* Job Type and Job Location Fields in One Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Job Type" required>
                <Select placeholder="Select Job Type">
                  <Option value="full-time">Full Time</Option>
                  <Option value="part-time">Part Time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="internship">Internship</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Job Location" required>
                <Input placeholder="Enter Job Location" />
              </Form.Item>
            </Col>
          </Row>

          {/* Pay Range Fields in One Row */}
          <Form.Item label="Pay Range">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="minPay" noStyle>
                  <Input placeholder="Min Pay" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="maxPay" noStyle>
                  <Input placeholder="Max Pay" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          {/* Job Description Field with React Quill */}
          <Form.Item label="Job Description" required>
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" style={{ marginTop: "16px" }}>
              Save Job
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditJob;
