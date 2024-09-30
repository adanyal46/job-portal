import { Collapse, Checkbox } from "antd";
import { ChevronUpIcon } from "../../assets/svg";

import "./styles.scss";
import CustomButton from "../customButton";

const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};

const MentorServiceCollapse = (props) => {
  const { handleClick, services } = props;

  // Create items for Collapse
  const items = services.map((service) => ({
    key: service.id,
    label: (
      <>
        <p className="header-text">{`${
          service.name.charAt(0).toUpperCase() + service.name.slice(1)
        } $${service.pricing}`}</p>
        <Checkbox value={service.id.toString()}></Checkbox>
      </>
    ),
    children: (
      <>
        <p>{service.description}</p>
        <CustomButton
          category="primary"
          name="Let's Get Started"
          handleClick={() => handleClick(service.id)}
        />
      </>
    ),
  }));

  return (
    <Checkbox.Group onChange={onChange} className="custom-checkbox-group">
      <Collapse
        accordion
        collapsible="icon"
        ghost
        className="custom-mentor-collapse"
        expandIcon={() => (
          <p>
            Learn More <ChevronUpIcon />
          </p>
        )}
        expandIconPosition="end"
        items={items} // Pass the items here
      />
    </Checkbox.Group>
  );
};

export default MentorServiceCollapse;
