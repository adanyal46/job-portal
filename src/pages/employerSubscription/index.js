import { Card, Col, Flex, Modal, Row, Typography } from "antd";
import { CheckIconSvg, ClockIcon, DashboardPremiumOne, DashboardPremiumTwo } from "../../assets/svg";
import CustomButton from "../../components/customButton";

const TEXT_COLOR = {
  color: "#52595C",
};

const EmployerSubscription = () => {
  const jobSlotPlanData = [
    {
      id: 1,
      title: "Basic",
      price: "$12",
      slot: "02 Job Slots",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Basic",
    },
    {
      id: 2,
      title: "Standard",
      price: "$24",
      slot: "05 Job Slots",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Standard",
    },
    {
      id: 3,
      title: "Premium",
      price: "$64",
      slot: "10 Job Slots",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Premium",
    },
    {
      id: 4,
      title: "Enterprise",
      price: "Contact Admin",
      slot: "10 Job Slots",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Enterprise",
    },
  ];
  const topTalentData = [
    {
      id: 1,
      title: "Basic",
      price: "$12",
      slot: "75 Resume Searches",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Basic",
    },
    {
      id: 2,
      title: "Standard",
      price: "$24",
      slot: "160 Resume Searches",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Standard",
    },
    {
      id: 3,
      title: "Premium",
      price: "$64",
      slot: "250 Resume Searches",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Premium",
    },
    {
      id: 4,
      title: "Enterprise",
      price: "Contact Admin",
      slot: "250 Resume Searches",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, toSed ut perspiciatis unde omnis iste natus error Sed ut ",
      btnTitle: "Go for Enterprise",
    },
  ];

  const purchaseData = [
    {
      id: 1,
      title: "Premium",
      time: "24 days ago",
    },
    {
      id: 2,
      title: "Premium",
      time: "24 days ago",
    },
    {
      id: 3,
      title: "Premium",
      time: "24 days ago",
    },
  ];

  const handleSubscribe = () => {
    Modal.confirm({
      title: <Typography.Text style={{ color: "#0C0C0C", fontSize: "20px" }}>Cancel Subscription</Typography.Text>,
      content: (
        <Typography.Text style={{ color: "##2F2C39" }}>
          Kindly confirm if you want to cancel the subscription. This change will be effective after this month.
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
  return (
    <div>
      <Typography.Title level={3} className="fw-400">
        Subscriptions & Purchases/Upgrades
      </Typography.Title>

      <Row gutter={[12, 12]}>
        <Col lg={16} xl={18}>
          <Typography.Text strong>Job Slots</Typography.Text>
          <Row gutter={[12, 12]} style={{ marginBlock: "15px" }}>
            {jobSlotPlanData?.map((item) => (
              <Col lg={6} key={item.id}>
                <Card style={{ boxShadow: "0px 8px 20px 0px #6061701A" }}>
                  <Typography.Title level={2} style={{ fontWeight: "600", fontSize: "36px" }} className="color-neutral">
                    {item.title}
                  </Typography.Title>
                  <Typography.Text style={{ fontSize: "16px", ...TEXT_COLOR }}>{item.price}</Typography.Text>
                  <Flex gap={6} style={{ marginBottom: "15px", marginTop: "10px" }}>
                    <CheckIconSvg />
                    <Typography.Text style={{ fontSize: "16px", ...TEXT_COLOR }}>{item.slot}</Typography.Text>
                  </Flex>
                  <Typography.Text style={{ ...TEXT_COLOR }}>{item.description}</Typography.Text>
                  <CustomButton block={true} name={item.btnTitle} category="primary" style={{ marginTop: "30px" }} handleClick={handleSubscribe} />
                </Card>
              </Col>
            ))}
          </Row>
          <Typography.Text strong>Search Top Talent</Typography.Text>
          <Row gutter={[12, 12]} style={{ marginTop: "15px" }}>
            {topTalentData?.map((item) => (
              <Col lg={6} key={item.id}>
                <Card style={{ boxShadow: "0px 8px 20px 0px #6061701A" }}>
                  <Typography.Title level={2} style={{ fontWeight: "600", fontSize: "36px" }} className="color-neutral">
                    {item.title}
                  </Typography.Title>
                  <Typography.Text style={{ fontSize: "16px", ...TEXT_COLOR }}>{item.price}</Typography.Text>
                  <Flex gap={6} style={{ marginBottom: "15px", marginTop: "10px" }}>
                    <CheckIconSvg />
                    <Typography.Text style={{ fontSize: "16px", ...TEXT_COLOR }}>{item.slot}</Typography.Text>
                  </Flex>
                  <Typography.Text style={{ ...TEXT_COLOR }}>{item.description}</Typography.Text>
                  <CustomButton block={true} name={item.btnTitle} category="primary" style={{ marginTop: "30px" }} handleClick={handleSubscribe} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={8} xl={6} style={{ marginTop: "35px" }}>
          <Row gutter={[12, 12]}>
            <Col lg={24}>
              <Card>
                <Flex vertical gap={8}>
                  <Typography.Text style={{ ...TEXT_COLOR, fontSize: "16px", fontWeight: "700" }}>Hire a Recruiter</Typography.Text>
                  <Typography.Text className="color-neutral">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </Typography.Text>
                  <CustomButton block={true} name={"See More"} category="primary" style={{ marginTop: "20px" }} />
                </Flex>
              </Card>
            </Col>
            <Col lg={24}>
              <Card>
                <Typography.Title level={4} style={{ color: "#1C1C1C" }}>
                  Purchase History
                </Typography.Title>
                <div style={{ marginBlock: "15px" }} />
                <Flex vertical gap={"large"}>
                  {purchaseData?.map((item) => (
                    <Flex justify="space-between" align="center" key={item.id}>
                      <Typography.Title level={5} style={{ fontWeight: "400", color: "#2F2C39", marginBlock: 0 }}>
                        Job Slots • <strong>{item.title}</strong>
                      </Typography.Title>
                      <Flex align="center">
                        <ClockIcon />
                        <Typography.Text style={{ fontSize: "18px", color: "#2F2C39" }}>{item.time}</Typography.Text>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Card>
            </Col>
            <Col lg={12}>
              <Card bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
                <Flex vertical>
                  <Flex justify="space-between">
                    <Flex vertical gap={0}>
                      <div class="permium-tag">
                        <div className="content-wrapper">Premium</div>
                      </div>
                      <Typography.Title level={4} style={{ fontWeight: "400" }}>
                        16 / <strong>25</strong>
                      </Typography.Title>
                    </Flex>
                    <DashboardPremiumOne />
                  </Flex>
                  <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>Resume Searches</Typography.Text>
                  <CustomButton name="Upgrade" />
                </Flex>
              </Card>
            </Col>
            <Col lg={12}>
              <Card bordered={false} style={{ boxShadow: "0px 4px 18px 0px #4B465C1A" }}>
                <Flex vertical>
                  <Flex justify="space-between">
                    <Flex vertical gap={0}>
                      <div class="permium-tag">
                        <div className="content-wrapper">Premium</div>
                      </div>
                      <Typography.Title level={4} style={{ fontWeight: "400" }}>
                        2 / <strong>5</strong>
                      </Typography.Title>
                    </Flex>
                    <DashboardPremiumTwo />
                  </Flex>
                  <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>Job Postings</Typography.Text>
                  <CustomButton name="Upgrade" />
                </Flex>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EmployerSubscription;
