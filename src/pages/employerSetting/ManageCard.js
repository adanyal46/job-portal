import React, { useEffect } from "react";
import CustomButton from "../../components/customButton";
import {
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

const formatCardNumber = (value) => {
  const cleanValue = value?.replace(/\D/g, "") || "";
  const formattedValue = cleanValue.match(/.{1,4}/g)?.join(" ") || "";

  return formattedValue;
};

const formatExpiryDate = (value) => {
  const cleanValue = value?.replace(/\D/g, "") || "";
  if (cleanValue.length <= 2) {
    return cleanValue;
  }

  return `${cleanValue.substring(0, 2)}/${cleanValue.substring(2, 4)}`;
};
const ManageCard = ({
  isAdd,
  handleAddNewCardClick,
  handleSaveCard,
  loading,
  cards,
}) => {
  const [cardForm] = Form.useForm();
  const cardOptions = cards?.map((card) => ({
    label: `${card.cardHolderName} - **** **** **** ${card.cardNumber.slice(
      -4
    )}`,
    value: card.id,
  }));

  useEffect(() => {
    if (isAdd) {
      cardForm.resetFields();
    }
  }, [isAdd]);

  return (
    <>
      {!isAdd ? (
        <Card title="Payment Details">
          <CustomButton
            name="Add a new card"
            category="plain"
            style={{ maxWidth: "200px", width: "200px" }}
            handleClick={handleAddNewCardClick}
          />
          <Divider style={{ borderColor: "#DDDCE2" }} />
          <Form layout="vertical">
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Form.Item name={"savedCard"} label={"Saved Cards"}>
                  <Select
                    placeholder="Select From Saved Cards"
                    options={cardOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Flex justify={"end"}>
            <CustomButton
              category="primary"
              name="Save"
              classes="save"
              handleClick={() => {}}
            />
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
          <Form
            layout="vertical"
            size="large"
            style={{ marginTop: "20px" }}
            onFinish={handleSaveCard}
            form={cardForm}
          >
            <Row gutter={[12, 12]}>
              {/* First Row */}
              <Col flex={"1"}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input placeholder="John.Doe@gmail.com" />
                </Form.Item>
              </Col>
              <Col flex={"1"}>
                <Form.Item
                  name="cardNumber"
                  label="Card Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your card number",
                    },
                    {
                      validator(_, value) {
                        // Validate the card number to ensure it matches the pattern '1234 5678 9012 3456'
                        const cardNumberPattern = /^(\d{4}\s){3}\d{4}$/;

                        if (cardNumberPattern.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "Card number must have spaces after every 4 digits (e.g., 1234 5678 9012 3456)"
                          )
                        );
                      },
                    },
                  ]}
                  normalize={(value) => formatCardNumber(value)}
                >
                  <Input placeholder="1234 5678 9123 4567" />
                </Form.Item>
              </Col>
            </Row>
            {/* Second Row */}
            <Row gutter={[12, 12]}>
              <Col flex={"1"}>
                <Form.Item
                  name="cardHolderName"
                  label="Name on Card"
                  rules={[
                    {
                      required: true,
                      message: "Please enter name on card",
                    },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col flex={"1"}>
                <Form.Item
                  name="expiryDate"
                  label="Expiration Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter expiration date",
                    },
                  ]}
                  normalize={(value) => formatExpiryDate(value)}
                >
                  <Input placeholder="MM/YY" maxLength={5} />
                </Form.Item>
              </Col>
              <Col flex={"1"}>
                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[{ required: true, message: "Please enter CVV" }]}
                >
                  <Input.Password placeholder="CVV" maxLength={3} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Please agree to the terms"),
                },
              ]}
            >
              <Checkbox>
                I have read and agreed to the <a href="#">Terms & Conditions</a>{" "}
                and <a href="#">Privacy Policy</a>.
              </Checkbox>
            </Form.Item>
            <Flex justify={"end"} gap={10}>
              <CustomButton
                category="plain"
                name="Go Back"
                classes="save"
                handleClick={handleAddNewCardClick}
              />
              <CustomButton
                category="primary"
                name="Save"
                classes="save"
                loading={loading}
              />
            </Flex>
          </Form>
        </Card>
      )}
    </>
  );
};

export default ManageCard;
