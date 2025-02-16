import React, { useState } from "react";
import { Button, Card, Flex, Typography } from "antd";
import "./ResetPassword.css";
import "./main.css";
import { useNavigate } from "react-router-dom";
import GradientButton from "../components/customComponents/GradientButton";

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
    {
      id: 1,
      type: "JOB_SEEKER",
      title: "Job Seeker",
      styles: {
        textGradient:
          "linear-gradient(100.34deg, #2A7FB7 -1.76%, #2B4054 107.85%)",
        borderRadius: "40px",
        borderGradient:
          "linear-gradient(100.34deg, #2A7FB7 -1.76%, #2B4054 107.85%)",
      },
    },
    {
      id: 2,
      type: "MENTOR",
      title: "Mentor",
      styles: {
        textGradient:
          "linear-gradient(290.86deg, #2A6F5B -4.11%, #A5E51C 136.14%)",
        borderRadius: "40px",
        borderGradient:
          "linear-gradient(290.86deg, #2A6F5B -4.11%, #A5E51C 136.14%)",
      },
    },
    {
      id: 3,
      type: "RECRUITER",
      title: "Recruiter",
      styles: {
        textGradient:
          "linear-gradient(102.27deg, #35CBA5 -1.17%, #007E5F 101.77%)",
        borderRadius: "40px",
        borderGradient:
          "linear-gradient(102.27deg, #35CBA5 -1.17%, #007E5F 101.77%)",
      },
    },
    {
      id: 4,
      type: "EMPLOYER",
      title: "Employer",
      styles: {
        textGradient:
          "linear-gradient(287.99deg, #001F3F -20.42%, #009DD1 62.87%)",
        borderRadius: "40px",
        borderGradient:
          "linear-gradient(287.99deg, #001F3F -20.42%, #009DD1 62.87%)",
      },
    },
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
          <Flex gap={20} wrap>
            {btnList.map((btn) => (
              <GradientButton
                {...btn.styles}
                key={btn.id}
                onClick={() => {
                  setActiveBtn(btn.id);
                  navigate("/register/" + btn.type);
                }}
              >
                {btn.title}
              </GradientButton>
            ))}
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPageUserType;
