import EducationAndCertification from "../../components/educationAndCertification";
import EmploymentAndExperience from "../../components/employmentAndExperience";
import Location from "../../components/location";
import DocumentAndLink from "../../components/documentAndLink";
import Certifications from "../../components/certifications";
import {
  BriefcaseIcon,
  InfoIcon,
  MentorBriefcaseIcon,
  MentorTranslateIcon,
} from "../../assets/svg";
import { useState } from "react";
import "./styles.scss";
import { Typography, Upload } from "antd";
import MentorProfileHeader from "../mentorProfileHeader";
import MentorProfileService from "../mentorProfileService";
import CustomButton from "../customButton";
import { useOutletContext } from "react-router-dom";
import CommonModal from "../../components/commonModal"; // Import the modal component
import MentorVideoContainer from "../MentorVideoContainer";

const MentorProfile = () => {
  const user = useOutletContext();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showEmployementModal, setShowEmployementModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  const education = user?.Education;
  const certificates = user?.Certificate;
  const location = user?.Location;
  const document = user?.Documents;
  const employmentHistorys = user?.EmpolymentHistory;
  const services = user?.services;
  const profile = user?.Profile?.[0];
  const serviceNames = services?.map((item) => item.name);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleUploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("video", file); // Append the video file

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data); // Handle the response as needed
      // Close the modal after successful upload
      setIsUploadModalVisible(false);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <section className="main-layout-container">
      <section className="profile-main-wrapper" style={{ overflow: "auto" }}>
        <Typography.Title level={3} style={{ marginBottom: "0px" }}>
          My Profile
        </Typography.Title>
        <MentorProfileHeader
          user={user}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          setShowEducationModal={setShowEducationModal}
          setShowCertificationModal={setShowCertificationModal}
        />

        <article className="I-can-do-container">
          <p className="i-can-do-item">
            <span
              style={{ position: "relative", top: "7px", marginRight: "10px" }}
            >
              <MentorTranslateIcon />
            </span>
            I can Speak <strong>{profile?.language ?? "English"}</strong>{" "}
            (Conversational)
          </p>

          {services && Array.isArray(services) && services.length > 0 && (
            <p className="i-can-do-item">
              <span
                style={{
                  position: "relative",
                  top: "7px",
                  marginRight: "10px",
                }}
              >
                <MentorBriefcaseIcon />
              </span>
              I can help you{" "}
              <>
                {serviceNames?.map((name) => (
                  <strong key={name}>{name},</strong>
                ))}
              </>
              and more
            </p>
          )}
        </article>

        <hr className="mentor-detail-divider" />

        <article className="about-mentor-container">
          <h4 className="section-heading">About</h4>
          <p className="section-content">{profile?.about ?? "-"}</p>
        </article>

        <hr className="mentor-detail-divider" />

        <EducationAndCertification
          education={education}
          showEducationModal={showEducationModal}
          setShowEducationModal={setShowEducationModal}
          showCertificationModal={showCertificationModal}
          setShowCertificationModal={setShowCertificationModal}
          certificates={certificates}
        />

        <EmploymentAndExperience
          showEmployementModal={showEmployementModal}
          setShowEmployementModal={setShowEmployementModal}
          employmentHistorys={employmentHistorys}
        />

        <Location
          showLocationModal={showLocationModal}
          setShowLocationModal={setShowLocationModal}
          location={location}
        />

        <DocumentAndLink
          showDocumentsModal={showDocumentsModal}
          setShowDocumentsModal={setShowDocumentsModal}
          document={document}
        />

        <Certifications certificates={certificates} />
      </section>

      <section className="mentor-actions-container">
        <MentorVideoContainer />
        {/* <article className="mentor-video-container">
          <p>Olivia Introductory video clip</p>
          <p>Get to know Olivia in a better way</p>
          <figure>
            <img
              src="/images/mentors/mentor-1.png"
              alt="mentor icon"
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderRadius: "20px",
                marginBlock: "20px",
              }}
            />
          </figure>
         
        </article> */}
        <section className="mentor-get-started-container">
          <section className="mentor-services-wrapper">
            <h6 className="mentor-services">
              <BriefcaseIcon /> Services
            </h6>
            <CustomButton
              category="primary"
              name="Add Service"
              handleClick={showModal}
            />
          </section>

          <p className="info-content" style={{ marginTop: "10px" }}>
            <InfoIcon /> Please click on the checkboxes to select a service
          </p>

          <MentorProfileService
            services={services}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mentorId={user?.id}
          />
        </section>
      </section>

      {/* Video Upload Modal */}
      <CommonModal
        title="Upload Video"
        isModalOpen={isUploadModalVisible}
        handleClose={() => setIsUploadModalVisible(false)}
        handleOk={() => {}} // Optional: handle the Ok button action
      >
        <Upload
          accept="video/*"
          showUploadList={false}
          beforeUpload={(file) => {
            handleUploadVideo(file); // Call the upload function
            return false; // Prevent automatic upload
          }}
        >
          <CustomButton category="primary" name="Select Video" />
        </Upload>
      </CommonModal>
    </section>
  );
};

export default MentorProfile;
