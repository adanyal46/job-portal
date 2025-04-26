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
import { Typography } from "antd";
import { useOutletContext } from "react-router-dom";
import RecruiterProfileHeader from "../../components/recruiterProfileHeader";
import RecruiterVideoContainer from "../../components/RecruiterVideoContainer";
import MentorProfileService from "../../components/mentorProfileService";
import CustomButton from "../../components/customButton";
import MentorServiceList from "../../components/mentorProfile/MentorServiceList";
import { Button } from "antd/es/radio";

const RecruiterProfile = () => {
  const user = useOutletContext();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showEmployementModal, setShowEmployementModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  const displayLanguages = () => {
    if (!profile?.language) return "N/A";

    try {
      let languages = [];
      try {
        languages = JSON.parse(profile.language);
      } catch {
        // If not valid JSON, try to parse from string format
        languages = profile.language.split(",").map((lang) => {
          const parts = lang.trim().split("-");
          return {
            language: parts[0]?.trim() || "",
            proficiency: parts[1]?.trim() || "conversational",
          };
        });
      }

      if (!Array.isArray(languages)) {
        languages = [
          { language: profile.language, proficiency: "conversational" },
        ];
      }

      return languages.map((lang, index) => (
        <div key={index}>
          {lang.language} - {lang.proficiency}
        </div>
      ));
    } catch {
      return profile.language || "N/A";
    }
  };
  return (
    <section className="main-layout-container">
      <section className="profile-main-wrapper" style={{ overflow: "auto" }}>
        <Typography.Title level={3} style={{ marginBottom: "0px" }}>
          My Profile
        </Typography.Title>
        <RecruiterProfileHeader
          user={user}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          setShowEducationModal={setShowEducationModal}
          setShowCertificationModal={setShowCertificationModal}
        />

        <article className="I-can-do-container">
          <p className="i-can-do-item" style={{ display: "flex" }}>
            <span
              style={{ position: "relative", top: "7px", marginRight: "10px" }}
            >
              <MentorTranslateIcon />
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              I can Speak{" "}
              <strong style={{ display: "flex", gap: "10px" }}>
                {displayLanguages()}
              </strong>{" "}
            </div>
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

        <Certifications certificates={certificates} profile={profile} />
      </section>

      <section className="mentor-actions-container">
        <RecruiterVideoContainer
          mentorvideolink={profile?.mentorvideolink}
          canUpload={true}
          user={user}
        />
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
            <Button
              style={{
                color: "#52595C",
                fontSize: "14px",
                fontWeight: 600,
                borderColor: "#AEACB4",
                borderRadius: "8px",
              }}
              onClick={showModal}
            >
              Add{" "}
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3712_220352)">
                  <path
                    d="M2.8125 9.5H15.1875"
                    stroke="#52595C"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 3.3125V15.6875"
                    stroke="#52595C"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3712_220352">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </section>

          <p className="info-content" style={{ marginTop: "10px" }}>
            <InfoIcon /> Please click on the checkboxes to select a service
          </p>

          <MentorServiceList
            services={services}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mentorId={user?.id}
            user={user}
          />
        </section>
      </section>
    </section>
  );
};

export default RecruiterProfile;
