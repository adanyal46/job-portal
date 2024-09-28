import { act, useState } from "react";

import CommonHeading from "../commonHeading";
import CustomButton from "../customButton";
import { AddCircleIcon } from "../../assets/svg";
import "./styles.scss";
import {
  deleteCertificate,
  deleteEducation,
  profileCertificate,
  profileEducation,
} from "../../features/profile/profileSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import dayjs from "dayjs";
import "dayjs/plugin/advancedFormat";
import Certifications from "./Certificate";
import Education from "./Education";
import EducationModal from "./EducationModal";
import CertificateModal from "./CertificateModal";

const EducationAndCertification = ({
  showEducationModal,
  setShowEducationModal,
  showCertificationModal,
  setShowCertificationModal,
  education,
  certificates,
}) => {
  const dispatch = useDispatch();
  const [educationData, setEducationData] = useState({
    degree: "",
    institution: "",
    description: "",
    from: null,
    to: null,
  });
  const [certificateData, setCertificateData] = useState({
    certName: "",
    orgName: "",
    description: "",
    from: null,
    to: null,
  });
  const [educationId, setEducationId] = useState(null);
  const [certificateId, setCertificateId] = useState(null);

  const handleShowEducationModal = () => {
    setEducationId(null);
    setEducationData({
      degree: "",
      institution: "",
      description: "",
      from: null,
      to: null,
    });
    setShowEducationModal(() => true);
  };

  const handleCloseEducationModal = () => {
    setShowEducationModal(() => false);
    setEducationData({
      degree: "",
      institution: "",
      description: "",
      from: null,
      to: null,
    });
    setEducationId(null);
  };

  const handleShowCertificationModal = () => {
    setShowCertificationModal(true);
  };

  const handleCloseCertificationModal = () => {
    setShowCertificationModal(() => false);
    setCertificateData({
      certName: "",
      orgName: "",
      description: "",
      from: null,
      to: null,
    });
    setCertificateId(null);
  };

  const handleChange = (name, value) => {
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActionMenu = (action, id) => {
    if (action === "edit") {
      const data = education.find((item) => item.id === id);
      setEducationId(data.id);
      setEducationData({
        degree: data.degreName,
        institution: data.universityName,
        description: data.description,
        from: dayjs(data.startFrom),
        to: dayjs(data.endIn),
      });
      if (data) {
        setShowEducationModal(true);
      }
    } else {
      console.log(action, id);
    }
  };
  const confirmDelete = async (id) => {
    const response = await dispatch(deleteEducation({ educationId: id }));
    console.log(response);
  };

  const handleEducationSubmit = () => {
    if (
      !educationData.degree ||
      !educationData.description ||
      !educationData.institution ||
      !educationData.from ||
      !educationData.to
    ) {
      message.open({
        type: "error",
        content: "Please fill all fields.",
      });
      return;
    }
    let formData = {
      ...educationData,
      from: new Date(educationData.from)
        .toLocaleDateString()
        .replace(/\//g, "-"),
      to: new Date(educationData.to).toLocaleDateString().replace(/\//g, "-"),
    };

    if (formData.from === formData.to) {
      message.open({
        type: "error",
        content: "Start date and end date cannot be the same.",
      });
      return; // Exit the function early to prevent submission
    }

    if (educationId) {
      dispatch(profileEducation({ ...formData, educationId }));
    } else {
      dispatch(profileEducation(formData));
    }
  };

  const handleChangeCer = (name, value) => {
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCertificateSubmit = async () => {
    if (
      !certificateData.certName ||
      !certificateData.orgName ||
      !certificateData.description ||
      !certificateData.from ||
      !certificateData.to
    ) {
      message.open({
        type: "error",
        content: "Please fill all fields.",
      });
      return;
    }
    let formData = {
      ...certificateData,
      from: new Date(certificateData.from)
        .toLocaleDateString()
        .replace(/\//g, "-"),
      to: new Date(certificateData.to).toLocaleDateString().replace(/\//g, "-"),
    };
    if (formData.from === formData.to) {
      message.open({
        type: "error",
        content: "Start date and end date cannot be the same.",
      });
      return; // Exit the function early to prevent submission
    }
    let response;

    if (certificateId) {
      response = dispatch(profileCertificate({ ...formData, certificateId }));
    } else {
      response = dispatch(profileCertificate(formData));
    }
    if (response.success) {
      handleCloseCertificationModal();
    }
  };

  const handleCerAction = (action, id) => {
    if (action === "edit") {
      const data = certificates.find((item) => item.id === id);
      setCertificateId(data.id);
      setCertificateData({
        certName: data.certName,
        orgName: data.orgName,
        description: data.description,
        from: dayjs(data.startedOn),
        to: dayjs(data.completedOn),
      });
      if (data) {
        setShowCertificationModal(true);
      }
    } else {
    }
  };
  const onDeleteCertificate = async (id) => {
    try {
      const response = await dispatch(
        deleteCertificate({ certificateId: id || certificateData.id })
      );
      console.log(response);
      // Close modal or update state based on response if needed
    } catch (error) {
      console.error("Failed to delete certificate:", error);
    }
  };

  return (
    <section className="education-and-certifications-wrapper">
      <CommonHeading heading="Education and Certifications" />

      <section className="education-wrapper">
        {education?.map((item) => (
          <Education
            degreName={item.degreName}
            endIn={item.endIn}
            startFrom={item.startFrom}
            universityName={item.universityName}
            key={item.id}
            id={item.id}
            handleActionMenu={handleActionMenu}
            confirmDelete={confirmDelete}
          />
        ))}
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowEducationModal}
      />

      <section className="education-wrapper">
        {certificates?.map((certificate) => (
          <Certifications
            certificate={certificate}
            key={certificate?.id}
            onDeleteCertificate={onDeleteCertificate}
            handleCerAction={handleCerAction}
          />
        ))}
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowCertificationModal}
      />

      {showEducationModal && (
        <EducationModal
          educationData={educationData}
          handleChange={handleChange}
          handleCloseEducationModal={handleCloseEducationModal}
          handleEducationSubmit={handleEducationSubmit}
          showEducationModal={showEducationModal}
        />
      )}

      {showCertificationModal && (
        <CertificateModal
          certificateData={certificateData}
          handleCertificateSubmit={handleCertificateSubmit}
          handleChangeCer={handleChangeCer}
          handleCloseCertificationModal={handleCloseCertificationModal}
          showCertificationModal={showCertificationModal}
          handleDelete={onDeleteCertificate}
        />
      )}
    </section>
  );
};

export default EducationAndCertification;
