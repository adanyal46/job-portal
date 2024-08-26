import { useState } from "react";

import CommonHeading from "../commonHeading";
import CustomButton from "../customButton";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import DocumentUploader from "../documentUploader";

import {
  DetailsIcon,
  EducationIcon,
  CertificationsIcon,
  AddCircleIcon,
} from "../../assets/svg";

import "./styles.scss";

const Documents = () => {
  return (
    <section className="documents-list-container">
      <section className="documents-details-container">
        <EducationIcon />

        <article className="documents-details">
          <p className="file-name">Resume_Alina_Smith</p>
          <p className="file-date">Added 20 Jan, 2024</p>
        </article>
      </section>

      <DetailsIcon />
    </section>
  );
};

const Links = () => {
  return (
    <section className="documents-list-container">
      <section className="documents-details-container">
        <CertificationsIcon />

        <article className="documents-details">
          <p className="file-name">alinasmith.com</p>
          <p className="file-date">Website link</p>
        </article>
      </section>

      <DetailsIcon />
    </section>
  );
};

const DocumentAndLink = () => {
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  const handleShowDocumentsModal = () => {
    setShowDocumentsModal(() => true);
  };

  const handleCloseDocumentsModal = () => {
    setShowDocumentsModal(() => false);
  };

  return (
    <section className="document-and-links-wrapper">
      <CommonHeading heading="Documents and Links" />

      <section className="document-links-wrapper">
        <Documents />
        <Documents />
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowDocumentsModal}
      />

      <section className="document-links-wrapper">
        <Links />
        <Links />
      </section>

      {/* <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowEducationModal}
      /> */}

      {showDocumentsModal && (
        <CommonModal
          title="Documents"
          description="Enter your Documents Information"
          isModalOpen={showDocumentsModal}
          handleClose={handleCloseDocumentsModal}
        >
          <section className="basic-info-form-wrapper">
            <section className="button-layout-row">
              <DocumentUploader title="Resume/CV" />
              <DocumentUploader title="Portfolio/Certificates" />
            </section>
            <section className="field-container">
              <span className="label">Website Link</span>
              <CommonInput placeholder="Enter Website Link" />
            </section>

            <section className="field-container">
              <span className="label">Additional Links</span>
              <CommonInput placeholder="Enter Additional Links" />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default DocumentAndLink;
