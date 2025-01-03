import { Col, Row } from "antd";
import React from "react";

const FusePlatformBenefits = () => {
  const platformBenefits = [
    {
      title: "Manage everything from your dashboard",
      features: [
        "Post and Manage job openings.",
        "Search job seekers and recruiters.",
        "Evaluate your career site to showcase your company.",
      ],
    },
    {
      title: "Manage and respond to candidate applications",
      features: [
        "View application's information.",
        "Set application status.",
        "Filter and search applications.",
      ],
    },
    {
      title: "Collaborate with your hired recruiters",
      features: [
        "Search industry focused recruiters.",
        "Review individual recruiter details & hire.",
        "Approve recruiter timesheets.",
      ],
    },
  ];
  return (
    <div className="fuse_platform_benefit_bg">
      <div className="fuse_platform_benefit_container">
        <h2>What You Get</h2>
        <Row gutter={[24, 24]} justify={"space-between"}>
          {platformBenefits.map((plat, index) => (
            <Col span={7} key={index}>
              <h2>{plat.title}</h2>
              <ul>
                {plat.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FusePlatformBenefits;
