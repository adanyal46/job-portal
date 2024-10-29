import { useEffect, useState } from "react";
import { Card, Checkbox, Col, Divider, Flex, Form, Image, Input, Row, Select, Typography } from "antd";
import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import { useSelector } from "react-redux";
import CustomButton from "../../components/customButton";

const EmployerSetting = () => {
  let [manageAcountForm] = Form.useForm();
  let [cardForm] = Form.useForm();
  const { user } = useSelector((state) => state.profile);
  const [isAdd, setIsAdd] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits

    // Add a space after every 4 digits
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue); // Update the state with formatted value
  };
  const handleSubmitManageAccount = () => {
    const value = manageAcountForm.getFieldsValue();
  };

  const handleAddNewCardClick = () => {
    setIsAdd(!isAdd);
  };

  const items = [
    {
      key: "1",
      label: "Manage Account",
      children: (
        <Card title={"Change Email Address"}>
          <Form layout={"vertical"} size={"large"}>
            <Row gutter={[12, 12]}>
              <Col flex={1}>
                <Form.Item name={"primaryEmail"} label={"Primary Email"}>
                  <CommonInput placeholder="Enter Primary Email" />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item name={"secondaryEmail"} label={"Secondary Email"}>
                  <CommonInput placeholder="Enter Secondary Email" />
                </Form.Item>
              </Col>
            </Row>
            <Typography.Title level={5}>Change Password</Typography.Title>
            <Divider />
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Form.Item name={"currentPassword"} label={"Current Password"}>
                  <Input.Password placeholder="Enter current Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col flex={"1"}>
                <Form.Item name={"currentPassword"} label={"Current Password"}>
                  <Input.Password placeholder="Enter current Password" />
                </Form.Item>
              </Col>
              <Col flex={"1"}>
                <Form.Item name={"currentPassword"} label={"Current Password"}>
                  <Input.Password placeholder="Enter current Password" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Typography.Title level={5}>Profile Actions</Typography.Title>
          <Divider />
          <Flex gap={6}>
            <CustomButton category="plain" name="Deactivate" classes="deactivate" style={{ backgroundColor: "#E9F0F3" }} />
            <CustomButton category="plain" name="Delete" classes="delete" style={{ backgroundColor: "#E8381A", color: "white" }} />
          </Flex>
          <Flex justify={"end"}>
            <CustomButton category="primary" name="Save" classes="save" handleClick={() => {}} />
          </Flex>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Account Admin",
      children: (
        <Card title="Account Admin Details">
          <Flex style={{ marginBottom: "20px" }}>
            <Image src="/images/no-image.jpg" width={180} preview={false} />
            <Flex vertical>
              <Typography.Title level={4} style={{ marginBottom: "10px" }}>
                Account Admin
              </Typography.Title>
              <Typography.Title level={3} style={{ fontWeight: "400", marginTop: 0 }}>
                Jannet Summers
              </Typography.Title>
              <Typography.Text style={{ color: "#52595C" }}>Jannetsummers@gmail.com</Typography.Text>
              <Typography.Text style={{ color: "#52595C", marginBottom: "10px" }}>+1 305 3216549</Typography.Text>
              <CustomButton name="Details" category="primary" />
            </Flex>
          </Flex>
          <Typography.Title level={4}>Transfer Account</Typography.Title>
          <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />
          <Form layout="vertical" size="large">
            <Row gutter={[12, 12]} align={"middle"}>
              <Col flex={1}>
                <Form.Item name={"adminId"} label={"Enter New Admin ID"}>
                  <CommonInput placeholder="Enter New Admin ID" />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <CustomButton name="Transfer" category="plain" style={{ maxWidth: "200px", width: "200px" }} />
              </Col>
            </Row>
          </Form>
          <Typography.Title level={4}>Change Password</Typography.Title>
          <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />
          <Form layout="vertical" size="large">
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Form.Item name={"currentPassword"} label={"Current Password"}>
                  <Input.Password placeholder="Enter current Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col flex={"1"}>
                <Form.Item name={"currentPassword"} label={"Current Password"}>
                  <Input.Password placeholder="Enter current Password" />
                </Form.Item>
              </Col>
              <Col flex={"1"}>
                <Form.Item name={"currentPassword"} label={"Current Password"}>
                  <Input.Password placeholder="Enter current Password" />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Typography.Title level={4}>Profile Actions</Typography.Title>
          <Divider style={{ marginTop: "5px", borderColor: "#DDDCE2" }} />

          <Flex gap={6}>
            <CustomButton category="plain" name="Deactivate" classes="deactivate" style={{ backgroundColor: "#E9F0F3" }} />
            <CustomButton category="plain" name="Delete" classes="delete" style={{ backgroundColor: "#E8381A", color: "white" }} />
          </Flex>
          <Flex justify={"end"}>
            <CustomButton category="primary" name="Save" classes="save" handleClick={() => {}} />
          </Flex>
        </Card>
      ),
    },
    {
      key: "3",
      label: "Payment Details",
      children: (
        <>
          {!isAdd ? (
            <Card title="Payment Details">
              <CustomButton name="Add a new card" category="plain" style={{ maxWidth: "200px", width: "200px" }} handleClick={handleAddNewCardClick} />
              <Divider style={{ borderColor: "#DDDCE2" }} />
              <Form layout="vertical">
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Form.Item name={"savedCard"} label={"Saved Cards"}>
                      <Select placeholder="Select From Saved Cards" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Flex justify={"end"}>
                <CustomButton category="primary" name="Save" classes="save" handleClick={() => {}} />
              </Flex>
            </Card>
          ) : (
            <Card>
              <Typography.Title level={4} style={{ color: "#2F2C39" }}>
                Add a new card
              </Typography.Title>
              <Typography.Text strong style={{ color: "#2F2C39" }}>
                Fill Out your Card Details
              </Typography.Text>
              <Form layout="vertical" size="large" style={{ marginTop: "20px" }} form={cardForm}>
                <Row gutter={[12, 12]}>
                  {/* First Row */}
                  <Col flex={"1"}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                      <Input placeholder="John.Doe@gmail.com" />
                    </Form.Item>
                  </Col>
                  <Col flex={"1"}>
                    <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true, message: "Please enter your card number" }]}>
                      <Input
                        placeholder="1234 5678 9123 4567"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19} // Max length adjusted for spaces
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {/* Second Row */}
                <Row gutter={[12, 12]}>
                  <Col flex={"1"}>
                    <Form.Item name="nameOnCard" label="Name on Card" rules={[{ required: true, message: "Please enter name on card" }]}>
                      <Input placeholder="John Doe" />
                    </Form.Item>
                  </Col>
                  <Col flex={"1"}>
                    <Form.Item name="expiryDate" label="Expiration Date" rules={[{ required: true, message: "Please enter expiration date" }]}>
                      <Input placeholder="MM/YY" maxLength={5} />
                    </Form.Item>
                  </Col>
                  <Col flex={"1"}>
                    <Form.Item name="cvv" label="CVV" rules={[{ required: true, message: "Please enter CVV" }]}>
                      <Input.Password placeholder="CVV" maxLength={3} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) => (value ? Promise.resolve() : Promise.reject("Please agree to the terms")),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read and agreed to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
                  </Checkbox>
                </Form.Item>
                <Flex justify={"end"} gap={10}>
                  <CustomButton category="plain" name="Go Back" classes="save" handleClick={handleAddNewCardClick} />
                  <CustomButton category="primary" name="Save" classes="save" handleClick={() => {}} />
                </Flex>
              </Form>
            </Card>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "969px", margin: "0 auto", width: "100%" }}>
      <Typography.Title level={3} style={{ fontWeight: "400", color: "#333333" }}>
        Settings
      </Typography.Title>
      <CustomTabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default EmployerSetting;
