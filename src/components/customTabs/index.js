import { Tabs } from "antd";

import "./styles.scss";

// const onChange = (key) => {
//   console.log(key);
// };

// const items = [
//   {
//     key: "1",
//     label: "Tab 1",
//     children: "Content of Tab Pane 1",
//   },
//   {
//     key: "2",
//     label: "Tab 2",
//     children: "Content of Tab Pane 2",
//   },
//   {
//     key: "3",
//     label: "Tab 3",
//     children: "Content of Tab Pane 3",
//   },
// ];

const CustomTabs = (props) => {
  const {
    items,
    defaultActiveKey,
    activeKey,
    handleChange,
    centered = false,
  } = props;

  return (
    <Tabs
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      items={items}
      onChange={handleChange}
      className="custom-tabs-wrapper"
      centered={centered}
    />
  );
};
export default CustomTabs;
