import { message, Typography } from "antd";
import React, { useState } from "react";
import CustomTabs from "../../customTabs";
import SettingCard from "./SettingCard";
import axiosInstance from "../../../api/axiosInstance";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const DIVIDER_COLOR = {
  borderColor: "#DDDCE2",
  marginTop: 0,
};

const Setting = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/getProfile/" + userId);
      if (response.status === 200 && response.data) {
        setUser(response.data);
        setUserId(response.data.id);
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error?.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        "/admin/manageUser/" + userId,
        values
      );

      if (response.status === 200 && response.data) {
        message.open({
          type: "success",
          content: response.data.message || "Updated",
        });
        if (!values["action"] === "delete") {
          fetchProfile(userId);
        } else {
          setUser(null);
          setUserId(null);
        }
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error?.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (even) => {
    if (even.code === "Enter" && searchQuery !== "") {
      fetchProfile(searchQuery);
      return;
    }
  };
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
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  setSearchQuery={setSearchQuery}
                  user={user}
                  loading={loading}
                  updateUser={updateUser}
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
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  setSearchQuery={setSearchQuery}
                  user={user}
                  loading={loading}
                  updateUser={updateUser}
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
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  setSearchQuery={setSearchQuery}
                  user={user}
                  loading={loading}
                  updateUser={updateUser}
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
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  setSearchQuery={setSearchQuery}
                  user={user}
                  loading={loading}
                  updateUser={updateUser}
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
