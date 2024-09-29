import ProfileHeader from "../../components/profileHeader";
import EducationAndCertification from "../../components/educationAndCertification";
import EmploymentAndExperience from "../../components/employmentAndExperience";
import Location from "../../components/location";
import DocumentAndLink from "../../components/documentAndLink";
import Certifications from "../../components/certifications";

import "./styles.scss";
import { useState } from "react";

const MyProfile = ({ user }) => {
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
      <h3 className="layout-main-heading">My Profile</h3>

      <section className="profile-main-wrapper">
        <ProfileHeader
          user={user}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          setShowEducationModal={setShowEducationModal}
          setShowCertificationModal={setShowCertificationModal}
        />

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
    </section>
  );
};

export default MyProfile;
