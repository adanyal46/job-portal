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
import { useDispatch } from "react-redux";
import { message } from "antd";
import { profileDocument } from "../../features/profile/profileSlice";

const Documents = ({ document }) => {
  return (
    <section className="documents-list-container">
      <section className="documents-details-container">
        <EducationIcon />

        <article className="documents-details">
          <p className="file-name">{document?.portfolioLink}</p>
          <p className="file-date">Added 20 Jan, 2024</p>
        </article>
      </section>

      {/* <DetailsIcon /> */}
    </section>
  );
};

const Links = ({ document }) => {
  return (
    <section className="documents-list-container">
      <section className="documents-details-container">
        <CertificationsIcon />

        <article className="documents-details">
          <p className="file-name">{document?.websiteLink}</p>
          <p className="file-date">Website link</p>
        </article>
      </section>

      {/* <DetailsIcon /> */}
    </section>
  );
};

const DocumentAndLink = ({
  showDocumentsModal,
  setShowDocumentsModal,
  document,
  user,
}) => {
  const dispatch = useDispatch();
  const [documentData, setDocumentData] = useState({
    resume: "",
    portfolio: "",
    websiteLink: "",
    additionalLink: "",
  });

  const handleShowDocumentsModal = () => {
    setShowDocumentsModal(() => true);
  };

  const handleCloseDocumentsModal = () => {
    setShowDocumentsModal(() => false);
  };

  const handleChange = (name, value) => {
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // if (
    //   !(documentData.resume || documentData.portfolio) ||
    //   !documentData.additionalLink ||
    //   !documentData.websiteLink
    // ) {
    //   message.open({
    //     type: "error",
    //     content: "Please fill all fields",
    //   });
    //   return;
    // }
    const formData = new FormData();
    documentData["userId"] = user?.id;
    Object.keys(documentData).forEach((key) => {
      formData.append(key, documentData[key]);
    });
    dispatch(profileDocument(formData));
  };

  return (
    <section className="document-and-links-wrapper">
      <CommonHeading heading="Documents and Links" />

      <section className="document-links-wrapper">
        {document?.map((item) => (
          <Documents document={item} />
        ))}
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowDocumentsModal}
      />

      <section className="document-links-wrapper">
        {document?.map((item) => (
          <Links document={item} />
        ))}
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
          handleOk={handleSubmit}
        >
          <section className="basic-info-form-wrapper">
            <section className="button-layout-row">
              <DocumentUploader
                title="Resume/CV"
                onChange={handleChange}
                name="resume"
              />
              <DocumentUploader
                title="Portfolio/Certificates"
                onChange={handleChange}
                name="portfolio"
              />
            </section>
            <section className="field-container">
              <span className="label">Website Link</span>
              <CommonInput
                value={documentData.websiteLink}
                onChange={(val) => handleChange("websiteLink", val)}
                placeholder="Enter Website Link"
              />
            </section>

            <section className="field-container">
              <span className="label">Additional Links</span>
              <CommonInput
                placeholder="Enter Additional Links"
                value={documentData.additionalLink}
                required={true}
                onChange={(val) => handleChange("additionalLink", val)}
              />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default DocumentAndLink;
