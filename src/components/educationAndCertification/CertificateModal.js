import React from "react";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import { Modal } from "antd";
const { confirm } = Modal;
const CertificateModal = ({
  showCertificationModal,
  handleCloseCertificationModal,
  handleCertificateSubmit,
  certificateData,
  handleChangeCer,
  handleDelete,
  certificateId,
}) => {
  const handleRemove = () => {
    confirm({
      title: "Are you sure you want to delete this certificate?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(certificateId);
      },
      onCancel() {
        console.log("Cancelled deletion");
      },
    });
  };

  return (
    <CommonModal
      title="Certification"
      description="Enter your Certification Information"
      isModalOpen={showCertificationModal}
      handleClose={handleCloseCertificationModal}
      handleOk={handleCertificateSubmit}
      handleDelete={handleRemove}
    >
      <section className="basic-info-form-wrapper">
        <section className="field-container">
          <span className="label">Certificate Title</span>
          <CommonInput
            placeholder="Enter Certificate Title"
            value={certificateData?.certName}
            onChange={(val) => handleChangeCer("certName", val)}
          />
        </section>

        <section className="field-container">
          <span className="label">Institution Name</span>
          <CommonInput
            placeholder="Enter Institution Name"
            value={certificateData?.orgName}
            onChange={(val) => handleChangeCer("orgName", val)}
          />
        </section>

        <section className="range-field-wrapper">
          <section className="range-field-container">
            <span className="label">From</span>
            <CommonInput
              category="date"
              placeholder="Date Range"
              value={certificateData?.from}
              onChange={(val) => handleChangeCer("from", val)}
            />
          </section>

          <section className="range-field-container">
            <span className="label">To</span>
            <CommonInput
              category="date"
              placeholder="Date Range"
              value={certificateData?.to}
              onChange={(val) => handleChangeCer("to", val)}
            />
          </section>
        </section>

        <section className="field-container">
          <span className="label">Description</span>
          <CommonInput
            category="textarea"
            placeholder="Enter Description"
            value={certificateData?.description}
            onChange={(val) => handleChangeCer("description", val)}
          />
        </section>
      </section>
    </CommonModal>
  );
};

export default CertificateModal;
