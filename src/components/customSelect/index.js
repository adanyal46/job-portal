import { Select } from "antd";
import "./styles.scss";

const CustomSelect = (props) => {
  const {
    placeholder = "",
    height,
    width,
    options,
    value = undefined,
    onChange,
    name,
    handleClear,
  } = props;

  return (
    <Select
      value={value || undefined}
      placeholder={placeholder}
      allowClear
      style={{
        width: "100%",
        height: height || 48,
        width: width,
      }}
      onChange={(value) => {
        onChange(value || "");
      }}
      options={options}
      onClear={() => {
        handleClear(name);
      }}
    />
  );
};

export default CustomSelect;
