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
import { Button, Typography } from "antd";
import MentorProfileHeader from "../mentorProfileHeader";
import { useOutletContext } from "react-router-dom";
import MentorVideoContainer from "../MentorVideoContainer";
import CommonHeading from "../commonHeading";
import MentorServiceList from "./MentorServiceList";

const MentorProfile = () => {
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
    <div className="mentor-profile-container">
      {/* Main profile section */}
      <div className="mentor-main-section">
        <Typography.Title level={3} className="profile-title">
          My Profile
        </Typography.Title>

        <MentorProfileHeader
          user={user}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          setShowEducationModal={setShowEducationModal}
          setShowCertificationModal={setShowCertificationModal}
        />

        <div className="skills-container">
          <p className="skill-item">
            <span className="skill-icon">
              <MentorTranslateIcon />
            </span>
            I can Speak&nbsp;
            <strong style={{ display: "flex", gap: "10px" }}>
              {displayLanguages()}
            </strong>
            &nbsp;
          </p>

          {services && Array.isArray(services) && services.length > 0 && (
            <p className="skill-item">
              <span className="skill-icon">
                <MentorBriefcaseIcon />
              </span>
              I can help you&nbsp;&nbsp;
              <>
                {serviceNames?.map((name) => (
                  <strong key={name}>{name}, </strong>
                ))}
              </>
              and more
            </p>
          )}
        </div>

        <hr className="section-divider" />

        <div className="about-section">
          <CommonHeading heading="About" />
          <p className="section-content">{profile?.about ?? "-"}</p>
        </div>

        <hr className="section-divider" />

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
      </div>

      {/* Services and video section */}
      <div className="mentor-side-section">
        <MentorVideoContainer
          mentorvideolink={profile?.mentorvideolink}
          canUpload={true}
          user={user}
        />
        <div className="mentor-services-section">
          <div className="services-header">
            <h6 className="services-title">
              <BriefcaseIcon /> Services
            </h6>
            <Button
              style={{
                color: "#52595C",
                fontSize: "14px",
                fontWeight: 600,
                borderColor: "#AEACB4",
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
          </div>

          <p className="services-info">
            <InfoIcon /> Please click on the checkboxes to select a service
          </p>
          <MentorServiceList
            services={services}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mentorId={user?.id}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
