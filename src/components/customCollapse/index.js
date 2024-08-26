import { Collapse } from "antd";

import "./styles.scss";

const CustomCollapse = (props) => {
  const { items, onChange } = props;

  return (
    <Collapse
      bordered={false}
      items={items}
      defaultActiveKey={["1"]}
      onChange={onChange}
      expandIconPosition="end"
      accordion
    />
  );
};
export default CustomCollapse;
