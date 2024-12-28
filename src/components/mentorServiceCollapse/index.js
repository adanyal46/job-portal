import { Collapse, Checkbox } from "antd";
import { ChevronUpIcon } from "../../assets/svg";

import "./styles.scss";
import CustomButton from "../customButton";

const onChange = (checkedValues) => {};

const MentorServiceCollapse = (props) => {
  const { handleClick, services, isStarted = true } = props;

  // Create items for Collapse
  const items =
    services &&
    Array.isArray(services) &&
    services.length > 0 &&
    services?.map((service) => ({
      key: service.id,
      label: (
        <div
          style={{
            width: "100%",
            maxWidth: "180px",
            display: "flex",
          }}
        >
          <p className="header-text">
            {`${
              service?.name.charAt(0).toUpperCase() + service?.name.slice(1)
            } `}
            <strong>{`$${service?.pricing}`}</strong>
          </p>
          <Checkbox value={service?.id?.toString()}></Checkbox>
        </div>
      ),
      children: (
        <>
          <p>{service.description}</p>

          <CustomButton
            category="primary"
            name="Let's Get Started"
            handleClick={() => {
              if (isStarted) {
                handleClick(service.id);
                return;
              }
            }}
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
