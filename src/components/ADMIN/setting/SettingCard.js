import { Card, Col, Divider, Flex, Form, Input, Row, Typography } from "antd";
import { AdminSearchIcon, InfoIcon } from "../../../assets/svg";
import CustomButton from "../../customButton";
import PhotoUpload from "../../photoUpload";
import CommonInput from "../../commonInput";

const SettingCard = ({ type = "job-seeker", DIVIDER_COLOR, TEXT_COLOR }) => {
  return (
    <Card>
      <Typography.Title level={5} style={TEXT_COLOR}>
        Manage Users Account
      </Typography.Title>
      <Divider style={DIVIDER_COLOR} />
      <Flex gap={4} align="center" style={{ marginBottom: "10px" }}>
        <InfoIcon />
        <Typography.Text>
          Enter user to search and edit user details
        </Typography.Text>
      </Flex>
      <Input
        size="large"
        style={{ maxWidth: "400px", width: "100%" }}
        placeholder="Search user id"
        prefix={<AdminSearchIcon />}
      />
      <Divider style={DIVIDER_COLOR} />
      <PhotoUpload name="profilePic" />
      <Form layout="vertical" style={{ marginTop: "20px" }} size="large">
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

        <Typography.Title level={5} style={TEXT_COLOR}>
          Change Email Address
        </Typography.Title>
        <Divider style={DIVIDER_COLOR} />
        <Form.Item
          name={"email"}
          label={"Send new Password"}
          style={{ maxWidth: "400px" }}
        >
          <Flex gap={4} align="center" style={{ marginBottom: "10px" }}>
            <InfoIcon />
            <Typography.Text>
              Send an Auto Generate Password to the User’s Email
            </Typography.Text>
          </Flex>
          <CommonInput placeholder="Enter Email " />
        </Form.Item>
        <CustomButton
          category="plain"
          name="Send Password"
          style={{
            marginBottom: "20px",
            backgroundColor: "#E9F0F3",
            borderColor: "#E9F0F3",
          }}
        />

        <Typography.Title level={5} style={TEXT_COLOR}>
          Profile Actions
        </Typography.Title>
        <Divider style={DIVIDER_COLOR} />
        <Flex gap={6}>
          <CustomButton
            category="plain"
            name="Deactivate"
            style={{
              backgroundColor: "#E9F0F3",
              borderColor: "#E9F0F3",
            }}
          />
          <CustomButton
            style={{ backgroundColor: "#E8381A", color: "#fff" }}
            category="plain"
            name="Delete"
          />
        </Flex>
        <Flex justify="end">
          <CustomButton category="primary" name="Save" />
        </Flex>
      </Form>
    </Card>
  );
};

export default SettingCard;
