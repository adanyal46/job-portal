import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import CommonModal from "../commonModal";
import {
  createServiceMentor,
  deleteServiceMentor,
  updateServiceApiMentor,
} from "../../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const MentorServiceList = ({
  isModalVisible,
  setIsModalVisible,
  mentorId,
  services,
  user,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { mentorServiceLoading } = useSelector((state) => state.profile);
  const [service, setService] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const ROLE = user?.role;

  // Sample service data - could come from props or API
  const servicesList = services || [];

  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const URL =
          ROLE === "RECRUITER"
            ? "user/services?type=RecService"
            : "user/services?type=MentorService";
        const response = await axiosInstance.get(URL);
        setServiceList(response.data || []);
      } catch (error) {
        message.open({
          type: "error",
          content: error.message || "Internal Server Error",
        });
      }
    };
    fetchServiceList();
  }, []);

  // Function to handle modal submit
  const handleAddService = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    values["mentorId"] = mentorId;
    const response = await dispatch(createServiceMentor(values)).unwrap();
    if (response.success) {
      message.open({
        type: "success",
        content: "Service Created!",
      });
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateService = async () => {
    try {
      if (!service) return;
      await form.validateFields();
      const values = form.getFieldsValue();
      values["mentorId"] = mentorId;
      const response = await dispatch(
        updateServiceApiMentor({ serviceId: service?.id, formData: values })
      ).unwrap();
      if (response.success) {
        message.open({
          type: "success",
          content: "Service Updated!",
        });
        setIsModalVisible(false);
        form.resetFields();
        setService(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseServiceModal = () => {
    setIsModalVisible(false);
    setService(null);
    form.resetFields();
  };

  const handleDeleteService = async () => {
    if (!service) return;
    const response = await dispatch(deleteServiceMentor(service?.id)).unwrap();
    if (response.success) {
      setIsModalVisible(false);
      form.resetFields();
      setService(null);
      message.open({
        type: "success",
        content: "Service Deleted!",
      });
    }
  };

  const handleEditClick = (serviceItem) => {
    setService(serviceItem);
    setIsModalVisible(true);
    form.setFieldsValue(serviceItem);
  };

  return (
    <div className="mentor-services-container">
      {servicesList.map((service) => (
        <div key={service.id} className="service-card">
          <div className="service-info">
            <span className="service-name">{service.name}</span>
            <span className="service-price">${service.pricing}</span>
          </div>
          <Button
            className="edit-button"
            onClick={() => handleEditClick(service)}
          >
            Edit{" "}
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3712_220372)">
                <path
                  d="M6.51727 15.6876H3.375C3.22582 15.6876 3.08274 15.6283 2.97725 15.5228C2.87176 15.4173 2.8125 15.2743 2.8125 15.1251V11.9828C2.81257 11.8338 2.87174 11.691 2.97703 11.5856L11.648 2.91462C11.7534 2.80921 11.8965 2.75 12.0456 2.75C12.1947 2.75 12.3377 2.80921 12.4432 2.91462L15.5855 6.05478C15.6909 6.16026 15.7501 6.30327 15.7501 6.4524C15.7501 6.60152 15.6909 6.74453 15.5855 6.85001L6.91453 15.5231C6.80912 15.6284 6.66625 15.6875 6.51727 15.6876Z"
                  stroke="#52595C"
                  strokeWidth="1.125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5625 5L13.5 8.9375"
                  stroke="#52595C"
                  strokeWidth="1.125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3712_220372">
                  <rect y="0.5" width="18" height="18" rx="9" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
      ))}

      {isModalVisible && (
        <CommonModal
          title={service ? "Update Service" : "Add New Service"}
          description="Please fill in the details below to add a new service."
          isModalOpen={isModalVisible}
          handleClose={handleCloseServiceModal}
          handleOk={service ? handleUpdateService : handleAddService}
          loading={mentorServiceLoading}
          handleDelete={service ? handleDeleteService : null}
        >
          <Form form={form} layout="vertical" size="large">
            <Form.Item
              name="name"
              label="Service Name"
              rules={[
                { required: true, message: "Please input the service name!" },
              ]}
            >
              <Select
                options={serviceList.map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea className="ant-input ant-input-lg" rows={4} />
            </Form.Item>
            <Form.Item
              name="pricing"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </CommonModal>
      )}

      <style jsx>{`
        .mentor-services-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
          margin-top: 20px;
        }

        .service-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px 20px;
          border-radius: 15px;
          border: 1px solid #aeacb4;
          background-color: #fff;
        }

        .service-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .service-name {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .service-price {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-left: 8px;
        }

        .edit-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #aeacb4;
          color: #555;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-button:hover {
          background-color: #eaeaea;
        }
      `}</style>
    </div>
  );
};

export default MentorServiceList;
