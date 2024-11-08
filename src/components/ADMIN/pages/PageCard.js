import { Card, Divider, Flex, Form, Typography } from "antd";
import React from "react";
import CommonInput from "../../commonInput";
import CustomButton from "../../customButton";

const PageCard = ({ type = "home", TEXT_COLOR, DIVIDER_COLOR }) => {
  return (
    <Card>
      <Card bordered>
        <Typography.Title level={5} style={TEXT_COLOR}>
          Section 1
        </Typography.Title>
        <Divider style={DIVIDER_COLOR} />
        <Form layout="vertical" size="large">
          <Form.Item name={"heading"} label={"Heading"}>
            <CommonInput placeholder="Enter Heading" />
          </Form.Item>
          <Form.Item name={"description"} label={"Description"}>
            <CommonInput category="textarea" placeholder="Enter Sub Text" />
          </Form.Item>

          <Typography.Title level={5} style={TEXT_COLOR}>
            Section 2
          </Typography.Title>
          <Divider style={DIVIDER_COLOR} />
          <Form.Item name={"heading"} label={"Heading"}>
            <CommonInput placeholder="Enter Heading" />
          </Form.Item>
          <Form.Item name={"description"} label={"Description"}>
            <CommonInput category="textarea" placeholder="Enter Sub Text" />
          </Form.Item>
          <Form.Item name={"heading"} label={"Heading"}>
            <CommonInput placeholder="Enter Heading" />
          </Form.Item>
          <Flex gap={10} justify="end">
            <CustomButton name="--" category="plain" />
            <CustomButton name="Save" category="primary" />
          </Flex>
        </Form>
      </Card>
    </Card>
  );
};

export default PageCard;
