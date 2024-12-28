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

const PopupInfo = () => {
  const [generalForm] = Form.useForm();
  const [comissionForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState(null);

  const saveSetting = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/admin/AdminSettings", values);
      if (response.status === 200 && response.data) {
        console.log(response);
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

  const handleGeneralForm = async () => {
    try {
      await generalForm.validateFields();
      const values = generalForm.getFieldsValue();
      await saveSetting(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComissionForm = async () => {
    try {
      await comissionForm.validateFields();
      const values = comissionForm.getFieldsValue();
      await saveSetting(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ margin: "0 auto", maxWidth: "915px", width: "100%" }}>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Pop-up Info
      </Typography.Title>
      <div>
        <CustomTabs
          defaultActiveKey="2"
          items={[
            {
              key: "1",
              label: "Mentor",
              children: (
                <Flex vertical gap={20}>
                  <Card></Card>
                </Flex>
              ),
            },
            {
              key: "2",
              label: "Recruiter",
              children: (
                <Flex vertical gap={20}>
                  <Card loading={loading}>
                    <span style={{ color: "#4B465C", fontSize: "13px" }}>
                      General
                    </span>
                    <Form layout="vertical" size="large" form={generalForm}>
                      <Form.Item
                        label="Description"
                        name={"recruiterDes"}
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
                          onClick={handleGeneralForm}
                        >
                          Save
                        </Button>
                      </Flex>
                    </Form>
                  </Card>
                  <Card loading={loading}>
                    <span style={{ color: "#4B465C", fontSize: "13px" }}>
                      Commission
                    </span>
                    <Form layout="vertical" size="large" form={comissionForm}>
                      <Form.Item
                        label="Percentage of Comission"
                        name={"commission"}
                        rules={[{ required: true, type: "number" }]}
                      >
                        <InputNumber
                          style={{ width: "100%", maxWidth: "300px" }}
                          placeholder="commission"
                          prefix="%"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Description"
                        name={"commissionDes"}
                        rules={[{ required: true }]}
                      >
                        <Input.TextArea
                          placeholder="Enter Description"
                          rows={4}
                        ></Input.TextArea>
                      </Form.Item>
                      <Flex justify="end">
                        <Button
                          onClick={handleComissionForm}
                          style={{
                            backgroundColor: "#E9F0F3",
                            color: "#2F2C39",
                            fontWeight: "600",
                            fontSize: "16px",
                            borderColor: "#E9F0F3",
                          }}
                        >
                          Send Notification
                        </Button>
                      </Flex>
                    </Form>
                  </Card>
                </Flex>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PopupInfo;
