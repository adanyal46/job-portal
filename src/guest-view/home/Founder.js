import { Card, Col, Row, Typography } from "antd";
import React from "react";
import "./Founder.css"; // Import your CSS file

const Founder = () => {
  return (
    <div className="home_founder">
      <Row gutter={[24, 24]} style={{ height: "100%" }} align={"middle"} wrap>
        <Col xs={24} md={24} lg={10} xl={9}>
          <Card
            style={{
              backgroundColor: "#E7EDEF",
              borderRadius: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            bodyStyle={{
              paddingInline: "5vw", // Responsive padding
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              minHeight: "auto", // Allow it to shrink on smaller screens
            }}
          >
            <Typography.Title level={2} className="responsive-title">
              Who We Are
            </Typography.Title>
            <Typography.Text className="responsive-text">
              Fuse is your digital job search platform designed to support
              employers and job seekers with the right tools to make meaningful
              employment connections.
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={14} xl={15}>
          <Typography.Text className="responsive-text-large">
            <strong className="responsive-strong">F</strong> ounded by a team of
            seasoned professionals, Sophia Luna and Sylvia Correa joined forces
            to develop a hiring and job search tool they believe is needed in
            today’s job market.. Sophia who owns a boutique recruiting agency
            and Sylvia is a Fortune 500 in-house talent acquisition veteran. As
            a result of these experiences, they gained an understanding of
            specific industry gaps.
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default Founder;
