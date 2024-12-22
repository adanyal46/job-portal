import { Button, Col, Flex, Image, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="home-bg">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={14}>
            <div
              style={{
                maxWidth: "700px",
                margin: "auto",
                minHeight: "600px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Flex vertical gap={10}>
                <Typography.Title
                  level={2}
                  style={{
                    fontSize: "48px",
                    color: "#001F3F",
                    fontWeight: "700",
                  }}
                >
                  Find your place at Fuse!
                </Typography.Title>
                <Typography.Text style={{ color: "#2F2F2F", fontSize: "18px" }}>
                  Are you wondering about what your next move should be? Are you
                  a talented individual seeking an exciting new challenge?
                </Typography.Text>
                <Typography.Text style={{ color: "#2F2F2F", fontSize: "18px" }}>
                  Do you want a different way of working? A place where you get
                  rewarded by the effort you put into your work? Or simply a
                  platform Fuse is just the place for you!
                </Typography.Text>
                <Typography.Title level={3}>👋 I am a...</Typography.Title>
                <Flex gap={10} wrap="wrap">
                  <Link to={"/register/JOB_SEEKER"}>
                    <Button
                      shape="round"
                      style={{
                        minHeight: "45px",
                        minWidth: "150px",
                        background:
                          "linear-gradient(100.34deg, #2A7FB7 -1.76%, #2B4054 107.85%)",
                        color: "white",
                      }}
                    >
                      Job Seeker
                    </Button>
                  </Link>
                  <Link to={"/register/MENTOR"}>
                    <Button
                      shape="round"
                      style={{
                        minHeight: "45px",
                        minWidth: "150px",
                        background:
                          " linear-gradient(290.86deg, #2A6F5B -4.11%, #A5E51C 136.14%)",
                        color: "white",
                      }}
                    >
                      Mentor
                    </Button>
                  </Link>
                  <Link to={"/register/RECRUITER"}>
                    <Button
                      shape="round"
                      style={{
                        minHeight: "45px",
                        minWidth: "150px",
                        background:
                          "linear-gradient(102.27deg, #35CBA5 -1.17%, #007E5F 101.77%)",
                        color: "white",
                      }}
                    >
                      Recruiter
                    </Button>
                  </Link>
                  <Link to={"/register/EMPLOYER"}>
                    <Button
                      shape="round"
                      style={{
                        minHeight: "45px",
                        minWidth: "150px",
                        background:
                          "linear-gradient(287.99deg, #001F3F -20.42%, #009DD1 62.87%)",
                        color: "white",
                      }}
                    >
                      Employer
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </div>
          </Col>
          <Col xs={24} md={10}>
            <div style={{ maxWidth: "600px", position: "relative" }}>
              <Image
                src="/guest/home-right-img.svg"
                width={400}
                preview={false}
              />

              <div
                style={{ position: "absolute", right: "50px", top: "-20px" }}
              >
                <Image
                  src="/guest/home-arrow-white.svg"
                  width={100}
                  preview={false}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          background: "#FAFAFA",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          gap: 74,
          alignSelf: "stretch",
          maxWidth: "1920px",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Image
          src="guest/microsoft.svg"
          preview={false}
          width={100}
          height={100}
        />
        <Image src="guest/jp.svg" preview={false} width={150} height={80} />
        <Image src="guest/fedex.svg" preview={false} width={150} height={80} />
        <Image src="guest/tesla.svg" preview={false} width={150} height={80} />
        <Image src="guest/yf.svg" preview={false} width={150} height={80} />
        <Image
          src="guest/chevron.svg"
          preview={false}
          width={150}
          height={80}
        />
        <Image
          src="guest/walmart.svg"
          preview={false}
          width={150}
          height={80}
        />
        <Image src="guest/cvs.svg" preview={false} width={150} height={80} />
      </div>
    </div>
  );
};

export default Home;
