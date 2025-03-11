import React, { useState } from "react";
import { Select, Dropdown, Menu, Space } from "antd";
import {
  DownOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  SyncOutlined,
} from "@ant-design/icons";

// Static Status Component
export const StatusIndicator = ({ status }) => {
  const statusConfig = {
    IN_PROGRESS: {
      backgroundColor: "#FAF4EE",
      color: "#FA8C16",
      text: "In Progress",
      border: "#FFD591",
      icon: <SyncOutlined style={{ fontSize: "12px" }} />,
    },
    COMPLETED: {
      backgroundColor: "#E6F7EF",
      color: "#52C41A",
      text: "Completed",
      border: "#B7EB8F",
      icon: <CheckCircleFilled style={{ fontSize: "12px" }} />,
    },
    FAILED: {
      backgroundColor: "#FFF1F0",
      color: "#F5222D",
      text: "Failed",
      border: "#FFA39E",
      icon: <CloseCircleFilled style={{ fontSize: "12px" }} />,
    },
  };
  const currentStatus = statusConfig[status] || statusConfig.IN_PROGRESS;

  return (
    <div
      style={{
        backgroundColor: currentStatus.backgroundColor,
        color: currentStatus.color,
        padding: "8px 12px",
        borderRadius: "4px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "150px",
        fontWeight: 500,
        cursor: "pointer",
        border: `1px solid ${currentStatus.border}`,
      }}
    >
      <span style={{ marginRight: "8px" }}>{currentStatus.text}</span>
      <DownOutlined style={{ fontSize: "12px" }} />
    </div>
  );
};

// Editable Status Component with Dropdown
const EBookingStatusDropDown = ({ value, onChange }) => {
  const statusConfig = {
    IN_PROGRESS: {
      backgroundColor: "#FAF4EE",
      color: "#FA8C16",
      text: "In Progress",
      border: "#FFD591",
    },
    COMPLETED: {
      backgroundColor: "#E6F7EF",
      color: "#52C41A",
      text: "Completed",
      border: "#B7EB8F",
    },
    FAILED: {
      backgroundColor: "#FFF1F0",
      color: "#F5222D",
      text: "Failed",
      border: "#FFA39E",
    },
  };
  const currentStatus = statusConfig[value] || statusConfig.IN_PROGRESS;

  const menu = (
    <Menu
      onClick={(e) => onChange(e.key)}
      items={[
        {
          key: "IN_PROGRESS",
          label: (
            <div
              style={{
                backgroundColor: statusConfig.IN_PROGRESS.backgroundColor,
                color: statusConfig.IN_PROGRESS.color,
                padding: "8px 12px",
                borderRadius: "4px",
                width: "150px",
                fontWeight: 500,
              }}
            >
              {statusConfig.IN_PROGRESS.text}
            </div>
          ),
        },
        {
          key: "COMPLETED",
          label: (
            <div
              style={{
                backgroundColor: statusConfig.COMPLETED.backgroundColor,
                color: statusConfig.COMPLETED.color,
                padding: "8px 12px",
                borderRadius: "4px",
                width: "150px",
                fontWeight: 500,
              }}
            >
              {statusConfig.COMPLETED.text}
            </div>
          ),
        },
        {
          key: "FAILED",
          label: (
            <div
              style={{
                backgroundColor: statusConfig.FAILED.backgroundColor,
                color: statusConfig.FAILED.color,
                padding: "8px 12px",
                borderRadius: "4px",
                width: "150px",
                fontWeight: 500,
              }}
            >
              {statusConfig.FAILED.text}
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div
        style={{
          backgroundColor: currentStatus.backgroundColor,
          color: currentStatus.color,
          padding: "8px 12px",
          borderRadius: "4px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          fontWeight: 500,
          cursor: "pointer",
          border: 0,
        }}
      >
        <span style={{ marginRight: "8px" }}>{currentStatus.text}</span>
        {/* <DownOutlined style={{ fontSize: "12px" }} /> */}
      </div>
    </Dropdown>
  );
};

export default EBookingStatusDropDown;
