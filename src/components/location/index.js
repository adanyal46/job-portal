import { useState } from "react";

import CommonHeading from "../commonHeading";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import { DetailsIcon, EducationIcon, AddCircleIcon } from "../../assets/svg";

import "./styles.scss";
import { useDispatch } from "react-redux";
import { profileLocation } from "../../features/profile/profileSlice";
import { message } from "antd";

const Location = ({ showLocationModal, setShowLocationModal, location }) => {
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState({
    city: (location && location[0]?.city) || "",
    state: (location && location[0]?.state) || "",
    country: (location && location[0]?.country) || "",
    postalCode: (location && location[0]?.postalCode) || "",
  });

  const handleShowLocationModal = () => {
    setShowLocationModal(() => true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(() => false);
  };

  const handleChange = (name, value) => {
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(
        profileLocation({
          ...locationData,
          postalCode: parseInt(locationData.postalCode),
        })
      ).unwrap();
      if (response.success) {
        message.open({
          type: "success",
          content: "Location save successfully",
        });
      }
    } catch (error) {}
  };

  return (
    <section className="location-wrapper">
      <CommonHeading heading="Location" />

      <section className="location-container">
        {location?.map((item) => (
          <section className="location-list-container" key={item.id}>
            <section className="location-details-container">
              <EducationIcon />

              <article className="location-details">
                <p className="location-name">{item.city}</p>
                <p className="location-city">{item.country}</p>
                <p className="location-id">{item.id}</p>
              </article>
            </section>

            <DetailsIcon />
          </section>
        ))}
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
          handleOk={handleSubmit}
          isDelete={false}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">City</span>
              <CommonInput
                value={locationData.city}
                onChange={(val) => handleChange("city", val)}
                placeholder="Enter City"
              />
            </section>

            <section className="field-container">
              <span className="label">State/Province</span>
              <CommonInput
                value={locationData.state}
                onChange={(val) => handleChange("state", val)}
                placeholder="Enter State/Province"
              />
            </section>

            <section className="field-container">
              <span className="label">Country</span>
              <CommonInput
                value={locationData.country}
                onChange={(val) => handleChange("country", val)}
                placeholder="Enter Country"
              />
            </section>

            <section className="field-container">
              <span className="label">Zip/Postal Code</span>
              <CommonInput
                value={locationData.postalCode}
                onChange={(val) => handleChange("postalCode", val)}
                placeholder="Enter Zip/Postal Code"
              />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default Location;
