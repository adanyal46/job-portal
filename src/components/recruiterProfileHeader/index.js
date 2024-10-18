import { useState, useEffect } from "react";

import CommonModal from "../commonModal";
import PhotoUpload from "../photoUpload";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import { EditProfileIcon } from "../../assets/svg";

import "./styles.scss";
import { useDispatch } from "react-redux";
import { updateOtherInfoMentor } from "../../features/profile/profileSlice";
import { Image, message, Input } from "antd";
import Rating from "../rating";
import LocationWithIcon from "../locationWithIcon";

const RecruiterProfileHeader = ({ user, showInfoModal, setShowInfoModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const profile = user && user?.Profile[0];
  const serverUrl =
    process.env.REACT_APP_NODE_ENV === "development"
      ? "http://54.144.76.160:5000"
      : window.origin; // Use window.origin for production

  let profileImage =
    profile?.avatarUrl &&
    profile?.avatarUrl.replace("http://your-server-url", serverUrl);

  const [profileData, setProfileData] = useState({
    fullname: profile?.fullname || "",
    email: user?.email || "",
    phnumber: profile?.phnumber || "",
    profilePic: profileImage || "",
    location: profile?.location || "",
    companyName: profile?.companyName || "",
    description: profile?.about || "",
    tagline: profile?.tagline || "",
    speak: profile?.language || "",
  });

  const [imageUrl, setImageUrl] = useState(profileImage); // State for image URL
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
    formData.append("location", profileData.location);
    formData.append("companyName", profileData.companyName);
    formData.append("about", profileData.description);
    formData.append("tagline", profileData.tagline);
    formData.append("language", profileData.speak);
    if (profileData.profilePic && profileData.profilePic instanceof File) {
      formData.append("profilePic", profileData.profilePic);
    }

    try {
      setLoading(true);
      const resultAction = await dispatch(
        updateOtherInfoMentor(formData)
      ).unwrap();
      if (resultAction.success) {
        message.success("Profile updated successfully!");
        window.location.replace("/mentor/profile");
        handleCloseInfoModal();
      }
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section style={{ display: "flex", gap: "2rem" }}>
        <figure className="user-profile-image-wrapper">
          <Image
            loading="lazy"
            width={200}
            height={200}
            className="user-profile-image"
            src={imageUrl || "/images/user-profile-image.png"}
            alt="UserProfileImage"
            style={{ objectFit: "cover" }}
          />
        </figure>

        <article className="mentor-card-details-container">
          <article className="mentor-card-details">
            <h2 className="mentor-name">{profile?.fullname || "Guest"}</h2>
            <Rating rating={4} reviews={7} />
            <LocationWithIcon location={profile?.location || "N/A"} />
            <p className="mentor-expertise">{profile?.companyName || "N/A"}</p>
            <p className="mentor-tagline">
              {profile?.tagline || "No tagline available"}
            </p>
          </article>
        </article>
        <CustomButton
          category="iconed"
          shape="circle"
          icon={<EditProfileIcon />}
          handleClick={handleShowInfoModal}
        />
      </section>

      {showInfoModal && (
        <CommonModal
          title="Edit Profile"
          description="Update your information"
          isModalOpen={showInfoModal}
          handleClose={handleCloseInfoModal}
          handleOk={handleOk}
          loading={loading}
        >
          <section className="basic-info-inner-wrapper">
            <PhotoUpload
              initialImageUrl={imageUrl}
              onChange={handleChange}
              name="profilePic"
            />

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

              <section className="field-container">
                <span className="label">Location</span>
                <CommonInput
                  placeholder="Enter Location"
                  value={profileData.location}
                  onChange={(val) => handleChange("location", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Company Name</span>
                <CommonInput
                  placeholder="Enter Company Name"
                  value={profileData.companyName}
                  onChange={(val) => handleChange("companyName", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Tagline</span>
                <CommonInput
                  placeholder="Enter Tagline"
                  value={profileData.tagline}
                  onChange={(val) => handleChange("tagline", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Description</span>
                <CommonInput
                  category="textarea"
                  placeholder="Enter Description"
                  value={profileData.description}
                  onChange={(val) => handleChange("description", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Speak Input</span>
                <Input.TextArea
                  value={profileData.speak}
                  onChange={(e) => handleChange("speak", e.target.value)}
                  placeholder="Enter Speak Input"
                />
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </>
  );
};

export default RecruiterProfileHeader;
