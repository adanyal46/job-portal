import React from "react";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import { Modal } from "antd";
const { confirm } = Modal;
const EducationModal = ({
  educationData,
  handleChange,
  showEducationModal,
  handleCloseEducationModal,
  handleEducationSubmit,
  educationId,
  handleDelete,
}) => {
  const handleRemove = () => {
    confirm({
      title: "Are you sure you want to delete this education?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(educationId);
      },
      onCancel() {
        console.log("Cancelled deletion");
      },
    });
  };
  return (
    <CommonModal
      title="Education"
      description="Enter your Education Information"
      isModalOpen={showEducationModal}
      handleClose={handleCloseEducationModal}
      handleOk={handleEducationSubmit}
      handleDelete={handleRemove}
    >
      <section className="basic-info-form-wrapper">
        <section className="field-container">
          <span className="label">Degree/Qualification Name</span>
          <CommonInput
            value={educationData.degree}
            onChange={(val) => handleChange("degree", val)}
            placeholder="Enter Degree/Qualification Name"
          />
        </section>

        <section className="field-container">
          <span className="label">Academic Institution</span>
          <CommonInput
            value={educationData.institution}
            onChange={(val) => handleChange("institution", val)}
            placeholder="Enter Academic Institution"
          />
        </section>

        <section className="field-container">
          <span className="label">Description</span>
          <CommonInput
            value={educationData.description}
            onChange={(val) => handleChange("description", val)}
            category="textarea"
            placeholder="Enter Description"
          />
        </section>

        <section className="range-field-wrapper">
          <section className="range-field-container">
            <span className="label">From</span>
            <CommonInput
              category="date"
              value={educationData.from}
              onChange={(val) => handleChange("from", val)}
              placeholder="Date Range"
            />
          </section>

          <section className="range-field-container">
            <span className="label">To</span>
            <CommonInput
              category="date"
              value={educationData.to}
              onChange={(val) => handleChange("to", val)}
              placeholder="Date Range"
            />
          </section>
        </section>
      </section>
    </CommonModal>
  );
};

export default EducationModal;
