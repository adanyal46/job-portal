import { Switch, Case, Default } from "react-if";
import { Button } from "antd";

import "./styles.scss";

const CustomButton = (props) => {
  const {
    category,
    type,
    name,
    disabled,
    handleClick,
    icon,
    shape,
    classes,
    loading = false,
    block = false,
    style,
  } = props;
  const onClick = typeof handleClick === "function" ? handleClick : () => {};
  return (
    <Switch>
      <Case condition={category === "primary"}>
        <Button
          loading={loading}
          type="primary"
          className={`common-button-styles custom-button-primary ${classes}`}
          onClick={onClick}
          block={block}
          style={style}
        >
          {name}
        </Button>
      </Case>

      <Case condition={category === "danger"}>
        <Button
          danger
          type="text"
          className={`common-button-styles custom-button-danger ${classes}`}
          onClick={onClick}
          loading={loading}
          style={style}
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
          onClick={onClick}
          style={style}
          loading={loading}
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
          onClick={onClick}
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
          onClick={onClick}
          disabled={disabled}
        />
      </Case>

      <Default>
        <Button
          type={type}
          className={`custom-button ${classes}`}
          onClick={onClick}
        >
          {name}
        </Button>
      </Default>
    </Switch>
  );
};

export default CustomButton;
