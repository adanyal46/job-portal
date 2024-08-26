import { Switch, Case, Default } from "react-if";
import { Button } from "antd";

import "./styles.scss";

const CustomButton = (props) => {
  const { category, type, name, disabled, handleClick, icon, shape, classes } =
    props;

  return (
    <Switch>
      <Case condition={category === "primary"}>
        <Button
          type="primary"
          className={`common-button-styles custom-button-primary ${classes}`}
          onClick={handleClick}
        >
          {name}
        </Button>
      </Case>

      <Case condition={category === "danger"}>
        <Button
          danger
          type="text"
          className={`common-button-styles custom-button-danger ${classes}`}
        >
          {name}
        </Button>
      </Case>

      <Case condition={category === "plain"}>
        <Button
          className={`common-button-styles custom-button-plain ${classes} ${
            disabled && "custom-button-plain-disabled"
          }`}
          disabled={disabled}
          onClick={handleClick}
        >
          {name}
        </Button>
      </Case>

      <Case condition={category === "additional"}>
        <Button
          className={`additional-button ${classes} ${
            disabled && "additional-button-disabled"
          }`}
          disabled={disabled}
          onClick={handleClick}
        >
          <section className="additional-button-title">
            {icon}
            <p className="name">{name}</p>
          </section>
        </Button>
      </Case>

      <Case condition={category === "iconed"}>
        <Button
          className={`custom-iconed-button ${classes}`}
          shape={shape}
          icon={icon}
          onClick={handleClick}
          disabled={disabled}
        />
      </Case>

      <Default>
        <Button type={type} className={`custom-button ${classes}`}>
          {name}
        </Button>
      </Default>
    </Switch>
  );
};

export default CustomButton;
