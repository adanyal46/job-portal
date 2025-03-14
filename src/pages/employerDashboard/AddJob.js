import React, { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  InputNumber,
  message,
} from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles
import { useSelector } from "react-redux";
import { createJobApi } from "../../features/employerDashboard/employerDashboardApi";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const { user } = useSelector((state) => state.profile);
  const profileData = user?.Profile?.[0];
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    values["companyName"] = profileData?.companyName ?? "";
    if (!values["companyName"]) {
      message.open({
        type: "error",
        content: "Please Update profile company name to create job!",
      });
      return;
    }
    setLoading(true); // Start loading

    try {
      // Create job object
      const jobData = {
        jobTitle: values.jobTitle,
        jobType: values.jobType,
        companyName: values.companyName,
        location: values.jobLocation,
        applicationLink: values.applicationLink,
        minPrice: parseInt(values.minPay),
        maxPrice: parseInt(values.maxPay),
        description: values.description,
      };

      // Send POST request to the API
      const response = await createJobApi(jobData);

      // Handle success response
      if (response.success) {
        message.success("Job added successfully!");
        navigate("/employer/dashboard");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      message.error(error.message || "Failed to add job. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "960px",
        width: "100%",
      }}
    >
      <Typography.Title level={4} style={{ fontWeight: "400" }}>
        Dashboard / Add Job
      </Typography.Title>
      <Card>
        <Form layout="vertical" size="large" onFinish={handleSubmit}>
          {/* Job Title Field */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Job Title"
                name="jobTitle"
                rules={[
                  { required: true, message: "Please enter the job title." },
                ]}
              >
                <Input placeholder="Enter Job Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Job Location"
                name="jobLocation"
                rules={[
                  { required: true, message: "Please enter the job location." },
                ]}
              >
                <Input placeholder="Enter Job Location" />
              </Form.Item>
            </Col>
          </Row>

          {/* Job Type and Job Location Fields */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Job Type"
                name="jobType"
                rules={[
                  { required: true, message: "Please select the job type." },
                ]}
              >
                <Select
                  placeholder="Select Job Type"
                  options={[
                    { value: "FULL_TIME", label: "Full Time" },
                    { value: "PART_TIME", label: "Part Time" },
                    { value: "CONTRACT", label: "Contract" },
                    { value: "INTERNSHIP", label: "Internship" },
                    { value: "FREELANCE", label: "Freelance" },
                    { value: "REMOTE", label: "Remote" },
                    { value: "TEMPORARY", label: "Temporary" },
                    { value: "VOLUNTEER", label: "Volunteer" },
                  ]}
                />
              </Form.Item>
            </Col>
            {/* Application Link Field */}

            <Col span={12}>
              <Form.Item
                label="Application Link"
                name="applicationLink"
                rules={[
                  {
                    required: true,
                    message: "Please enter the application link.",
                  },
                  { type: "url", message: "Please enter a valid URL." },
                ]}
              >
                <Input placeholder="Enter Application Link" />
              </Form.Item>
            </Col>
          </Row>

          {/* Pay Range Fields */}
          <Form.Item label="Pay Range" required>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="minPay"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please enter the minimum pay.",
                    },
                  ]}
                >
                  <InputNumber
                    maxLength={10}
                    className="w-100"
                    placeholder="Min Pay"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="maxPay"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please enter the maximum pay.",
                    },
                  ]}
                >
                  <InputNumber
                    maxLength={10}
                    className="w-100"
                    placeholder="Max Pay"
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          {/* Job Description Field with React Quill */}
          <Form.Item
            label="Job Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the job description." },
            ]}
          >
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginTop: "16px" }}
            >
              Save Job
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddJob;
