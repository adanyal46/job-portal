import React from "react";
import Faq from "./home/Faq";
import Hero from "./partner/Hero";
import LogoList from "./home/LogoList";
import LogoList2 from "./home/LogoList2";
import LandingAJobGuide from "./partner/LandingAJobGuide";
import MentorshipCTA from "./partner/MentorshipCTA";
import RecruiterCTA from "./partner/RecruiterCTA";

const Partner = () => {
  return (
    <div>
      <Hero />
      <LogoList />
      <LandingAJobGuide />
      <LogoList2 />
      <MentorshipCTA />
      <RecruiterCTA />
      <Faq />
    </div>
  );
};

export default Partner;
