import { Button, Col, Flex, Image, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Hero.css"; // Import the external CSS file

const Hero = () => {
  return (
    <div className="home-bg">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14} lg={14}>
          <div className="hero-content">
            <Flex vertical gap={10}>
              <Typography.Title level={2} className="hero-title">
                Find your place at Fuse!
              </Typography.Title>
              <Typography.Text className="hero-text">
                Are you wondering about what your next move should be? Are you a
                talented individual seeking an exciting new challenge?
              </Typography.Text>
              <Typography.Text className="hero-text">
                Do you want a different way of working? A place where you get
                rewarded by the effort you put into your work? Or simply a
                platform Fuse is just the place for you!
              </Typography.Text>
              <Typography.Title level={3}>👋 I am a...</Typography.Title>
              <Flex gap={10} className="hero-buttons">
                <Link to={"/register/JOB_SEEKER"}>
                  <Button shape="round" className="job-seeker-btn">
                    Job Seeker
                  </Button>
                </Link>
                <Link to={"/register/MENTOR"}>
                  <Button shape="round" className="mentor-btn">
                    Mentor
                  </Button>
                </Link>
                <Link to={"/register/RECRUITER"}>
                  <Button shape="round" className="recruiter-btn">
                    Recruiter
                  </Button>
                </Link>
                <Link to={"/register/EMPLOYER"}>
                  <Button shape="round" className="employer-btn">
                    Employer
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </div>
        </Col>
        <Col xs={24} md={10} lg={10}>
          <div className="hero-image-container">
            <Image
              src="/guest/home-right-img.svg"
              width="100%"
              preview={false}
              className="hero-main-image"
            />
            <div className="hero-arrow">
              <Image
                className="ant-col-xs-0 ant-col-md-24"
                src="/guest/home-arrow-white.svg"
                width={100}
                preview={false}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
