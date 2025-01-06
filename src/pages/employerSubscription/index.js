import { Card, Col, Flex, message, Modal, Row, Spin, Typography } from "antd";
import {
  CheckIconSvg,
  ClockIcon,
  DashboardPremiumOne,
  DashboardPremiumTwo,
} from "../../assets/svg";
import CustomButton from "../../components/customButton";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDaysAgo } from "../../utils";
const TEXT_COLOR = {
  color: "#52595C",
};

const EmployerSubscription = () => {
  const { user } = useSelector((state) => state.profile);
  const [subscriptionData, setSubscriptionData] = useState({
    jobSlotPlanData: [],
    topTalentData: [],
    purchaseData: [],
    buySubscription: [],
  });
  const [loading, setLoading] = useState(false);

  console.log(subscriptionData);

  useEffect(() => {
    if (user) {
      fetchSubscriptions(user?.id);
    }
  }, [user]);

  const fetchSubscriptions = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance("/employer/subscription/" + id);
      const result = response.data.data;
      setSubscriptionData({
        ...subscriptionData,
        jobSlotPlanData: result?.allSubscriptions?.filter(
          (sub) => sub.resumeSearches === 0
        ),
        topTalentData: result?.allSubscriptions?.filter(
          (sub) => sub.jobSlots === 0
        ),
        purchaseData: result?.purchaseHistory,
      });
      fetchDetailSubscription(id);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailSubscription = async (id) => {
    try {
      const response = await axiosInstance("/employer/buySubscription/" + id);
      const result = response.data.data;
      setSubscriptionData((prevData) => ({
        ...prevData,
        buySubscription: result,
      }));
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    }
  };
  const handleSubscribe = async (subscriptionId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/employer/buySubscription", {
        userId: user?.id,
        subscriptionId,
      });
      if (response.data.success) {
        message.open({
          type: "success",
          content: response.data.message || "Success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleCancelSubscribe = () => {
    Modal.confirm({
      title: (
        <Typography.Text style={{ color: "#0C0C0C", fontSize: "20px" }}>
          Cancel Subscription
        </Typography.Text>
      ),
      content: (
        <Typography.Text style={{ color: "##2F2C39" }}>
          Kindly confirm if you want to cancel the subscription. This change
          will be effective after this month.
        </Typography.Text>
      ),
      okText: "Yes",
      okType: "Confirm",
      cancelText: "Cancel",
      className: "supscription-modal",
      footer: (
        <Flex justify="end" gap={20} style={{ marginTop: "30px" }}>
          <CustomButton name="Cancel" category="plain" />
          <CustomButton name="Confirm" category="primary" />
        </Flex>
      ),
      onOk() {
        console.log("Confirmed!");
        // Add your confirmed action here
      },
      onCancel() {
        console.log("Canceled!");
        // Add your cancel action here
      },
      centered: true,
      style: {
        maxWidth: "700px",
        minWidth: "700px",
        width: "100%",
        textAlign: "center",
      },
    });
  };

  const jobSlotSetting =
    subscriptionData?.buySubscription.length > 0 &&
    subscriptionData?.buySubscription.filter(
      (buySub) => buySub.jobSlots !== null && buySub.jobSlots > 0
    );
  const resumeSlotSetting =
    subscriptionData?.buySubscription.length > 0 &&
    subscriptionData?.buySubscription.filter(
      (buySub) => buySub.resumeSearches !== null && buySub.resumeSearches > 0
    );

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Typography.Title level={3} className="fw-400">
        Subscriptions & Purchases/Upgrades
      </Typography.Title>

      <Row gutter={[12, 12]}>
        <Col lg={16} xl={18}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Text strong>Job Slots</Typography.Text>
            </Col>

            {subscriptionData?.jobSlotPlanData?.length > 0 ? (
              subscriptionData.jobSlotPlanData.map((item) => (
                <Col lg={6} key={item.subscriptionId}>
                  <Card
                    style={{
                      boxShadow: "0px 8px 20px 0px #6061701A",
                      height: "100%",
                    }}
                    styles={{
                      body: {
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        height: "100%",
                      },
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <Typography.Title
                        level={2}
                        style={{ fontWeight: "600", fontSize: "36px" }}
                        className="color-neutral"
                      >
                        {item.subscriptionName}
                      </Typography.Title>
                      <Typography.Text
                        style={{ fontSize: "16px", ...TEXT_COLOR }}
                      >
                        ${item.price}
                      </Typography.Text>
                      <Flex
                        gap={6}
                        style={{ marginBottom: "15px", marginTop: "10px" }}
                      >
                        <CheckIconSvg />
                        <Typography.Text
                          style={{ fontSize: "16px", ...TEXT_COLOR }}
                        >
                          {item.jobSlots} Job Slots
                        </Typography.Text>
                      </Flex>
                      <Typography.Text style={{ ...TEXT_COLOR }}>
                        {item.description}
                      </Typography.Text>
                    </div>
                    <CustomButton
                      block={true}
                      name={"Go for " + item.subscriptionName}
                      category="primary"
                      style={{ marginTop: "20px" }}
                      handleClick={() => handleSubscribe(item.subscriptionId)}
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Card
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    boxShadow: "0px 8px 20px 0px #6061701A",
                  }}
                >
                  <Typography.Title level={4}>
                    No Job Slot Plans Available
                  </Typography.Title>
                  <Typography.Text>
                    Please check back later for available plans.
                  </Typography.Text>
                </Card>
              </Col>
            )}
          </Row>

          <Row gutter={[12, 12]} style={{ marginTop: "15px" }}>
            <Col span={24}>
              <Typography.Text strong>Search Top Talent</Typography.Text>
            </Col>

            {subscriptionData?.topTalentData?.length > 0 ? (
              subscriptionData.topTalentData.map((item) => (
                <Col lg={6} key={item.subscriptionId}>
                  <Card
                    style={{
                      boxShadow: "0px 8px 20px 0px #6061701A",
                      height: "100%",
                    }}
                    styles={{
                      body: {
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        height: "100%",
                      },
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <Typography.Title
                        level={2}
                        style={{ fontWeight: "600", fontSize: "36px" }}
                        className="color-neutral"
                      >
                        {item.subscriptionName}
                      </Typography.Title>
                      <Typography.Text
                        style={{ fontSize: "16px", ...TEXT_COLOR }}
                      >
                        ${item.price}
                      </Typography.Text>
                      <Flex
                        gap={6}
                        style={{ marginBottom: "15px", marginTop: "10px" }}
                      >
                        <CheckIconSvg />
                        <Typography.Text
                          style={{ fontSize: "16px", ...TEXT_COLOR }}
                        >
                          {item.resumeSearches} Resume Searches
                        </Typography.Text>
                      </Flex>
                      <Typography.Text style={{ ...TEXT_COLOR }}>
                        {item.description}
                      </Typography.Text>
                    </div>
                    <CustomButton
                      block={true}
                      name={"Go for " + item.subscriptionName}
                      category="primary"
                      style={{ marginTop: "20px" }}
                      handleClick={() => handleSubscribe(item.subscriptionId)}
                      disabled={true}
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Card
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    boxShadow: "0px 8px 20px 0px #6061701A",
                  }}
                >
                  <Typography.Title level={4}>
                    No Talent Search Plans Available
                  </Typography.Title>
                  <Typography.Text>
                    Please check back later for available plans.
                  </Typography.Text>
                </Card>
              </Col>
            )}
          </Row>
        </Col>

        <Col lg={8} xl={6} style={{ marginTop: "35px" }}>
          <Row gutter={[12, 12]}>
            <Col lg={24}>
              <Card>
                <Flex vertical gap={8}>
                  <Typography.Text
                    style={{
                      ...TEXT_COLOR,
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Hire a Recruiter
                  </Typography.Text>
                  <Typography.Text className="color-neutral">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium{" "}
                  </Typography.Text>
                  <CustomButton
                    block={true}
                    name={"See More"}
                    category="primary"
                    style={{ marginTop: "20px" }}
                  />
                </Flex>
              </Card>
            </Col>
            <Col lg={24}>
              <Card>
                <Typography.Title level={4} style={{ color: "#1C1C1C" }}>
                  Purchase History
                </Typography.Title>
                <div style={{ marginBlock: "15px" }} />
                {subscriptionData?.purchaseData?.length > 0 ? (
                  <Flex vertical gap={"large"}>
                    {subscriptionData.purchaseData.map((item) => (
                      <Flex
                        justify="space-between"
                        align="center"
                        key={item.id}
                      >
                        <Typography.Title
                          level={5}
                          style={{
                            fontWeight: "400",
                            color: "#2F2C39",
                            marginBlock: 0,
                          }}
                        >
                          {item.jobSlots !== 0
                            ? "Job Slots"
                            : "Resume Searches"}{" "}
                          • <strong>{item.name}</strong>
                        </Typography.Title>
                        <Flex align="center" gap={4}>
                          <ClockIcon />
                          <Typography.Text style={{ color: "#2F2C39" }}>
                            {item.broughtAt ? getDaysAgo(item.broughtAt) : ""}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                ) : (
                  <Flex
                    justify="center"
                    align="center"
                    style={{
                      height: "150px",
                      textAlign: "center",
                      color: "#8C8C8C",
                    }}
                  >
                    <Typography.Text>
                      No purchase history available
                    </Typography.Text>
                  </Flex>
                )}
              </Card>
            </Col>

            <Col lg={12}>
              {Array.isArray(resumeSlotSetting) &&
                resumeSlotSetting.length > 0 &&
                resumeSlotSetting?.map((item, index) => (
                  <Card
                    key={index}
                    bordered={false}
                    style={{
                      boxShadow: "0px 4px 18px 0px #4B465C1A",
                      marginBottom: "20px",
                    }}
                  >
                    <Flex vertical>
                      <Flex justify="space-between">
                        <Flex vertical gap={0}>
                          <div class="permium-tag">
                            <div className="content-wrapper">{item?.name}</div>
                          </div>
                          <Typography.Title
                            level={4}
                            style={{ fontWeight: "400" }}
                          >
                            {item?.resumeSearches} /{" "}
                            <strong>{item?.toalResumeSerarches}</strong>
                          </Typography.Title>
                        </Flex>
                        <DashboardPremiumOne />
                      </Flex>
                      <Typography.Text
                        style={{ color: "#52595C", marginBottom: "10px" }}
                      >
                        Resume Searches
                      </Typography.Text>
                      <CustomButton name="Upgrade" />
                    </Flex>
                  </Card>
                ))}
            </Col>
            <Col lg={12}>
              {Array.isArray(jobSlotSetting) &&
                jobSlotSetting.length > 0 &&
                jobSlotSetting?.map((item, index) => (
                  <Card
                    key={index}
                    bordered={false}
                    style={{
                      boxShadow: "0px 4px 18px 0px #4B465C1A",
                      marginBottom: "20px",
                    }}
                  >
                    <Flex vertical>
                      <Flex justify="space-between">
                        <Flex vertical gap={0}>
                          <div class="permium-tag">
                            <div className="content-wrapper">{item?.name}</div>
                          </div>
                          <Typography.Title
                            level={4}
                            style={{ fontWeight: "400" }}
                          >
                            {item?.jobSlots} /{" "}
                            <strong>{item?.totalJobSlots}</strong>
                          </Typography.Title>
                        </Flex>
                        <DashboardPremiumTwo />
                      </Flex>
                      <Typography.Text
                        style={{ color: "#52595C", marginBottom: "10px" }}
                      >
                        Job Postings
                      </Typography.Text>
                      <CustomButton name="Upgrade" />
                    </Flex>
                  </Card>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EmployerSubscription;
