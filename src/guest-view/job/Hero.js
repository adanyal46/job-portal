import { Col, Flex, Input, Row } from "antd";
import React from "react";
import CustomButton from "../../components/customButton";
import { SearchIconJobHero } from "../../assets/svg";

const Hero = () => {
  return (
    <div className="job_hero_bg">
      <div className="container">
        <Flex vertical>
          <h2>Land Your Dream Job</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Senectus sapien vel morbi
            sit phasellus. Lorem ipsum dolor sit amet consectetur. Senectus
            sapien vel morbi sit phasellus.
          </p>
          <Row gutter={[24, 24]}>
            <Col span={10}>
              <Input
                size="large"
                placeholder="Search jobs by skills, category..."
                style={{
                  borderColor: "#AEACB4",
                  minHeight: "54px",
                }}
                prefix={<SearchIconJobHero />}
              />
            </Col>
            <Col span={9}>
              <Input
                size="large"
                placeholder="Enter city, state, zip code..."
                style={{
                  borderColor: "#AEACB4",
                  minHeight: "54px",
                }}
              />
            </Col>
            <CustomButton
              name="Search"
              category="primary"
              style={{ minWidth: "136px", minHeight: "54px" }}
            />
          </Row>
        </Flex>
      </div>
    </div>
  );
};

export default Hero;
