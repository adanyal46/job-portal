import React, { useState } from "react";
import { Collapse, Checkbox, Form, Input, message } from "antd";
import CustomButton from "../customButton";
import "./styles.scss";
import CommonModal from "../commonModal";
import {
  createServiceMentor,
  deleteServiceMentor,
  updateServiceApiMentor,
} from "../../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};

const MentorProfileService = (props) => {
  const dispatch = useDispatch();
  const { services, mentorId, isModalVisible, setIsModalVisible } = props; // Receive mentorId from props
  const [form] = Form.useForm();
  const { mentorServiceLoading } = useSelector((state) => state.profile);
  const [service, setService] = useState(null);

  // Create items for Collapse
  const items = services?.map((service) => ({
    key: service.id,
    label: (
      <div className="service-header">
        <p className="header-text">{`${
          service.name.charAt(0).toUpperCase() + service.name.slice(1)
        } $${service.pricing}`}</p>
        <Checkbox value={service.id.toString()}></Checkbox>
      </div>
    ),
    children: (
      <div className="service-details">
        <p>{service.description}</p>
        <CustomButton
          category="secondary"
          name="Edit"
          handleClick={() => {
            setService(service);
            setIsModalVisible(true);
            form.setFieldsValue(service);
          }}
        />
      </div>
    ),
  }));

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
      form.resetFields(); // Reset form fields after submission
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
        form.resetFields(); // Reset form fields after submission
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

  return (
    <div className="mentor-profile-service">
      {/* <div className="action-buttons">
        <CustomButton
          category="primary"
          name="Add Service"
          handleClick={() => setIsModalVisible(true)}
        />
      </div> */}
      <Checkbox.Group
        onChange={onChange}
        className="custom-checkbox-group"
        style={{ height: "260px", overflow: "auto", marginTop: "20px" }}
      >
        <Collapse
          accordion
          collapsible="icon"
          ghost
          className="custom-mentor-collapse"
          expandIconPosition="end"
          items={items} // Pass the items here
        />
      </Checkbox.Group>
      {/* Use CommonModal for Adding Service */}
      <CommonModal
        title={service ? "Update New Service" : "Add New Service"}
        description="Please fill in the details below to add a new service."
        isModalOpen={isModalVisible}
        handleClose={handleCloseServiceModal}
        handleOk={service ? handleUpdateService : handleAddService}
        loading={mentorServiceLoading}
        handleDelete={handleDeleteService}
      >
        <Form form={form} layout="vertical" size="large">
          <Form.Item
            name="name"
            label="Service Name"
            rules={[
              { required: true, message: "Please input the service name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="pricing"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </CommonModal>
    </div>
  );
};

export default MentorProfileService;
