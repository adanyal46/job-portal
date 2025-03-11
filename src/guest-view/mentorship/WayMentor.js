import { Card, Col, Flex, Image, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/customButton";
import "./styles/WayMentor.css"; // Import the CSS file

const cards = [
  {
    icon: "/guest/way-mentor.png",
    title: "Resume Review",
    description: "Getting a great job starts with a great resume.",
    link: "#",
  },
  {
    icon: "/guest/interview-prep.png",
    title: "Interview Prep",
    description: "A well-prepared interview will get you hired.",
    link: "#",
  },
  {
    icon: "/guest/career-pathing.png",
    title: "Career Pathing",
    description: "What is your career path without one?",
    link: "#",
  },
  {
    icon: "/guest/entership.png",
    title: "Entrepreneurship",
    description: 'Turn "stuck" into revenue.',
    link: "#",
  },
];

const WayMentor = () => {
  return (
    <div className="mentorship_way_mentor">
      <div className="container">
        <Flex vertical justify="center" style={{ width: "100%" }}>
          <h2>Ways to get mentored</h2>
          <p>
            Gain the advantage of personalized guidance to make the most of your
            job opportunities!
          </p>
          <Row gutter={[24, 24]} justify="center">
            {cards.map((card, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={6}>
                <Link to={card.link}>
                  <Card bordered className="mentor-card">
                    <Image preview={false} src={card.icon} alt={card.title} />
                    <span>{card.title}</span>
                    <p>{card.description}</p>
                  </Card>
                </Link>
              </Col>
            ))}
            <Col span={24} className="btn-container">
              <CustomButton
                category="primary"
                name="Get Started"
                size="large"
                className="mentor-button"
              />
            </Col>
          </Row>
        </Flex>
      </div>
    </div>
  );
};

export default WayMentor;
