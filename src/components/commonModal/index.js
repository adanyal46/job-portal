import { Modal, Popconfirm } from "antd";

import CustomButton from "../customButton";

import "./styles.scss";

const CommonModal = (props) => {
  const {
    classes,
    title,
    description,
    isModalOpen,
    handleClose,
    handleOk,
    footer,
    children,
    handleDelete,
    isDelete = true,
  } = props;

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
      onCancel={handleClose}
      footer={
        footer || [
          isDelete && (
            <CustomButton
              category="danger"
              name="Delete"
              key="deleteBtn"
              handleClick={handleDelete}
            />
          ),
          <CustomButton
            key="cancelButton"
            category="plain"
            name="Cancel"
            handleClick={handleClose}
          />,
          <CustomButton
            key="saveButton"
            category="primary"
            name="Save"
            handleClick={handleOk}
          />,
        ]
      }
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
