import { Button, Card, List, Typography } from "antd";
import React from "react";
import "./ReadMentor.css"; // Import the CSS file

const data = [
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link1",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link2",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link3",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link4",
  },
];

const ReadMentor = () => {
  return (
    <div className="read-mentor-container">
      <h2 className="read-mentor-title">Read what our mentors have to share</h2>
      <List
        grid={{
          gutter: 24,
          xs: 1, // 1 column on extra small screens
          sm: 2, // 2 columns on small screens
          md: 3, // 3 columns on medium screens
          lg: 3, // 4 columns on large screens
          xl: 5, // 5 columns on extra large screens
          xxl: 5,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              className="read-mentor-card"
              styles={{
                body: {
                  padding: "16px",
                },
              }}
            >
              <div className="read-mentor-image">
                <img alt={item.title} src={item.image_url} />
              </div>
              <Typography.Title level={4} className="read-mentor-card-title">
                {item.title}
              </Typography.Title>
              <Typography.Text className="read-mentor-card-text">
                {item.description}
              </Typography.Text>
              <br />
              <Button className="read-mentor-button">Read More</Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReadMentor;
