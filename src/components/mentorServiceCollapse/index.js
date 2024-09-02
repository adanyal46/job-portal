import { Collapse, Checkbox } from "antd";
import { ChevronUpIcon } from "../../assets/svg";

import "./styles.scss";
import CustomButton from "../customButton";

const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const MentorServiceCollapse = (props) => {
  const { handleClick } = props;

  return (
    <Checkbox.Group
      //   style={{
      //     width: "100%",
      //   }}
      onChange={onChange}
      className="custom-checkbox-group"
    >
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
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: (
              <>
                <p className="header-text">Resume+LinkedIn Review $80</p>
                <Checkbox value="A"></Checkbox>
              </>
            ),
            children: (
              <>
                <p>{text}</p>
                <CustomButton
                  category="primary"
                  name="Let's Get Started"
                  handleClick={handleClick}
                />
              </>
            ),
          },
          {
            key: "2",
            label: (
              <>
                <p className="header-text">30-Minute Career Q&A $80</p>
                <Checkbox value="B"></Checkbox>
              </>
            ),
            children: (
              <>
                <p>{text}</p>
                <CustomButton
                  category="primary"
                  name="Let's Get Started"
                  handleClick={handleClick}
                />
              </>
            ),
          },
          {
            key: "3",
            label: (
              <>
                <p className="header-text">Job Search Strategy $80</p>
                <Checkbox value="C"></Checkbox>
              </>
            ),
            children: (
              <>
                <p>{text}</p>
                <CustomButton
                  category="primary"
                  name="Let's Get Started"
                  handleClick={handleClick}
                />
              </>
            ),
          },
          {
            key: "4",
            label: (
              <>
                <p className="header-text">Resume Review $80</p>
                <Checkbox value="D"></Checkbox>
              </>
            ),
            children: (
              <>
                <p>{text}</p>
                <CustomButton
                  category="primary"
                  name="Let's Get Started"
                  handleClick={handleClick}
                />
              </>
            ),
          },
        ]}
      />
    </Checkbox.Group>
  );
};

export default MentorServiceCollapse;
