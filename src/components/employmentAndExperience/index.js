import { useState } from "react";

import CommonHeading from "../commonHeading";
import CustomButton from "../customButton";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";

import {
  DetailsIcon,
  CertificationsIcon,
  AddCircleIcon,
} from "../../assets/svg";

import "./styles.scss";

const Experience = () => {
  return (
    <section className="experience-list-container">
      <section className="experience-icon">
        <CertificationsIcon />
      </section>

      <section className="experience-details-wrapper">
        <article className="experience-designation">
          <p className="position-name">Product Designer</p>
          <DetailsIcon />
        </article>

        <article className="company-detail">
          <p className="company-name">Sierra Interactive</p>
          <p className="company-duration">2022-Present</p>
        </article>

        <ul className="experience-detail">
          <li className="tasks-performed">
            Led the User Experience design process of TrackIT, Led the User
            Experience design process of TrackIT, Led the User Experience design
            process of TrackIT, Led the User Experience design process of
            TrackIT, Led the User Experience design process of TrackIT
          </li>

          <li className="tasks-performed">
            Led the User Experience design process of TrackIT, Led the User
            Experience design process of TrackIT, Led the User Experience design
            process of TrackIT, Led the User Experience design process of
            TrackIT, Led the User Experience design process of TrackIT
          </li>

          <li className="tasks-performed">
            Led the User Experience design process of TrackIT, Led the User
            Experience design process of TrackIT, Led the User Experience design
            process of TrackIT, Led the User Experience design process of
            TrackIT, Led the User Experience design process of TrackIT
          </li>
        </ul>
      </section>
    </section>
  );
};

const EmploymentAndExperience = () => {
  const [showEmployementModal, setShowEmployementModal] = useState(false);

  const handleShowEmployementModal = () => {
    setShowEmployementModal(() => true);
  };

  const handleCloseEmployementModal = () => {
    setShowEmployementModal(() => false);
  };

  return (
    <section className="employment-and-experience-wrapper">
      <CommonHeading heading="Employement and Experience History" />

      <section className="experience-wrapper">
        <Experience />
        <Experience />
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowEmployementModal}
      />

      {showEmployementModal && (
        <CommonModal
          title="Employment and Experience History"
          description="Enter your Employment and Experience History Information"
          isModalOpen={showEmployementModal}
          handleClose={handleCloseEmployementModal}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">Company</span>
              <CommonInput placeholder="Enter Company Name" />
            </section>

            <section className="field-container">
              <span className="label">Job Title</span>
              <CommonInput placeholder="Enter Job Title" />
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
    </section>
  );
};

export default EmploymentAndExperience;
