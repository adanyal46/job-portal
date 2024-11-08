import { Card, Typography } from "antd";
import React from "react";
import CustomTabs from "../../customTabs";
import SettingCard from "./SettingCard";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const DIVIDER_COLOR = {
  borderColor: "#DDDCE2",
  marginTop: 0,
};

const Setting = () => {
  return (
    <div style={{ margin: "0 auto", maxWidth: "915px", width: "100%" }}>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Settings
      </Typography.Title>
      <div>
        <CustomTabs
          items={[
            {
              key: "1",
              label: "Job Seeker",
              children: (
                <SettingCard
                  DIVIDER_COLOR={DIVIDER_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                />
              ),
            },
            {
              key: "2",
              label: "Mentor",
              children: (
                <SettingCard
                  DIVIDER_COLOR={DIVIDER_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                  type="mentor"
                />
              ),
            },
            {
              key: "3",
              label: "Recruiter",
              children: (
                <SettingCard
                  DIVIDER_COLOR={DIVIDER_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                  type="recruiter"
                />
              ),
            },
            {
              key: "4",
              label: "Employer",
              children: (
                <SettingCard
                  DIVIDER_COLOR={DIVIDER_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                  type="employer"
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Setting;
