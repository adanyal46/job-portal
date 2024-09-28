import { useState } from "react";

import CommonHeading from "../commonHeading";
import CustomButton from "../customButton";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";

import {
  DetailsIcon,
  CertificationsIcon,
  AddCircleIcon,
} from "../../assets/svg";

import "./styles.scss";
import { useDispatch } from "react-redux";
import { profileEmploymentHistory } from "../../features/profile/profileSlice";
import { message, Dropdown, Typography } from "antd";
import dayjs from "dayjs";

const items = [
  {
    key: "edit",
    label: <Typography.Text>Edit</Typography.Text>,
  },
  {
    key: "delete",
    label: <Typography.Text type="danger">Delete</Typography.Text>,
  },
];

const Experience = ({ item, handleActionMenu }) => {
  const handleClick = (event) => {
    handleActionMenu(event.key, item?.id);
  };
  return (
    <section className="experience-list-container">
      <section className="experience-icon">
        <CertificationsIcon />
      </section>

      <section className="experience-details-wrapper">
        <article className="experience-designation">
          <p className="position-name">{item?.jobTitle ?? "N/A"}</p>
          <Dropdown
            menu={{
              items,
              onClick: (event) => handleClick(event, item?.id),
            }}
            trigger={["click"]}
            placement="bottom"
            overlayStyle={{ width: "150px" }}
          >
            <DetailsIcon />
          </Dropdown>
        </article>

        <article className="company-detail">
          <p className="company-name">{item?.company ?? "N/A"}</p>
          <p className="company-duration">
            {new Date(item?.startedOn).getFullYear()} -
            {new Date(item?.endOn).getFullYear()}
          </p>
        </article>

        <ul className="experience-detail">
          <li className="tasks-performed">{item?.description ?? "N/A"}</li>
        </ul>
      </section>
    </section>
  );
};

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
      handleCloseEmployementModal();
    }
  };

  const handleActionMenu = (action, id) => {
    console.log(action);
    if (action === "edit") {
      const data = employmentHistorys.find((emp) => emp.id === id);
      console.log(data);
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

  return (
    <section className="employment-and-experience-wrapper">
      <CommonHeading heading="Employement and Experience History" />

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
        <CommonModal
          title="Employment and Experience History"
          description="Enter your Employment and Experience History Information"
          isModalOpen={showEmployementModal}
          handleClose={handleCloseEmployementModal}
          handleOk={handleSubmit}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">Company</span>
              <CommonInput
                placeholder="Enter Company Name"
                value={employData.company}
                onChange={(val) => handleChange("company", val)}
              />
            </section>

            <section className="field-container">
              <span className="label">Job Title</span>
              <CommonInput
                placeholder="Enter Job Title"
                value={employData.jobTitle}
                onChange={(val) => handleChange("jobTitle", val)}
              />
            </section>

            <section className="field-container">
              <span className="label">Description</span>
              <CommonInput
                category="textarea"
                placeholder="Enter Description"
                value={employData.description}
                onChange={(val) => handleChange("description", val)}
              />
            </section>

            <section className="range-field-wrapper">
              <section className="range-field-container">
                <span className="label">From</span>
                <CommonInput
                  category="date"
                  placeholder="Date Range"
                  value={employData.startedOn}
                  onChange={(val) => handleChange("startedOn", val)}
                />
              </section>

              <section className="range-field-container">
                <span className="label">To</span>
                <CommonInput
                  category="date"
                  placeholder="Date Range"
                  value={employData.endOn}
                  onChange={(val) => handleChange("endOn", val)}
                />
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default EmploymentAndExperience;
