import React from "react";
import { Card, Col, Image, Row, Typography } from "antd";
const { Title, Paragraph } = Typography;
const HiringSolutionsOverview = () => {
  const data = [
    {
      title: "Full-Cycle Recruiting",
      description:
        "Fuse offers comprehensive staffing solutions that guarantee efficiency, creativity, and the perfect candidate for the job. Our end-to-end services ensure that the process of finding the right talent is hassle-free and successful.",
      imageUrl: "/guest/full-cycle.png",
    },
    {
      title: "Reach Top Talent",
      description:
        "With Fuse's user-friendly interface, you can easily post job openings and search for the perfect candidate for your business.",
      imageUrl: "/guest/top-talent.png",
    },
    {
      title: "Integrate Recruiters",
      description:
        "Explore our team of expert recruiters specialized in your industry who can easily integrate into your organization and work on your behalf, enabling you to conveniently source talent without having to make a full-time hire.",
      imageUrl: "/guest/integrate-recruiter.png",
    },
  ];
  return (
    <div className="hiring_solution_overview_bg">
      <div className="hiring_solution_overview_container">
        <h2>Work Smarter!</h2>
        <div className="hiring_solution_p">
          <p>
            Discover the perfect fit for your staffing requirements with our
            comprehensive solutions that guarantee efficiency, creativity, and
            the ideal personnel.
          </p>
        </div>
        <Row gutter={[24, 24]}>
          {data?.map(({ title, description, imageUrl }, index) => (
            <Col span={8} key={index}>
              <Card
                bordered={false}
                style={{ borderRadius: "20px", height: "100%" }}
              >
                <Image preview={false} alt={title} src={imageUrl} />
                <Title level={4} className="how-it-work-card-title">
                  {title}
                </Title>
                <p>{description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HiringSolutionsOverview;
