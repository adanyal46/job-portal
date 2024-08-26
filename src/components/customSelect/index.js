import { Select } from "antd";

import "./styles.scss";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CustomSelect = (props) => {
  const { placeholder } = props;

  return (
    <Select
      //   defaultValue="lucy"
      placeholder={placeholder}
      style={{
        width: "100%",
        height: 48,
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
