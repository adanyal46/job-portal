import { useState } from "react";

import CommonModal from "../commonModal";
import PhotoUpload from "../photoUpload";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import { EditProfileIcon } from "../../assets/svg";

import "./styles.scss";

const ProfileHeader = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => {
    setShowInfoModal(() => true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(() => false);
  };

  return (
    <>
      <section className="profile-header-container">
        <figure className="user-profile-image-wrapper">
          <img
            loading="lazy"
            className="user-profile-image"
            src="/images/user-profile-image.png"
            alt="UserProfileImage"
          />
        </figure>

        <article className="profile-user-details">
          <section className="edit-profile-button">
            <CustomButton
              category="iconed"
              shape="circle"
              icon={<EditProfileIcon />}
              handleClick={handleShowInfoModal}
            />
          </section>

          <h2 className="profile-user-name">Alina Smith</h2>
          <p className="profile-email">AlinaSmith@gmail.com</p>
          <p className="profile-phone-number">+1 305 3216549</p>
          <p className="profile-id">ID: #232122</p>
        </article>
      </section>

      {showInfoModal && (
        <CommonModal
          title="Basic Information"
          description="Enter your Basic Information"
          isModalOpen={showInfoModal}
          handleClose={handleCloseInfoModal}
        >
          <section className="basic-info-inner-wrapper">
            <PhotoUpload />

            <section className="basic-info-form-wrapper">
              <section className="field-container">
                <span className="label">Full Name</span>
                <CommonInput placeholder="Enter Full Name" />
              </section>

              <section className="field-container">
                <span className="label">Email</span>
                <CommonInput placeholder="Enter Email" />
              </section>

              <section className="field-container">
                <span className="label">Contact Number</span>
                <CommonInput placeholder="Enter Contact Number" />
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </>
  );
};

export default ProfileHeader;
