import { useState, useEffect } from "react";

import CommonModal from "../commonModal";
import PhotoUpload from "../photoUpload";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import { EditProfileIcon, VerifiedIcon } from "../../assets/svg";

import "./styles.scss";
import { useDispatch } from "react-redux";
import {
  updateOtherInfo,
  profile as profileRefresh,
} from "../../features/profile/profileSlice";
import {
  Image,
  message,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
} from "antd";
import Rating from "../rating";
import LocationWithIcon from "../locationWithIcon";
import { getRelativePath } from "../../utils";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const RecruiterProfileHeader = ({ user, showInfoModal, setShowInfoModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const profile = user && user?.Profile[0];

  // Languages proficiency levels
  const proficiencyLevels = [
    { value: "basic", label: "Basic" },
    { value: "conversational", label: "Conversational" },
    { value: "fluent", label: "Fluent" },
    { value: "native", label: "Native" },
  ];

  // Initialize state for profile data
  const [profileData, setProfileData] = useState({
    fullname: profile?.fullname || "",
    email: user?.email || "",
    phnumber: profile?.phnumber || "",
    profilePic: profile?.avatarId || "",
    location: profile?.location || "",
    description: profile?.about || "",
    tagline: profile?.tagline || "",
    languages: [], // Will store array of { language, proficiency }
  });

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(profile?.avatarId ? profile?.avatarId : "/images/no-image.jpg");

    // Parse languages from profile if available
    if (profile?.language) {
      try {
        // Try to parse as JSON first
        let languagesArray = [];
        try {
          languagesArray = JSON.parse(profile.language);
        } catch (e) {
          // If not valid JSON, treat as a comma-separated string
          languagesArray = profile.language.split(",").map((lang) => {
            const parts = lang.trim().split("-");
            return {
              language: parts[0]?.trim() || "",
              proficiency: parts[1]?.trim() || "conversational", // Default to conversational
            };
          });
        }

        // Ensure it's an array and has the right structure
        if (!Array.isArray(languagesArray)) {
          languagesArray = [
            {
              language: profile.language,
              proficiency: "conversational",
            },
          ];
        }

        setProfileData((prev) => ({
          ...prev,
          languages:
            languagesArray.length > 0
              ? languagesArray
              : [{ language: "", proficiency: "conversational" }],
        }));
      } catch (e) {
        // Fallback to a single default entry
        setProfileData((prev) => ({
          ...prev,
          languages: [
            { language: profile.language || "", proficiency: "conversational" },
          ],
        }));
      }
    } else {
      // Initialize with one empty language field
      setProfileData((prev) => ({
        ...prev,
        languages: [{ language: "", proficiency: "conversational" }],
      }));
    }
  }, [profile]);

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

  // Handle language change
  const handleLanguageChange = (index, field, value) => {
    setProfileData((prevData) => {
      const updatedLanguages = [...prevData.languages];
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        [field]: value,
      };
      return {
        ...prevData,
        languages: updatedLanguages,
      };
    });
  };

  // Add a new language field
  const addLanguage = () => {
    setProfileData((prevData) => ({
      ...prevData,
      languages: [
        ...prevData.languages,
        { language: "", proficiency: "conversational" },
      ],
    }));
  };

  // Remove a language field
  const removeLanguage = (index) => {
    setProfileData((prevData) => {
      const updatedLanguages = [...prevData.languages];
      updatedLanguages.splice(index, 1);
      return {
        ...prevData,
        languages:
          updatedLanguages.length > 0
            ? updatedLanguages
            : [{ language: "", proficiency: "conversational" }],
      };
    });
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("fullname", profileData.fullname);
    formData.append("email", profileData.email);
    formData.append("phnumber", profileData.phnumber);
    formData.append("location", profileData.location);
    formData.append("about", profileData.description);
    formData.append("tagline", profileData.tagline);

    // Format languages for backend
    const languagesJson = JSON.stringify(profileData.languages);
    formData.append("language", languagesJson);

    if (profileData.profilePic && profileData.profilePic instanceof File) {
      formData.append("profilePic", profileData.profilePic);
    }

    try {
      setLoading(true);
      const resultAction = await dispatch(updateOtherInfo(formData)).unwrap();
      if (resultAction.success) {
        message.success("Profile updated successfully!");
        window.location.replace("/recruiter/profile");
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
            preview={false}
          />
        </figure>

        <article className="mentor-card-details-container">
          <article className="mentor-card-details">
            <h2 className="mentor-name" style={{ marginBottom: "12px" }}>
              {profile?.fullname || "Guest"}
            </h2>
            <Rating rating={0} reviews={0} />
            <LocationWithIcon location={profile?.location || "N/A"} />
            <p className="mentor-tagline" style={{ marginBottom: "12px" }}>
              {profile?.tagline || "No tagline available"}
            </p>
            <span
              style={{
                backgroundColor: "#E2F3F9",
                color: "#0077A6",
                fontSize: "16px",
                fontWeight: "600",
                padding: "6px",
                borderRadius: "6px",
              }}
            >
              ID: #{user?.id}
            </span>
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
                  className="w-100"
                  // maxLength={10}
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
                <span className="label">Tagline</span>
                <CommonInput
                  placeholder="Enter Tagline"
                  value={profileData.tagline}
                  onChange={(val) => handleChange("tagline", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">About</span>
                <CommonInput
                  category="textarea"
                  maxLength={1000}
                  placeholder="Enter Description"
                  value={profileData.description}
                  onChange={(val) => handleChange("description", val)}
                />
              </section>

              <section className="field-container">
                <span className="label">Languages</span>
                {profileData.languages.map((langItem, index) => (
                  <Space
                    key={index}
                    style={{ display: "flex", marginBottom: "10px" }}
                    align="baseline"
                  >
                    <div style={{ flex: 1 }}>
                      <CommonInput
                        placeholder="Enter Language"
                        value={langItem.language}
                        onChange={(val) =>
                          handleLanguageChange(index, "language", val)
                        }
                      />
                    </div>
                    <div style={{ width: "150px" }}>
                      <Select
                        style={{ width: "100%" }}
                        value={langItem.proficiency}
                        onChange={(val) =>
                          handleLanguageChange(index, "proficiency", val)
                        }
                        options={proficiencyLevels}
                      />
                    </div>
                    {profileData.languages.length > 1 && (
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => removeLanguage(index)}
                        danger
                      />
                    )}
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={addLanguage}
                  icon={<PlusOutlined />}
                  style={{ width: "100%", marginTop: "8px" }}
                >
                  Add Language
                </Button>
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </>
  );
};

export default RecruiterProfileHeader;
