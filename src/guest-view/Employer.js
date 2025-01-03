import React from "react";
import LogoList from "./home/LogoList";
import LogoList2 from "./home/LogoList2";
import Hero from "./employer/Hero";
import JobPostingBanner from "./employer/JobPostingBanner";
import HiringFlow from "./employer/HiringFlow";
import HiringSolutionsOverview from "./employer/HiringSolutionsOverview";
import FusePlatformBenefits from "./employer/FusePlatformBenefits";

const Employer = () => {
  return (
    <div>
      <Hero />
      <JobPostingBanner />
      <HiringFlow />
      <HiringSolutionsOverview />
      <FusePlatformBenefits />
      <LogoList />
      <LogoList2 />
    </div>
  );
};

export default Employer;
