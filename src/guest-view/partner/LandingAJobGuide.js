import { Card, Col, Image, Row } from "antd";
import React from "react";
const jobGuides = [
  {
    step: 1,
    title: "Get Started",
    description:
      "Unlock new opportunities to guide talent and connect with top employers. As a mentor or recruiter, you’ll play a key role in shaping careers and building successful teams. Create an account today.",
    imageUrl: "/guest/land-job1.png",
  },
  {
    step: 2,
    title: "Get Reviewed",
    description:
      "At Fuse, we uphold the highest standards of quality and credibility. Each profile is carefully reviewed to ensure it meets our expectations. Once approved, your profile will be visible to those seeking your expertise.",
    imageUrl: "/guest/land-job2.png",
  },
  {
    step: 3,
    title: "Get Discovered",
    description:
      "A well-crafted profile helps attract the right opportunities, and adding a video can further showcase your expertise and stand out to those who need your services. Employers seeking recruiters or individuals looking for mentorship can find you easily with a detailed profile. Adding a video elevates your profile, making it easier for others to connect with you.",
    imageUrl: "/guest/land-job3.png",
  },
  {
    step: 4,
    title: "Get Working",
    description:
      "1 - You're now Fuse-activated! Engage with professionals and/or employers, schedule sessions, and share your expertise. Build relationships, offer guidance, and make an impact today! 2- You're now Fuse-activated! Connect, schedule sessions, and provide mentorship or recruitment support.",
    imageUrl: "/guest/land-job4.png",
  },
  {
    step: 5,
    title: "Get Paid",
    description:
      "We ensure seamless transactions, so you can focus on what you do best—helping others succeed. Our all-in-one dashboard tracks payments, reviews, and past transactions for easy management. We ensure seamless transactions, allowing you to focus on helping others succeed. Our all-in-one dashboard tracks sessions, reviews, and payments for easy management.",
    imageUrl: "/guest/land-job5.png",
  },
];

const LandingAJobGuide = () => {
  return (
    <div className="landing_job_guide_bg">
      <div className="landing_job_guide_container">
        <h2>How it works</h2>
        <p>
          Fuse connects experienced professionals with individuals and companies
          looking for mentorship and recruitment services. Here’s how you can
          get started:
        </p>
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
                  <Image preview={false} src={job.imageUrl} alt={job.title} />
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
