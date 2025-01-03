import { Col, Row } from "antd";
import React from "react";
import HowItWorksCard from "../job/HowItWorksCard";
import {
  EmpPostJobIcon,
  EmpUpIcon,
  EngageIcon,
  GetResultIcon,
  Initiate,
} from "../../assets/svg";

const HiringFlow = () => {
  const steps = [
    {
      title: "Post a Job",
      description: "Market your openings and view your applicants.",
      icon: "/guest/create-an-account.png",
    },
    {
      title: "Search our Database",
      description: "View our Top Talent.",
      icon: "/guest/search.png",
    },
    {
      title: "Hire a Recruiter",
      description: "Search Industry-Focused Recruiters.",
      icon: "/guest/apply.png",
    },
    {
      title: "Want us to Handle the Hiring?",
      description: "We offer Full Life Cycle Recruiting.",
      icon: "/guest/mentoring.png",
    },
  ];
  return (
    <div className="hiring_flow_bg">
      <div className="hiring_flow_container">
        <h2>Flexible Solutions</h2>
        <p>
          Fuse helps you meet the demands of your hiring needs at any point in
          the process.
        </p>
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
                      ? "261px"
                      : index === 2
                      ? "0px"
                      : index === 3
                      ? "261px"
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
                  <EmpPostJobIcon style={{ width: "100%" }} />
                </Col>
              )}
              {index === 1 && (
                <Col
                  xs={24}
                  sm={24}
                  md={2}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <EmpUpIcon style={{ width: "100%" }} />
                </Col>
              )}
              {index === 2 && (
                <Col
                  xs={24}
                  sm={24}
                  md={2}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <EmpPostJobIcon style={{ width: "100%" }} />
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HiringFlow;
