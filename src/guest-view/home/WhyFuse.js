import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import "./WhyFuse.css"; // Import the CSS file

const WhyFuse = () => {
  return (
    <div className="why-fuse-bg">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14} lg={16}>
          <Image
            className="why-fuse-image"
            src="guest/dashboard.png"
            preview={false}
          />
        </Col>
        <Col xs={24} md={10} lg={8}>
          <Card className="why-fuse-card">
            <Typography.Title level={2} className="why-fuse-title">
              Why Fuse
            </Typography.Title>
            <Typography.Text className="why-fuse-text">
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
