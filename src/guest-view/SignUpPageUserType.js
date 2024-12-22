import React, { useState } from "react";
import { Button, Card, Typography } from "antd";
import "./ResetPassword.css";
import "./main.css";
import { useNavigate } from "react-router-dom";

const SignUpPageUserType = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(1);

  const styles = {
    flex: 1,
    borderRadius: "48px",
    minHeight: "50px",
    backgroundColor: "transparent", // Default background color
    color: "#000", // Default text color
    border: "1px solid #ccc", // Default border
    transition: "all 0.3s ease", // Smooth transition
  };

  const btnList = [
    { id: 1, type: "JOB_SEEKER", title: "Job Seeker" },
    { id: 2, type: "MENTOR", title: "Mentor" },
    { id: 3, type: "RECRUITER", title: "Recruiter" },
    { id: 4, type: "EMPLOYER", title: "Employer" },
  ];

  return (
    <div className="container-guest">
      <div className="container-child">
        <div className="centered-text">
          <Typography.Title level={2}>Who Are You?</Typography.Title>
          <p>Let’s Connect!</p>
        </div>
        <Card
          style={{ borderRadius: "100px" }}
          styles={{
            body: {
              padding: "20px 40px",
            },
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {btnList.map((btn) => (
              <Button
                key={btn.id}
                onClick={() => {
                  setActiveBtn(btn.id);
                  navigate("/register/" + btn.type);
                }}
                style={{
                  ...styles,
                  background:
                    activeBtn === btn.id
                      ? "linear-gradient(100deg, #2A7FB7 -1.76%, #2B4054 107.85%)"
                      : styles.backgroundColor,
                  color: activeBtn === btn.id ? "white" : styles.color,
                  border: activeBtn === btn.id ? "none" : styles.border,
                }}
              >
                {btn.title}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPageUserType;
