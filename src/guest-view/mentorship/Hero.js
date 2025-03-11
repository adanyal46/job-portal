import { Flex } from "antd";
import React from "react";
import CustomButton from "../../components/customButton";
import "./styles/hero.css";
const Hero = () => {
  return (
    <div className="mentoship-hero-bg">
      <div className="container">
        <Flex vertical>
          <h2>
            Level Up <span>↑</span> with Top Mentors Worldwide Mentorship is
            your first step
          </h2>
          <CustomButton
            category="primary"
            name="View Mentors"
            size="large"
            style={{
              minWidth: "180px",
              maxWidth: "180px",
              height: "62px",
              marginTop: "40px",
              fontSize: "20px",
            }}
          />
        </Flex>
      </div>
    </div>
  );
};

export default Hero;
