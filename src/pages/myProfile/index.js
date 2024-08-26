import ProfileHeader from "../../components/profileHeader";
import EducationAndCertification from "../../components/educationAndCertification";
import EmploymentAndExperience from "../../components/employmentAndExperience";
import Location from "../../components/location";
import DocumentAndLink from "../../components/documentAndLink";
import Certifications from "../../components/certifications";

import "./styles.scss";

const MyProfile = () => (
  <section className="main-layout-container">
    <h3 className="layout-main-heading">My Profile</h3>

    <section className="profile-main-wrapper">
      <ProfileHeader />

      <EducationAndCertification />

      <EmploymentAndExperience />

      <Location />

      <DocumentAndLink />

      <Certifications />
    </section>
  </section>
);

export default MyProfile;
