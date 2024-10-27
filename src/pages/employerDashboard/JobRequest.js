import React, { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  message,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CustomButton from "../../components/customButton";
import { postHireRecruiterApi } from "../../features/employerDashboard/employerDashboardApi";

const JobRequest = () => {
  const location = useLocation();
  const { services, recruiterId } = location.state || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const formattedServices = services.map((service, index) => ({
      serviceId: service.id,
      startDate: values[`startDate_${index}`],
      endDate: values[`endDate_${index}`],
      jobDetail: values[`jobDetails_${index}`],
    }));

    let formData = {
      recruiterId: recruiterId,
      services: formattedServices,
    };
    try {
      setLoading(true);
      const response = await postHireRecruiterApi(formData);
      if (response.success) {
        message.open({
          type: "success",
          content: "Job Request Send Successfully",
        });

        setTimeout(() => {
          navigate("/employer/dashboard");
        }, 500);
      }
    } catch (error) {
      message.error(error.message || "Server Error");
    } finally {
      setLoading(false);
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
        Dashboard / Recruiter / Job Request
      </Typography.Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          size="large"
          onFinish={handleSubmit}
        >
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <div key={service.id}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Start Date"
                      name={`startDate_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please select a start date.",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        } // Disable past dates
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="End Date"
                      name={`endDate_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please select an end date.",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        } // Disable past dates
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <Typography.Text
                      style={{
                        color: "#2F2C39",
                        fontSize: "16px",
                      }}
                    >
                      {service.name}
                    </Typography.Text>
                  </Col>
                </Row>
                {/* Job Detail Field for each service */}
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Job Details"
                      name={`jobDetails_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please provide job details.",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Enter Job Details"
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <Typography.Text>No services available.</Typography.Text>
          )}

          {/* Submit Button */}
          <Form.Item>
            <CustomButton
              loading={loading}
              name="Send Request"
              category="primary"
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default JobRequest;
