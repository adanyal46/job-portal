import { Card, Flex, Typography, Dropdown, Menu } from "antd";
import React from "react";
import { MenuEmployerProfileIcon } from "../../assets/svg";
import { Link } from "react-router-dom";

const JobCard = ({ item, TEXT_STYLE }) => {
  // Define the menu items
  const menu = (
    <Menu>
      <Menu.Item key="edit">
        <Link to={`/employer/edit-job/1`}>Edit Job</Link>
      </Menu.Item>
      {/* Add more menu items as needed */}
    </Menu>
  );

  return (
    <Card style={{ borderColor: "#DDDCE2" }}>
      <Flex justify="space-between" align="center">
        <Typography.Text
          style={{
            backgroundColor: "#E2F3F9",
            padding: "4px",
            color: "#0077A6",
          }}
          strong
        >
          ID: {item.id}
        </Typography.Text>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          overlayStyle={{ width: "200px" }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <MenuEmployerProfileIcon
              style={{ fontSize: "20px", cursor: "pointer" }}
            />
          </a>
        </Dropdown>
      </Flex>
      <Flex gap={8} className="w-100" style={{ marginTop: "10px" }} vertical>
        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>
              Job Title
            </Typography.Text>
          </Flex>
          <Flex flex={1}>
            <Link to={`/employer/job-detail/1`}>
              <Typography.Text style={{ ...TEXT_STYLE }}>
                {item.jobTitle}
              </Typography.Text>
            </Link>
          </Flex>
        </Flex>
        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>
              Status
            </Typography.Text>
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
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>
              Applications Received
            </Typography.Text>
          </Flex>
          <Flex flex={1}>
            <Typography.Text style={TEXT_STYLE}>
              {item.applicationReceived}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex align="center" className="w-100">
          <Flex flex={1}>
            <Typography.Text style={{ ...TEXT_STYLE, fontWeight: "500" }}>
              Date of Post
            </Typography.Text>
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
