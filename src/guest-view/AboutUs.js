import React from "react";
import LogoList from "./home/LogoList";
import LogoList2 from "./home/LogoList2";
import Faq from "./home/Faq";
import About from "./aboutus/About";
import RecruitersInfo from "./aboutus/RecruitersInfo";

const AboutUs = () => {
  return (
    <div>
      <div className="about-us-bg">
        <div className="about-us-container">
          <h2>About Us</h2>
        </div>
      </div>
      <LogoList />
      <About />
      <LogoList2 />
      <RecruitersInfo />
      <Faq />
    </div>
  );
};

export default AboutUs;
