import React, { useState } from "react";
import { Card, Col, Divider, Flex, Row, Space, Typography } from "antd";
import skypeLogo from "../../assets/skype.svg";
import {
  AddCircleIcon,
  EditEmployerProfileIcon,
  LinkEmployerProfileIcon,
  LocationEmployerProfileIcon,
  MenuEmployerProfileIcon,
  UserEmployerProfileIcon,
} from "../../assets/svg";
import Location from "./Location";
import CustomButton from "../../components/customButton";
const Index = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const TEXT_COLOR = "#4B465C";
  const TEXT_STYLE = {
    color: TEXT_COLOR,
  };

  const DIVIDER_STYLE = {
    borderColor: "#B5B5B5",
    height: "1.4em",
  };

  let fakeLocation = [
    {
      city: "California City",
      country: "USA",
      postalCode: "93505",
    },
  ];

  return (
    <div style={{ margin: "0 auto", maxWidth: "900px", width: "100%" }}>
      <Typography.Title level={3} style={{ fontWeight: "400" }}>
        My Profile
      </Typography.Title>
      <Card style={{ width: "100%" }}>
        <Row gutter={16}>
          {/* Left Side Image */}
          <Col>
            <img src={skypeLogo} alt="Company Logo" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
          </Col>
          {/* Right Side Content */}
          <Col flex="auto">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Row justify="space-between" align="middle">
                <Typography.Title level={2} style={{ margin: 0 }}>
                  Company XYZ
                </Typography.Title>
                <EditEmployerProfileIcon style={{ cursor: "pointer" }} />
              </Row>
              <Typography.Text style={TEXT_STYLE}>Company Size: 100-200</Typography.Text>
              <Typography.Text style={TEXT_STYLE}>Email: info@xyz.com</Typography.Text>
              <Typography.Text style={TEXT_STYLE}>Phone: +1 305 3216549</Typography.Text>
              <Flex gap={3} align="center">
                <Typography.Text style={TEXT_STYLE}>Skype: skype.com/careers</Typography.Text>{" "}
                <LinkEmployerProfileIcon style={{ position: "relative", top: "-4px" }} />
              </Flex>
              <Typography.Text style={{ backgroundColor: "#E2F3F9", padding: "4px", color: "#0077A6" }} strong>
                ID: #232122
              </Typography.Text>
            </Space>
          </Col>
        </Row>

        <Divider style={{ ...DIVIDER_STYLE, marginBottom: "5px" }} />
        <Location location={fakeLocation} TEXT_STYLE={TEXT_STYLE} setShowLocationModal={setShowLocationModal} showLocationModal={showLocationModal} />

        <Typography.Title level={3} style={{ color: "#333333", marginTop: "20px" }}>
          Point of Contact
        </Typography.Title>

        <Flex gap={7} className="w-100" style={{ marginBottom: "20px" }}>
          <UserEmployerProfileIcon />
          <Flex justify="space-between" className="w-100">
            <Flex gap={2} vertical>
              <Typography.Text style={TEXT_STYLE}>Super Admin/Manager Name</Typography.Text>
              <Typography.Text style={TEXT_STYLE}>Job Role</Typography.Text>
              <Typography.Text style={TEXT_STYLE}>+1 305 3216549</Typography.Text>
              <Typography.Text style={TEXT_STYLE}>Email</Typography.Text>
              <Typography.Text style={TEXT_STYLE}>Contact Number</Typography.Text>
            </Flex>
            <MenuEmployerProfileIcon />
          </Flex>
        </Flex>
        <CustomButton category="additional" name="Add" icon={<AddCircleIcon />} handleClick={() => {}} />
        <Divider style={{ ...DIVIDER_STYLE, marginBottom: "5px" }} />
        <CustomButton name="Apply to be Company Account Administrator" category="primary"  />
      </Card>
    </div>
  );
};

export default Index;
