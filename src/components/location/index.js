import { useState } from "react";

import CommonHeading from "../commonHeading";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import { DetailsIcon, EducationIcon, AddCircleIcon } from "../../assets/svg";

import "./styles.scss";

const Location = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleShowLocationModal = () => {
    setShowLocationModal(() => true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(() => false);
  };

  return (
    <section className="location-wrapper">
      <CommonHeading heading="Location" />

      <section className="location-container">
        <section className="location-list-container">
          <section className="location-details-container">
            <EducationIcon />

            <article className="location-details">
              <p className="location-name">California City</p>
              <p className="location-city">California</p>
              <p className="location-id">93505</p>
            </article>
          </section>

          <DetailsIcon />
        </section>
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowLocationModal}
      />

      {showLocationModal && (
        <CommonModal
          title="Location"
          description="Enter your Location Information"
          isModalOpen={showLocationModal}
          handleClose={handleCloseLocationModal}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">City</span>
              <CommonInput placeholder="Enter City" />
            </section>

            <section className="field-container">
              <span className="label">State/Province</span>
              <CommonInput placeholder="Enter State/Province" />
            </section>

            <section className="field-container">
              <span className="label">Country</span>
              <CommonInput placeholder="Enter Country" />
            </section>

            <section className="field-container">
              <span className="label">Zip/Postal Code</span>
              <CommonInput placeholder="Enter Zip/Postal Code" />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default Location;
