import React, { useState } from "react";
import { Select, Dropdown, Menu, Space } from "antd";
import {
  DownOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";

// Static Status Component
export const StatusIndicator = ({ status }) => {
  const isEngaged = status === "engaged";

  return (
    <div
      style={{
        backgroundColor: isEngaged ? "#e6f7ef" : "#fff1f0",
        color: isEngaged ? "#52c41a" : "#f5222d",
        padding: "8px 12px",
        borderRadius: "4px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "150px",
        fontWeight: 500,
        cursor: "pointer",
        border: `1px solid ${isEngaged ? "#b7eb8f" : "#ffa39e"}`,
      }}
    >
      {isEngaged ? (
        <>
          <span style={{ marginRight: "8px" }}>Engaged</span>
          <DownOutlined style={{ fontSize: "12px" }} />
        </>
      ) : (
        <>
          <span style={{ marginRight: "8px" }}>Not Engaged</span>
          <DownOutlined style={{ fontSize: "12px" }} />
        </>
      )}
    </div>
  );
};

// Editable Status Component with Dropdown
const StaffStatusDropdown = ({ value, onChange }) => {
  const isEngaged = value === "ENGAGED";

  const menu = (
    <Menu
      onClick={(e) => onChange(e.key)}
      items={[
        {
          key: "ENGAGED",
          label: (
            <div
              style={{
                backgroundColor: "#e6f7ef",
                color: "#52c41a",
                padding: "8px 12px",
                borderRadius: "4px",
                width: "150px",
                fontWeight: 500,
              }}
            >
              Engaged
            </div>
          ),
        },
        {
          key: "NOT_ENGAGED",
          label: (
            <div
              style={{
                backgroundColor: "#fff1f0",
                color: "#f5222d",
                padding: "8px 12px",
                borderRadius: "4px",
                width: "150px",
                fontWeight: 500,
              }}
            >
              Not Engaged
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
          backgroundColor: isEngaged ? "#e6f7ef" : "#fff1f0",
          color: isEngaged ? "#52c41a" : "#f5222d",
          padding: "8px 12px",
          borderRadius: "4px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          fontWeight: 500,
          cursor: "pointer",
          //   border: `1px solid ${isEngaged ? "#b7eb8f" : "#ffa39e"}`,
          border: 0,
        }}
      >
        {isEngaged ? (
          <>
            <span style={{ marginRight: "8px" }}>Engaged</span>
            <DownOutlined style={{ fontSize: "12px" }} />
          </>
        ) : (
          <>
            <span style={{ marginRight: "8px" }}>Not Engaged</span>
            <DownOutlined style={{ fontSize: "12px" }} />
          </>
        )}
      </div>
    </Dropdown>
  );
};

export default StaffStatusDropdown;
