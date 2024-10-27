import React, { useState } from "react";
import { Collapse, Checkbox, message } from "antd";
import { ChevronUpIcon } from "../../assets/svg";
import "./styles.scss";
import CustomButton from "../../components/customButton";
import { useHistory, useNavigate } from "react-router-dom"; // Import useHistory for navigation

const ServiceCollapse = (props) => {
  const { handleClick, services, recruiterId } = props;
  const [checkedValues, setCheckedValues] = useState([]); // State to manage selected services
  const navigate = useNavigate(); // Hook for navigation

  const onChange = (checkedValues) => {
    setCheckedValues(checkedValues); // Update state with selected values
  };

  const handleButtonClick = () => {
    if (checkedValues.length === 0) {
      message.error("Please select at least one service.");
    } else {
      const selectedServices = services.filter((service) =>
        checkedValues.includes(service.id.toString())
      );
      navigate("/employer/job-request", {
        state: { services: selectedServices, recruiterId: recruiterId },
      });
    }
  };

  // Create items for Collapse
  const items =
    services &&
    Array.isArray(services) &&
    services.length > 0 &&
    services.map((service) => ({
      key: service.id,
      label: (
        <>
          <p className="header-text">{`${
            service?.name.charAt(0).toUpperCase() + service?.name.slice(1)
          } `}</p>
          <strong>${service?.pricing}</strong>
          <Checkbox value={service?.id?.toString()}></Checkbox>
        </>
      ),
      children: <p>{service.description}</p>,
    }));

  return (
    <Checkbox.Group onChange={onChange} className="custom-checkbox-group">
      <Collapse
        accordion
        collapsible="icon"
        ghost
        className="custom-mentor-collapse"
        expandIcon={() => (
          <p style={{ width: "100px" }}>
            Learn More <ChevronUpIcon />
          </p>
        )}
        expandIconPosition="end"
        items={items} // Pass the items here
      />
      <CustomButton
        style={{ marginTop: "20px" }}
        category="primary"
        name="Let's Get Started"
        handleClick={handleButtonClick}
        block
      />
    </Checkbox.Group>
  );
};

export default ServiceCollapse;
