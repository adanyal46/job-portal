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
import MentorProfileHeader from "../mentorProfileHeader";
import MentorProfileService from "../mentorProfileService";
import CustomButton from "../customButton";
import { useOutletContext } from "react-router-dom";
import MentorVideoContainer from "../MentorVideoContainer";
import CommonHeading from "../commonHeading";

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
            I can Speak&nbsp;&nbsp;
            <strong>{profile?.language ?? "English"}</strong>&nbsp;
            (Conversational)
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
        />
        <div className="mentor-services-section">
          <div className="services-header">
            <h6 className="services-title">
              <BriefcaseIcon /> Services
            </h6>
            <CustomButton
              category="primary"
              name="Add Service"
              handleClick={showModal}
            />
          </div>

          <p className="services-info">
            <InfoIcon /> Please click on the checkboxes to select a service
          </p>

          <MentorProfileService
            services={services}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mentorId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
