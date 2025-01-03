import { Card, Col, Flex, Image, Rate, Row, Tag, Typography } from "antd";
import React from "react";
import { LocationIcon } from "../../assets/svg";
import CustomButton from "../../components/customButton";
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
            <Col key={index} xs={24} sm={12} md={8}>
              <Card style={{ borderColor: "#DDDCE2", borderRadius: "8px" }}>
                <Flex gap={16} style={{ width: "100%" }}>
                  <Image
                    preview={false}
                    width={184}
                    src={card.image}
                    alt={card.name}
                  />
                  <Flex vertical gap={5} flex={1}>
                    <Flex gap={5} align="center">
                      <Typography.Text
                        style={{ fontSize: "18px", color: "#2F2C39" }}
                      >
                        {card.rating}
                      </Typography.Text>
                      <Rate allowHalf defaultValue={card.rating} />
                      <Typography.Text
                        style={{ fontSize: "16px", color: "#EECB16" }}
                      >
                        ({card.reviews})
                      </Typography.Text>
                    </Flex>
                    <Typography.Title
                      level={4}
                      style={{ fontSize: "20px", color: "#2F2C39" }}
                    >
                      {card.name}
                    </Typography.Title>
                    <Flex gap={5} align="center">
                      <LocationIcon />
                      <Typography.Text
                        style={{ fontSize: "16px", color: "#2F2C39" }}
                      >
                        {card.country}
                      </Typography.Text>
                    </Flex>
                    <div style={{ marginTop: "5px" }}>
                      {card?.services?.map((item) => (
                        <Tag
                          style={{
                            color: "#EFF3F4",
                            fontSize: "16px",
                            color: "#2F2C39",
                            fontWeight: "500",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            marginBottom: "5px",
                          }}
                        >
                          {item}
                        </Tag>
                      ))}
                    </div>
                    <CustomButton
                      category="primary"
                      name="Details"
                      size="large"
                      style={{
                        width: "100%",
                        height: "36px",
                        marginTop: "10px",
                        fontSize: "16px",
                      }}
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
