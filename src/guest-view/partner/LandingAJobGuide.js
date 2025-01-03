import { Card, Col, Image, Row } from "antd";
import React from "react";
const jobGuides = [
  {
    step: 1,
    title: "Create an Account",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolor sit amet, consectetur.",
    imageUrl: "/guest/land-job1.png",
  },
  {
    step: 2,
    title: "Get Reviewed",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolor sit amet, consectetur.",
    imageUrl: "/guest/land-job2.png",
  },
  {
    step: 3,
    title: "Get Discovered",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolor sit amet, consectetur.",
    imageUrl: "/guest/land-job3.png",
  },
  {
    step: 4,
    title: "Start Working",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolor sit amet, consectetur.",
    imageUrl: "/guest/land-job4.png",
  },
  {
    step: 5,
    title: "Get Paid",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolor sit amet, consectetur.",
    imageUrl: "/guest/land-job5.png",
  },
];

const LandingAJobGuide = () => {
  return (
    <div className="landing_job_guide_bg">
      <div className="landing_job_guide_container">
        <h2>How it works</h2>
        <p>Land a job in these easy steps.</p>
        <Row gutter={[24, 24]} justify={"space-between"}>
          {jobGuides?.map((job, index) => (
            <Col
              style={{
                flex: "1 1 calc(20% - 24px)",
                maxWidth: "calc(20% - 24px)",
              }}
            >
              <React.Fragment key={index}>
                <Card
                  className="ant-first-card"
                  styles={{
                    body: {
                      padding: "4px 16px",
                    },
                  }}
                >
                  <h3>STEP {job.step}</h3>
                </Card>
                <Card>
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                  <Image src={job.imageUrl} alt={job.title} />
                </Card>
              </React.Fragment>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default LandingAJobGuide;
