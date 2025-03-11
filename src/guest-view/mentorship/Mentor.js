import { Card, Col, Flex, Image, Rate, Row, Tag, Typography } from "antd";
import React from "react";
import { LocationIcon } from "../../assets/svg";
import CustomButton from "../../components/customButton";
import "./styles/Mentor.css";

const { Meta } = Card;

const Mentor = () => {
  const cardData = [
    {
      name: "Olivia Roy",
      country: "US",
      services: [
        "Resume Review",
        "30-Minute Career Q&A",
        "Job Search Strategy",
      ],
      rating: 4.6,
      reviews: 22,
      image: "/guest/mentorship-user.png",
    },
    {
      name: "Max Helzberg",
      country: "US",
      services: [
        "Resume Review",
        "30-Minute Career Q&A",
        "Job Search Strategy",
      ],
      rating: 4.6,
      reviews: 38,
      image: "/guest/mentorship-user.png",
    },
    {
      name: "Andrea Gerson",
      country: "US",
      services: [
        "Resume Review",
        "30-Minute Career Q&A",
        "Job Search Strategy",
      ],
      rating: 4.6,
      reviews: 22,
      image: "/guest/mentorship-user.png",
    },
  ];

  return (
    <div className="mentorship_mentor">
      <div className="mentorship_mentor_container">
        <h2>Mentors</h2>
        <p>
          Get help from certified mentors for interview techniques, resume
          feedback and a lot more.
        </p>
        <Row gutter={[16, 16]}>
          {cardData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card className="mentor-card" style={{ overflow: "auto" }}>
                <Flex gap={16} style={{ width: "100%" }}>
                  <Image
                    preview={false}
                    // width={184}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "180px",
                      minWidth: "180px",
                    }}
                    src={card.image}
                    alt={card.name}
                  />
                  <Flex vertical gap={5}>
                    <Flex gap={5} align="center">
                      <Typography.Text className="mentor-rating">
                        {card.rating}
                      </Typography.Text>
                      <Rate allowHalf defaultValue={card.rating} />
                      <Typography.Text className="mentor-reviews">
                        ({card.reviews})
                      </Typography.Text>
                    </Flex>
                    <Typography.Title level={4} className="mentor-name">
                      {card.name}
                    </Typography.Title>
                    <Flex gap={5} align="center">
                      <LocationIcon />
                      <Typography.Text className="mentor-country">
                        {card.country}
                      </Typography.Text>
                    </Flex>
                    <div className="mentor-services">
                      {card?.services?.map((item, idx) => (
                        <Tag key={idx} className="mentor-tag">
                          {item}
                        </Tag>
                      ))}
                    </div>
                    <CustomButton
                      category="primary"
                      name="Details"
                      size="large"
                      className="mentor-button"
                    />
                  </Flex>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Mentor;
