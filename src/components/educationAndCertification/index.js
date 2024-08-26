import { useState } from "react";

import CommonHeading from "../commonHeading";
import CustomButton from "../customButton";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";

import {
  DetailsIcon,
  EducationIcon,
  CertificationsIcon,
  AddCircleIcon,
} from "../../assets/svg";

import "./styles.scss";

const Education = () => {
  return (
    <section className="education-list-container">
      <section className="education-details-container">
        <EducationIcon />

        <article className="education-details">
          <p className="program-name">
            Bachelors of Science in Computer Science
          </p>
          <p className="institute-name">
            The University of North Carolina at Chapel Hill
          </p>
          <p className="duration">2010 - 2014</p>
        </article>
      </section>

      <DetailsIcon />
    </section>
  );
};

const Certifications = () => {
  return (
    <section className="education-list-container">
      <section className="education-details-container">
        <CertificationsIcon />

        <article className="education-details">
          <p className="program-name">
            Bachelors of Science in Computer Science
          </p>
          <p className="institute-name">
            The University of North Carolina at Chapel Hill
          </p>
          <p className="duration">2010 - 2014</p>
        </article>
      </section>

      <DetailsIcon />
    </section>
  );
};

const EducationAndCertification = () => {
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);

  const handleShowEducationModal = () => {
    setShowEducationModal(() => true);
  };

  const handleCloseEducationModal = () => {
    setShowEducationModal(() => false);
  };

  const handleShowCertificationModal = () => {
    setShowCertificationModal(() => true);
  };

  const handleCloseCertificationModal = () => {
    setShowCertificationModal(() => false);
  };

  return (
    <section className="education-and-certifications-wrapper">
      <CommonHeading heading="Education and Certifications" />

      <section className="education-wrapper">
        <Education />
        <Education />
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowEducationModal}
      />

      <section className="education-wrapper">
        <Certifications />
        <Certifications />
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowCertificationModal}
      />

      {showEducationModal && (
        <CommonModal
          title="Education"
          description="Enter your Education Information"
          isModalOpen={showEducationModal}
          handleClose={handleCloseEducationModal}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">Degree/Qualification Name</span>
              <CommonInput placeholder="Enter Degree/Qualification Name" />
            </section>

            <section className="field-container">
              <span className="label">Academic Institution</span>
              <CommonInput placeholder="Enter Academic Institution" />
            </section>

            <section className="field-container">
              <span className="label">Description</span>
              <CommonInput
                category="textarea"
                placeholder="Enter Description"
              />
            </section>

            <section className="range-field-wrapper">
              <section className="range-field-container">
                <span className="label">From</span>
                <CommonInput category="date" placeholder="Date Range" />
              </section>

              <section className="range-field-container">
                <span className="label">To</span>
                <CommonInput category="date" placeholder="Date Range" />
              </section>
            </section>
          </section>
        </CommonModal>
      )}

      {showCertificationModal && (
        <CommonModal
          title="Certification"
          description="Enter your Certification Information"
          isModalOpen={showCertificationModal}
          handleClose={handleCloseCertificationModal}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">Certificate Title</span>
              <CommonInput placeholder="Enter Certificate Title" />
            </section>

            <section className="field-container">
              <span className="label">Institution Name</span>
              <CommonInput placeholder="Enter Institution Name" />
            </section>

            <section className="range-field-wrapper">
              <section className="range-field-container">
                <span className="label">From</span>
                <CommonInput category="date" placeholder="Date Range" />
              </section>

              <section className="range-field-container">
                <span className="label">To</span>
                <CommonInput category="date" placeholder="Date Range" />
              </section>
            </section>

            <section className="field-container">
              <span className="label">Description</span>
              <CommonInput
                category="textarea"
                placeholder="Enter Description"
              />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default EducationAndCertification;
