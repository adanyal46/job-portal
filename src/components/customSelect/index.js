import { Select } from "antd";

import "./styles.scss";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CustomSelect = (props) => {
  const { placeholder, height, width } = props;

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
      options={[
        {
          value: "jack",
          label: "Jack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
      ]}
    />
  );
};

export default CustomSelect;
