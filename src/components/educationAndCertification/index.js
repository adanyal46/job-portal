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
  action = true,
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
      if (!data) {
        message.error("Education data not found for ID:", id);
        return; // Exit if no data found
      }
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
    }
  };
  const confirmDelete = async (id) => {
    if (!educationId) {
      message.error("Education ID is undefined when attempting to delete.");
      return; // Exit if educationId is not set
    }
    const response = await dispatch(
      deleteEducation({ educationId: id })
    ).unwrap();
    if (response.success) {
      message.open({
        type: "success",
        content: "Education Deleted Successfully!",
      });
      return;
    }
  };

  const handleEducationSubmit = async () => {
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
    let response;
    if (educationId) {
      response = await dispatch(
        profileEducation({ ...formData, educationId })
      ).unwrap();
    } else {
      response = await dispatch(profileEducation(formData)).unwrap();
    }

    if (response.success) {
      message.open({
        type: "success",
        content: educationId
          ? "Education Update successfully!"
          : "Education Save successfully!",
      });
      handleCloseEducationModal();
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
      response = await dispatch(
        profileCertificate({ ...formData, certificateId })
      ).unwrap();
    } else {
      response = await dispatch(profileCertificate(formData)).unwrap();
    }
    if (response.success) {
      message.open({
        type: "success",
        content: certificateId
          ? "Certificate Update successfully!"
          : "Certificate Save successfully!",
      });
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
      ).unwrap();
      if (response.success) {
        message.open({
          type: "success",
          content: "Certificate Deleted Successfully!",
        });
        return;
      }
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
            action={action}
          />
        ))}
      </section>
      {action && (
        <CustomButton
          category="additional"
          name="Add"
          icon={<AddCircleIcon />}
          handleClick={handleShowEducationModal}
        />
      )}

      <section className="education-wrapper">
        {certificates?.map((certificate) => (
          <Certifications
            certificate={certificate}
            key={certificate?.id}
            handleCerAction={handleCerAction}
          />
        ))}
      </section>
      {action && (
        <CustomButton
          category="additional"
          name="Add"
          icon={<AddCircleIcon />}
          handleClick={handleShowCertificationModal}
        />
      )}
      {showEducationModal && (
        <EducationModal
          educationData={educationData}
          handleChange={handleChange}
          handleCloseEducationModal={handleCloseEducationModal}
          handleEducationSubmit={handleEducationSubmit}
          showEducationModal={showEducationModal}
          educationId={educationId}
          handleDelete={confirmDelete}
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
          certificateId={certificateId}
        />
      )}
    </section>
  );
};

export default EducationAndCertification;
