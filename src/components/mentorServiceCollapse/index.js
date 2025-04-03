import { Collapse, Checkbox, Grid } from "antd";
import { ChevronUpIcon } from "../../assets/svg";

import "./styles.scss";
import CustomButton from "../customButton";

const { useBreakpoint } = Grid;

const onChange = (checkedValues) => {};

const MentorServiceCollapse = (props) => {
  const { handleClick, services, isStarted = true } = props;
  const screens = useBreakpoint();

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
            maxWidth: screens.xs ? "100%" : "180px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: screens.xs ? "wrap" : "nowrap",
          }}
        >
          <p
            className="header-text"
            style={{
              fontSize: screens.xs ? "14px" : "16px",
              marginRight: screens.xs ? "0" : "10px",
              marginBottom: screens.xs ? "4px" : "0",
              flex: screens.xs ? "1 0 70%" : "1",
            }}
          >
            {`${
              service?.name.charAt(0).toUpperCase() + service?.name.slice(1)
            } `}
            <strong>{`$${service?.pricing}`}</strong>
          </p>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox value={service?.id?.toString()}></Checkbox>
          </div>
        </div>
      ),
      children: (
        <div style={{ padding: screens.xs ? "8px 0" : "16px 0" }}>
          <p
            style={{
              fontSize: screens.xs ? "14px" : "16px",
              marginBottom: "16px",
            }}
          >
            {service.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: screens.xs ? "center" : "flex-start",
            }}
          >
            <CustomButton
              category="primary"
              name="Let's Get Started"
              handleClick={() => {
                if (isStarted) {
                  handleClick(service.id);
                  return;
                }
              }}
              style={{
                fontSize: screens.xs ? "14px" : "16px",
                padding: screens.xs ? "4px 12px" : "6px 16px",
              }}
            />
          </div>
        </div>
      ),
    }));

  return (
    <Checkbox.Group
      onChange={onChange}
      className="custom-checkbox-group"
      style={{ width: "100%" }}
    >
      <Collapse
        accordion
        collapsible="icon"
        ghost
        className="custom-mentor-collapse"
        expandIcon={() => (
          <p
            style={{
              fontSize: screens.xs ? "13px" : "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              width: "100%",
            }}
          >
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
