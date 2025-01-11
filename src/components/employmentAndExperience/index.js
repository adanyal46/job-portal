import { useState } from "react";
import CommonHeading from "../commonHeading";
import CustomButton from "../customButton";
import { AddCircleIcon } from "../../assets/svg";
import "./styles.scss";
import { useDispatch } from "react-redux";
import {
  deleteEmployHis,
  profileEmploymentHistory,
} from "../../features/profile/profileSlice";
import { message } from "antd";
import dayjs from "dayjs";
import Experience from "./Experience";
import EmploymentModal from "./EmploymentModal";

const EmploymentAndExperience = ({
  showEmployementModal,
  setShowEmployementModal,
  employmentHistorys,
}) => {
  const [employData, setEmployData] = useState({
    company: "",
    jobTitle: "",
    description: "",
    startedOn: "",
    endOn: "",
  });
  const [employmentId, setEmploymentId] = useState(null);
  const dispatch = useDispatch();

  const handleShowEmployementModal = () => {
    setEmploymentId(null);
    setEmployData({
      company: "",
      jobTitle: "",
      description: "",
      startedOn: "",
      endOn: "",
    });
    setShowEmployementModal(() => true);
  };

  const handleCloseEmployementModal = () => {
    setShowEmployementModal(() => false);
    setEmploymentId(null);
    setEmployData({
      company: "",
      jobTitle: "",
      description: "",
      startedOn: "",
      endOn: "",
    });
  };

  const handleChange = (name, value) => {
    setEmployData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !employData.company ||
      !employData.jobTitle ||
      !employData.description ||
      !employData.startedOn ||
      !employData.endOn
    ) {
      message.open({
        type: "error",
        content: "Please fill all field.",
      });
      return;
    }
    const response = employmentId
      ? await dispatch(
          profileEmploymentHistory({ ...employData, employmentId })
        ).unwrap()
      : await dispatch(profileEmploymentHistory(employData)).unwrap();
    if (response.success) {
      message.open({
        type: "success",
        content: employmentId
          ? "Employment history updated successfully!"
          : "New employment history added successfully!",
      });

      handleCloseEmployementModal();
    }
  };

  const handleActionMenu = (action, id) => {
    if (action === "edit") {
      const data = employmentHistorys.find((emp) => emp.id === id);
      setEmploymentId(data.id);
      setEmployData({
        company: data?.company || "",
        jobTitle: data?.jobTitle || "",
        description: data?.description || "",
        startedOn: dayjs(data?.startedOn) || "",
        endOn: dayjs(data?.endOn) || "",
      });
      if (data) {
        setShowEmployementModal(true);
      }
    }
  };

  const handleDeleteEmplyHis = async (id) => {
    try {
      const response = await dispatch(
        deleteEmployHis({ employmentId: parseInt(id) })
      ).unwrap();
      if (response.success) {
        message.open({
          type: "error",
          content: "Employment history deleted successfully!",
        });
        return;
      }
    } catch (error) {}
  };

  return (
    <section className="employment-and-experience-wrapper">
      <CommonHeading heading="Employment and Experience History" />

      <section className="experience-wrapper">
        {employmentHistorys?.map((item) => (
          <Experience
            item={item}
            key={item.id}
            handleActionMenu={handleActionMenu}
          />
        ))}
      </section>

      <CustomButton
        category="additional"
        name="Add"
        icon={<AddCircleIcon />}
        handleClick={handleShowEmployementModal}
      />

      {showEmployementModal && (
        <EmploymentModal
          employData={employData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCloseEmployementModal={handleCloseEmployementModal}
          showEmployementModal={showEmployementModal}
          employmentId={employmentId}
          handleDelete={handleDeleteEmplyHis}
        />
      )}
    </section>
  );
};

export default EmploymentAndExperience;
