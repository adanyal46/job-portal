import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";

const Founder = () => {
  return (
    <div className="home_founder">
      <Row gutter={[24, 24]} style={{ height: "100%" }} align={"middle"}>
        <Col span={9}>
          <Card
            style={{
              backgroundColor: "#E7EDEF",
              borderRadius: 0,
              height: "100%",
            }}
            styles={{
              body: {
                paddingInline: "96px",
                placeContent: "center",
                display: "grid",
                height: "100%",
                minHeight: "920px",
              },
            }}
          >
            <Typography.Title
              level={2}
              style={{ color: "#1D91B6", fontWeight: 600, fontSize: "72px" }}
            >
              Who We Are
            </Typography.Title>
            <Typography.Text style={{ color: "#14282F", fontSize: "24px" }}>
              Fuse is your digital job search platform designed to support
              employers and job seekers with the right tools to make meaningful
              employment connections.
            </Typography.Text>
          </Card>
        </Col>
        <Col span={13}>
          <Typography.Text style={{ fontSize: "32px", color: "#14282F" }}>
            <strong
              style={{
                fontSize: "160px",
                fontWeight: 700,
                lineHeight: "240px",
              }}
            >
              F
            </strong>{" "}
            ounded by a team of seasoned professionals, Sophia Luna and Sylvia
            Correa joined forces to develop a hiring and job search tool they
            believe is needed in today’s job market.. Sophia who owns a boutique
            recruiting agency and Sylvia is a Fortune 500 in-house talent
            acquisition veteran. As a result of these experiences, they gained
            an understanding of specific industry gaps.
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default Founder;
