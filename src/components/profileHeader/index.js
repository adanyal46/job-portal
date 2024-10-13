import { useState, useEffect } from "react";

import CommonModal from "../commonModal";
import PhotoUpload from "../photoUpload";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import { EditProfileIcon } from "../../assets/svg";

import "./styles.scss";
import { useDispatch } from "react-redux";
import { profileUpdate } from "../../features/profile/profileSlice";
import { Image, message } from "antd";

const ProfileHeader = ({
  user,
  showInfoModal,
  setShowInfoModal,
  setShowEducationModal,
  setShowCertificationModal,
}) => {
  const dispatch = useDispatch();
  const profile = user?.Profile[0];
  const serverUrl = "http://54.144.76.160:5000";

  // Replace placeholder with actual server URL
  let profileImage =
    profile?.avatarUrl &&
    profile?.avatarUrl.replace("http://your-server-url", serverUrl);

  const [profileData, setProfileData] = useState({
    fullname: profile?.fullname || "",
    email: user?.email || "",
    phnumber: profile?.phnumber || "",
    profilePic: profileImage || "",
  });

  const [imageUrl, setImageUrl] = useState(profileImage); // State for image URL
  // Update the imageUrl when the profile changes
  useEffect(() => {
    if (profileImage) {
      setImageUrl(profileImage);
    }
  }, [profileImage]);

  const handleShowInfoModal = () => {
    setShowInfoModal(() => true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(() => false);
  };

  const handleChange = (name, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("fullname", profileData.fullname);
    formData.append("email", profileData.email);
    formData.append("phnumber", profileData.phnumber);
    if (profileData.avatarUrl && profileData.avatarUrl instanceof File) {
      formData.append("profilePic", profileData.avatarUrl);
    }

    try {
      const resultAction = await dispatch(profileUpdate(formData)).unwrap();
      if (resultAction.success) {
        message.open({
          type: "success",
          content: "Porfile save successfully!",
        });
        handleCloseInfoModal();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error(error);
    }
  };
  return (
    <>
      <section className="profile-header-container">
        <figure className="user-profile-image-wrapper">
          <Image
            loading="lazy"
            width={200}
            height={200}
            className="user-profile-image"
            src={imageUrl || "/images/user-profile-image.png"} // Use imageUrl state
            alt="UserProfileImage"
            style={{ objectFit: "cover" }}
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

          <h2 className="profile-user-name">{profile?.fullname || "Guest"}</h2>
          <p className="profile-email">{user?.email || "N/A"}</p>
          <p className="profile-phone-number">{profile?.phnumber || "N/A"}</p>
          <p className="profile-id">ID: #{profile?.id || "0"}</p>
        </article>
      </section>

      {showInfoModal && (
        <CommonModal
          title="Basic Information"
          description="Enter your Basic Information"
          isModalOpen={showInfoModal}
          handleClose={handleCloseInfoModal}
          handleOk={handleOk}
        >
          <section className="basic-info-inner-wrapper">
            <PhotoUpload initialImageUrl={imageUrl} onChange={handleChange} />

            <section className="basic-info-form-wrapper">
              <section className="field-container">
                <span className="label">Full Name</span>
                <CommonInput
                  placeholder="Enter Full Name"
                  value={profileData.fullname}
                  onChange={(val) => handleChange("fullname", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Email</span>
                <CommonInput
                  placeholder="Enter Email"
                  value={profileData.email}
                  onChange={(val) => handleChange("email", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Contact Number</span>
                <CommonInput
                  placeholder="Enter Contact Number"
                  value={profileData.phnumber}
                  onChange={(val) => handleChange("phnumber", val)}
                />
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </>
  );
};

export default ProfileHeader;
