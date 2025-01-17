import { Card, Typography } from "antd";
import React from "react";
import CustomButton from "../customButton";

const AdminNotification = () => {
  return (
    <div style={{ maxWidth: "970px", width: "100%", marginInline: "auto" }}>
      <Typography.Title
        level={3}
        style={{ color: "#0C0C0C", fontSize: "24px" }}
      >
        Notifications
      </Typography.Title>
      <Card
        bordered
        style={{
          borderColor: "#AEACB4",
          marginBottom: "12px",
          borderRadius: "16px",
        }}
      >
        <Typography.Title
          level={3}
          style={{ color: "#2F2C39", fontSize: "22px", marginBottom: "12px" }}
        >
          Timesheet of Olivia Roy sent to Black Box Tech
        </Typography.Title>
        <CustomButton
          category="plain"
          name="View Timesheet"
          style={{ marginBottom: "12px" }}
        />
        <br />
        <Typography.Text style={{ color: "#2F2C39", fontSize: "16px" }}>
          Olivia Roy request to be your company account admin.
        </Typography.Text>
        <br />
        <Typography.Text strong style={{ color: "#1C1C1C", fontSize: "18px" }}>
          An hour ago
        </Typography.Text>
      </Card>
      <Card
        bordered
        style={{
          borderColor: "#AEACB4",
          marginBottom: "12px",
          borderRadius: "16px",
        }}
      >
        <Typography.Title
          level={3}
          style={{ color: "#2F2C39", fontSize: "22px", marginBottom: "12px" }}
        >
          Timesheet of Olivia Roy sent to Black Box Tech
        </Typography.Title>
        <CustomButton
          category="plain"
          name="View Timesheet"
          style={{ marginBottom: "12px" }}
        />
        <br />
        <Typography.Text style={{ color: "#2F2C39", fontSize: "16px" }}>
          Olivia Roy request to be your company account admin.
        </Typography.Text>
        <br />
        <Typography.Text strong style={{ color: "#1C1C1C", fontSize: "18px" }}>
          An hour ago
        </Typography.Text>
      </Card>
    </div>
  );
};

export default AdminNotification;
