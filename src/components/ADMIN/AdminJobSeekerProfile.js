import ProfileHeader from "../../components/profileHeader";
import EducationAndCertification from "../../components/educationAndCertification";
import EmploymentAndExperience from "../../components/employmentAndExperience";
import Location from "../../components/location";
import DocumentAndLink from "../../components/documentAndLink";
import Certifications from "../../components/certifications";

import { useEffect, useState } from "react";
import { Card, message, Typography } from "antd";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const AdminJobSeekerProfile = () => {
  const { id } = useParams();
  //   admin/jsbyid
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showEmployementModal, setShowEmployementModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile(id);
  }, [id]);
  const education = user?.Education;
  const certificates = user?.Certificate;
  const location = user?.Location;
  const document = user?.Documents;
  const employmentHistorys = user?.EmpolymentHistory;
  const profile = user?.Profile?.[0];

  const fetchProfile = async (id) => {
    try {
      const response = await axiosInstance.get("/admin/jsbyid/" + id);
      setUser(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };
  return (
    <Card style={{ maxWidth: "1100px", marginInline: "auto" }}>
      <Typography.Title level={3}>My Profile</Typography.Title>

      <section className="profile-main-wrapper">
        <ProfileHeader
          user={user}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          setShowEducationModal={setShowEducationModal}
          setShowCertificationModal={setShowCertificationModal}
          action={false}
        />

        <EducationAndCertification
          education={education}
          showEducationModal={showEducationModal}
          setShowEducationModal={setShowEducationModal}
          showCertificationModal={showCertificationModal}
          setShowCertificationModal={setShowCertificationModal}
          certificates={certificates}
          action={false}
        />

        <EmploymentAndExperience
          showEmployementModal={showEmployementModal}
          setShowEmployementModal={setShowEmployementModal}
          employmentHistorys={employmentHistorys}
          action={false}
        />

        <Location
          showLocationModal={showLocationModal}
          setShowLocationModal={setShowLocationModal}
          location={location}
          btnShow={false}
        />

        <DocumentAndLink
          showDocumentsModal={showDocumentsModal}
          setShowDocumentsModal={setShowDocumentsModal}
          document={document}
          user={user}
          action={false}
        />

        <Certifications certificates={certificates} profile={profile} />
      </section>
    </Card>
  );
};

export default AdminJobSeekerProfile;
