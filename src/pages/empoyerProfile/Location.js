import { useState } from "react";
import { useDispatch } from "react-redux";
import { Flex, message, Typography } from "antd";
import { AddCircleIcon, LocationEmployerProfileIcon, MenuEmployerProfileIcon } from "../../assets/svg";
import { profileLocation } from "../../features/profile/profileSlice";
import CommonHeading from "../../components/commonHeading";
import CustomButton from "../../components/customButton";
import CommonModal from "../../components/commonModal";
import CommonInput from "../../components/commonInput";

const Location = ({ showLocationModal, setShowLocationModal, location, TEXT_STYLE }) => {
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState({
    city: (location && location[0]?.city) || "",
    state: (location && location[0]?.state) || "",
    country: (location && location[0]?.country) || "",
    postalCode: (location && location[0]?.postalCode) || "",
  });

  const handleShowLocationModal = () => {
    setShowLocationModal(true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
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
          postalCode: parseInt(locationData.postalCode, 10),
        })
      ).unwrap();
      if (response.success) {
        message.open({
          type: "success",
          content: "Location saved successfully",
        });
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Failed to save location",
      });
    }
  };

  return (
    <section className="location-wrapper" style={{ marginTop: "-13px" }}>
      <Typography.Title level={3} style={{ color: "#333333" }}>
        Location
      </Typography.Title>

      <Flex gap={6} className="w-100">
        <LocationEmployerProfileIcon />
        <Flex justify="space-between" className="w-100">
          <Flex gap={2} vertical>
            <Typography.Text style={TEXT_STYLE}>700 Saginaw Dr, Redwood City, California (CA), 94063</Typography.Text>
            <Typography.Text style={TEXT_STYLE}>California City</Typography.Text>
            <Typography.Text strong>USA</Typography.Text>
            <Typography.Text style={TEXT_STYLE}>93505</Typography.Text>
          </Flex>
          <MenuEmployerProfileIcon />
        </Flex>
      </Flex>
      <CustomButton category="additional" name="Add" icon={<AddCircleIcon />} handleClick={handleShowLocationModal} />

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
              <CommonInput value={locationData.city} onChange={(val) => handleChange("city", val)} placeholder="Enter City" />
            </section>

            <section className="field-container">
              <span className="label">State/Province</span>
              <CommonInput value={locationData.state} onChange={(val) => handleChange("state", val)} placeholder="Enter State/Province" />
            </section>

            <section className="field-container">
              <span className="label">Country</span>
              <CommonInput value={locationData.country} onChange={(val) => handleChange("country", val)} placeholder="Enter Country" />
            </section>

            <section className="field-container">
              <span className="label">Zip/Postal Code</span>
              <CommonInput value={locationData.postalCode} onChange={(val) => handleChange("postalCode", val)} placeholder="Enter Zip/Postal Code" />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default Location;
