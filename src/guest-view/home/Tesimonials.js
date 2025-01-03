import React from "react";
import { Card, Rate, Row, Col, Image, Flex, Typography } from "antd";
const testimonialsData = [
  {
    role: "Mentor",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginTop: "20px",
    },
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginTop: "24px",
    },
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginTop: "30px",
    },
  },
  {
    role: "Mentor",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginTop: "-20px",
    },
  },
  {
    role: "Recruiter",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginLeft: "20px",
      marginTop: "20px",
    },
  },
  {
    role: "Recruiter",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginLeft: "20px",
      marginTop: "20px",
    },
  },
  {
    role: "Recruiter",
    name: "Alina Smith",
    rating: 4.8,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginLeft: "20px",
      marginTop: "20px",
    },
  },
  {
    role: "Mentor",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginLeft: "20px",
      marginTop: "-20px",
    },
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginLeft: "-10px",
      marginTop: "20px",
    },
  },
  {
    role: "Recruiter",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",

    style: {
      marginTop: "16px",
    },
  },
  {
    role: "Job Seeker",
    name: "Alina Smith",
    rating: 4.6,
    image: "guest/testimonial.png",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur. In sit et a augue arcu orci erat feugiat. Amet dolor eget mi ut enim vitae. Mi risus amet ullamcorper eget viverra enim mauris venenatis. Quam ultrices ornare sed cras ipsum scelerisque in.",
    style: {
      marginTop: "16px",
      marginLeft: "-15px",
    },
  },
];
const Testimonials = () => {
  return (
    <div className="home_testimonial">
      <h2>What Our Clients Say</h2>
      <Row gutter={[16, 16]}>
        {testimonialsData.map((testimonial, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                position: "relative",
                borderColor: "#DBDADE",
                maxWidth: "354px",
                ...testimonial.style,
              }}
            >
              <button className={"btn_testimonial_" + testimonial.role}>
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
                  <Typography.Text
                    style={{
                      fontSize: "22px",
                      color: "#4B465C",
                      fontWeight: 500,
                    }}
                  >
                    Alina Smith
                  </Typography.Text>
                  <Flex gap={5}>
                    <Typography.Text style={{ fontSize: "18px" }}>
                      {testimonial.rating}
                    </Typography.Text>
                    <Rate
                      style={{ fontSize: "24px" }}
                      disabled
                      defaultValue={testimonial.rating}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Typography.Text style={{ color: "#4B465C" }}>
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
