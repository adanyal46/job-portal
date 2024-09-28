// src/components/Loader.js
import React from "react";
import { Spin } from "antd";
import "./styles.scss"; // Optional for custom styles

const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large" /> {/* Ant Design Spin loader */}
    </div>
  );
};

export default Loader;
