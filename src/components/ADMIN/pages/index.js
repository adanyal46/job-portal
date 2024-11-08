import { Card, Divider, Flex, Form, Typography } from "antd";
import React from "react";
import CustomTabs from "../../customTabs";
import CommonInput from "../../commonInput";
import CustomButton from "../../customButton";
import PageCard from "./PageCard";
const TEXT_COLOR = {
  color: "#0C0C0C",
};
const DIVIDER_COLOR = {
  borderColor: "#DDDCE2",
  marginTop: 0,
};

const Pages = () => {
  return (
    <div style={{ margin: "0 auto", maxWidth: "915px", width: "100%" }}>
      <Typography.Title level={3} className="fw-400" style={TEXT_COLOR}>
        Pages
      </Typography.Title>
      <div>
        <CustomTabs
          items={[
            {
              key: "1",
              label: "Home",
              children: (
                <PageCard
                  TEXT_COLOR={TEXT_COLOR}
                  DIVIDER_COLOR={DIVIDER_COLOR}
                />
              ),
            },
            {
              key: "2",
              label: "Mentorship",
              children: (
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

                      <Flex gap={10} justify="end">
                        <CustomButton name="--" category="plain" />
                        <CustomButton name="Save" category="primary" />
                      </Flex>
                    </Form>
                  </Card>
                </Card>
              ),
            },
            {
              key: "3",
              label: "Partners",
              children: (
                <PageCard
                  TEXT_COLOR={TEXT_COLOR}
                  DIVIDER_COLOR={DIVIDER_COLOR}
                  type="Partners"
                />
              ),
            },
            {
              key: "4",
              label: "Employer",
              children: (
                <PageCard
                  TEXT_COLOR={TEXT_COLOR}
                  DIVIDER_COLOR={DIVIDER_COLOR}
                  type="Employer"
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Pages;
