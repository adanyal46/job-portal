import React from "react";
import { Row, Col, Space } from "antd"; // Use Space for proper spacing
import HowItWorksCard from "./HowItWorksCard"; // Import the card component
import { EngageIcon, GetResultIcon, Initiate } from "../../assets/svg";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Make your candidate profile stand out by highlighting your skills and qualifications.",
      icon: "/guest/create-an-account.png",
    },
    {
      title: "Search",
      description: "Explore jobs by industry, location, or company name.",
      icon: "/guest/search.png",
    },
    {
      title: "Apply",
      description:
        "Upload your resume and share it with employers and recruiters in our community.",
      icon: "/guest/apply.png",
    },
    {
      title: "Mentoring",
      description:
        "Work with mentors that will guide you in attaining your career goals.",
      icon: "/guest/mentoring.png",
    },
  ];

  return (
    <div className="how-it-works-container">
      <div className="how-it-works-child-container">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <h2>How it Works</h2>
          <p>Land a job in these easy steps.</p>
          <Row gutter={0}>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Col
                  xs={24}
                  sm={12}
                  md={4}
                  style={{
                    paddingTop:
                      index === 1
                        ? "121px"
                        : index === 2
                        ? "185px"
                        : index === 3
                        ? "249px"
                        : "",
                  }}
                >
                  <HowItWorksCard
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
                </Col>
                {/* Add SVG between the first and second cards */}
                {index === 0 && (
                  <Col
                    xs={24}
                    sm={24}
                    md={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Initiate style={{ width: "100%" }} />
                  </Col>
                )}
                {index === 1 && (
                  <Col
                    xs={24}
                    sm={24}
                    md={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <EngageIcon style={{ width: "100%" }} />
                  </Col>
                )}
                {index === 2 && (
                  <Col
                    xs={24}
                    sm={24}
                    md={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <GetResultIcon style={{ width: "100%" }} />
                  </Col>
                )}
              </React.Fragment>
            ))}
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default HowItWorks;
