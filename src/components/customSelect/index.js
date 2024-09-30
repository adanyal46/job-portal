import { Select } from "antd";

import "./styles.scss";

const handleChange = (value) => {};

const CustomSelect = (props) => {
  const { placeholder, height, width, options } = props;

  return (
    <Select
      //   defaultValue="lucy"
      placeholder={placeholder}
      style={{
        width: "100%",
        height: height || 48,
        width: width,
      }}
      onChange={handleChange}
      options={options}
    />
  );
};

export default CustomSelect;
