import { Modal } from "antd";

import CustomButton from "../customButton";

import "./styles.scss";

const CommonModal = (props) => {
  const {
    classes,
    title,
    description,
    isModalOpen,
    handleClose,
    footer,
    children,
  } = props;

  const handleOk = () => {
    console.log("ok");
  };

  const ModalHeader = () => {
    return (
      <section className="common-modal-header-wrapper">
        <h5 className="modal-title">{title}</h5>
        {description && <h6 className="modal-description">{description}</h6>}
      </section>
    );
  };

  return (
    <Modal
      className={`common-modal-container ${classes}`}
      title={<ModalHeader />}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
      footer={
        footer || [
          <CustomButton key="deleteButton" category="danger" name="Delete" />,
          <CustomButton
            key="cancelButton"
            category="plain"
            name="Cancel"
            handleClick={handleClose}
          />,
          <CustomButton key="saveButton" category="primary" name="Save" />,
        ]
      }
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
