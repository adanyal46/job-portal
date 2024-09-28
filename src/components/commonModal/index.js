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
    onDelete,
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
          <Popconfirm
            placement="top"
            key="deleteButton"
            title={"Are you sure to delete this item?"}
            okText="Yes"
            onConfirm={onDelete}
            cancelText="No"
            okButtonProps={{
              danger: true,
            }}
          >
            <CustomButton category="danger" name="Delete" />
          </Popconfirm>,
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
