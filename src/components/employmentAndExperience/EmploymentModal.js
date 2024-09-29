import React from "react";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import { Modal } from "antd";
const { confirm } = Modal;

const EmploymentModal = ({
  showEmployementModal,
  handleCloseEmployementModal,
  handleSubmit,
  handleChange,
  employData,
  employmentId,
  handleDelete,
}) => {
  const handleRemove = () => {
    confirm({
      title: "Are you sure you want to delete this employment history?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(employmentId);
      },
      onCancel() {
        console.log("Cancelled deletion");
      },
    });
  };
  return (
    <CommonModal
      title="Employment and Experience History"
      description="Enter your Employment and Experience History Information"
      isModalOpen={showEmployementModal}
      handleClose={handleCloseEmployementModal}
      handleOk={handleSubmit}
      handleDelete={handleRemove}
    >
      <section className="basic-info-form-wrapper">
        <section className="field-container">
          <span className="label">Company</span>
          <CommonInput
            placeholder="Enter Company Name"
            value={employData.company}
            onChange={(val) => handleChange("company", val)}
          />
        </section>

        <section className="field-container">
          <span className="label">Job Title</span>
          <CommonInput
            placeholder="Enter Job Title"
            value={employData.jobTitle}
            onChange={(val) => handleChange("jobTitle", val)}
          />
        </section>

        <section className="field-container">
          <span className="label">Description</span>
          <CommonInput
            category="textarea"
            placeholder="Enter Description"
            value={employData.description}
            onChange={(val) => handleChange("description", val)}
          />
        </section>

        <section className="range-field-wrapper">
          <section className="range-field-container">
            <span className="label">From</span>
            <CommonInput
              category="date"
              placeholder="Date Range"
              value={employData.startedOn}
              onChange={(val) => handleChange("startedOn", val)}
            />
          </section>

          <section className="range-field-container">
            <span className="label">To</span>
            <CommonInput
              category="date"
              placeholder="Date Range"
              value={employData.endOn}
              onChange={(val) => handleChange("endOn", val)}
            />
          </section>
        </section>
      </section>
    </CommonModal>
  );
};

export default EmploymentModal;
