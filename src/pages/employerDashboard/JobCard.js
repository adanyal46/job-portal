import { Card, Flex, Typography } from "antd";
import React from "react";
import { MenuEmployerProfileIcon } from "../../assets/svg";

const JobCard = ({ item, TEXT_STYLE }) => {
  return (
    <Card style={{ borderColor: "#DDDCE2" }}>
      <Flex justify="space-between" align="center">
        <Typography.Text style={{ backgroundColor: "#E2F3F9", padding: "4px", color: "#0077A6" }} strong>
          ID: {item.id}
        </Typography.Text>
        <MenuEmployerProfileIcon />
      </Flex>
      <Flex gap={8} className="w-100" style={{ marginTop: "10px" }} vertical>
        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>Job Title</Typography.Text>
          </Flex>
          <Flex flex={1}>
            <Typography.Text style={TEXT_STYLE}>{item.jobTitle}</Typography.Text>
          </Flex>
        </Flex>
        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>Status</Typography.Text>
          </Flex>
          <Flex flex={1}>
            <div
              style={{
                backgroundColor: item.status === "Open" ? "#DAF9E8" : "#F8EEED",
                color: item.status === "Open" ? "#1BBB62" : "#E8381A",
                borderRadius: "6px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
              }}
            >
              {item.status}
            </div>
          </Flex>
        </Flex>
        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>Applications Received</Typography.Text>
          </Flex>
          <Flex flex={1}>
            <Typography.Text style={TEXT_STYLE}>{item.applicationReceived}</Typography.Text>
          </Flex>
        </Flex>

        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>Date of Post</Typography.Text>
          </Flex>
          <Flex flex={1}>
            <Typography.Text style={TEXT_STYLE}>{item.date}</Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default JobCard;
