import React from "react";
import LogoList from "./home/LogoList";
import LogoList2 from "./home/LogoList2";
import WayMentor from "./job/WayMentor";
import Hero from "./job/Hero";
import HowItWorks from "./job/HowItWorks";

const JobView = () => {
  return (
    <div>
      <Hero />
      <LogoList />
      <HowItWorks />
      <WayMentor />
      <LogoList2 />
    </div>
  );
};

export default JobView;
