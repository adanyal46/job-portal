import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";

const WhyFuse = () => {
  return (
    <div className="why-fuse-bg">
      <Row gutter={0}>
        <Col span={14} style={{ marginBlock: "122px", marginLeft: "100px" }}>
          <Image
            src="guest/dashboard.png"
            preview={false}
            width={1019}
            height={623}
          />
        </Col>
        <Col span={7}>
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
                height: "100%",
                display: "grid",
              },
            }}
          >
            <Typography.Title
              level={2}
              style={{ color: "#1D91B6", fontWeight: 600, fontSize: "72px" }}
            >
              Why Fuse
            </Typography.Title>
            <Typography.Text style={{ color: "#14282F", fontSize: "24px" }}>
              Fuse is your digital job search platform designed to support
              employers and job seekers with the right tools to make meaningful
              employment connections.
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WhyFuse;
