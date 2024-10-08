import ProfileHeader from "../../components/profileHeader";
import EducationAndCertification from "../../components/educationAndCertification";
import EmploymentAndExperience from "../../components/employmentAndExperience";
import Location from "../../components/location";
import DocumentAndLink from "../../components/documentAndLink";
import Certifications from "../../components/certifications";
import MentorServiceCollapse from "../mentorServiceCollapse";
import { BriefcaseIcon, InfoIcon, MentorBriefcaseIcon, MentorTranslateIcon } from "../../assets/svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { Typography } from "antd";
import MentorProfileHeader from "../mentorProfileHeader";

const MentorProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showEmployementModal, setShowEmployementModal] = useState(false);

  const education = user?.Education;
  const certificates = user?.Certificate;
  const location = user?.Location;
  const document = user?.Documents;
  const employmentHistorys = user?.EmpolymentHistory;

  return (
    <section className="main-layout-container">
      <section className="profile-main-wrapper" style={{ minHeight: "auto", maxHeight: "auto", overflow: "auto" }}>
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
            <span style={{ position: "relative", top: "7px", marginRight: "10px" }}>
              <MentorTranslateIcon />
            </span>
            I can Speak <strong>English</strong> (Conversational)
          </p>

          <p className="i-can-do-item">
            <span style={{ position: "relative", top: "7px", marginRight: "10px" }}>
              <MentorBriefcaseIcon />
            </span>
            I can help you <strong>Interview prep, Resume Review, Job Search Strategy,</strong> and more
          </p>
        </article>

        <hr className="mentor-detail-divider" />

        <article className="about-mentor-container">
          <h4 className="section-heading">About</h4>
          <p className="section-content">The power of desing</p>
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

        <Location showLocationModal={showLocationModal} setShowLocationModal={setShowLocationModal} location={location} />

        <DocumentAndLink showDocumentsModal={showDocumentsModal} setShowDocumentsModal={setShowDocumentsModal} document={document} />

        <Certifications certificates={certificates} />
      </section>

      <section className="mentor-actions-container">
        <article className="mentor-video-container">
          <p>Olivia Introductory video clip</p>
          <p>Get to know Olivia in a better way</p>
          <figure>
            <img
              src="/images/mentors/mentor-1.png"
              alt="mentor icon"
              style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "20px", marginBlock: "20px" }}
            />
          </figure>
        </article>
        <section className="mentor-get-started-container">
          <section className="mentor-services-wrapper">
            <h6 className="mentor-services">
              <BriefcaseIcon /> Services
            </h6>
          </section>

          <p className="info-content">
            <InfoIcon /> Please click on the checkboxes to select a service
          </p>

          <MentorServiceCollapse />
        </section>
      </section>
    </section>
  );
};

export default MentorProfile;
