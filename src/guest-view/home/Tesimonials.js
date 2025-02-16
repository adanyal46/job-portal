import React from "react";
import { Card, Rate, Row, Col, Image, Flex, Typography } from "antd";
import "./Testimonials.css"; // Import the CSS file

const testimonialsData = [
  {
    role: "Mentor",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Recruiter",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Mentor",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Recruiter",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
  {
    role: "Mentor",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis.",
  },
];

const Testimonials = () => {
  return (
    <div className="home_testimonial">
      <h2 className="testimonial_title">What Our Clients Say</h2>
      <Row gutter={[40, 40]}>
        {testimonialsData.map((testimonial, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6}>
            <Card className="testimonial_card">
              <button
                className={`btn_testimonial_${testimonial.role.replace(
                  " ",
                  "_"
                )}`}
              >
                {testimonial.role}
              </button>
              <Flex gap={10} style={{ marginBottom: "10px" }}>
                <Image
                  preview={false}
                  width={91}
                  height={91}
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <Flex vertical gap={5}>
                  <Typography.Text className="testimonial_name">
                    {testimonial.name}
                  </Typography.Text>
                  <Flex gap={5}>
                    <Typography.Text className="testimonial_rating">
                      {testimonial.rating}
                    </Typography.Text>
                    <Rate
                      className="testimonial_stars"
                      disabled
                      defaultValue={testimonial.rating}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Typography.Text className="testimonial_text">
                {testimonial.testimonial}
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
