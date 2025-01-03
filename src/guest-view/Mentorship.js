import React from "react";
import Hero from "./mentorship/Hero";
import LogoList from "./home/LogoList";
import LogoList2 from "./home/LogoList2";
import WayMentor from "./mentorship/WayMentor";
import Mentor from "./mentorship/Mentor";

const Mentorship = () => {
  return (
    <div>
      <Hero />
      <LogoList />
      <WayMentor />
      <LogoList2 />
      <Mentor />
    </div>
  );
};

export default Mentorship;
