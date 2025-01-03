import React from "react";
import { Card, Image, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HowItWorksCard = ({ title, description, icon }) => {
  return (
    <Card bordered={false}>
      <Image preview={false} alt={title} src={icon} />
      <Title level={4} className="how-it-work-card-title">
        {title}
      </Title>
      <Paragraph style={{ color: "#2F2C39", fontSize: "16px" }}>
        {description}
      </Paragraph>
      <RightOutlined style={{ float: "right" }} />
    </Card>
  );
};

export default HowItWorksCard;
