import { Button, Card, List, Typography } from "antd";
import React from "react";

const data = [
  {
    image_url: "guest/read-mentor.png", // Replace with actual image URL
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link1", // Replace with actual link
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
    link: "read_more_link5",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link6",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link7",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link8",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link9",
  },
  {
    image_url: "guest/read-mentor.png",
    title: "How To Become a Recruiter: A 9-Step Practical Guide",
    description: "10 mins read",
    link: "read_more_link10",
  },
];

const ReadMentor = () => {
  return (
    <div className="read_mentor">
      <h2>Read what our mentors have to share</h2>
      <List
        grid={{
          gutter: 16, // Spacing between items
          column: 5, // Number of columns per row
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              bordered
              style={{
                borderColor: "#B5B5B5",
                borderRadius: "16px",
              }}
              styles={{
                body: {
                  padding: "12px 16px",
                },
              }}
            >
              <div style={{ textAlign: "center" }}>
                {/* Image inside padding */}
                <img
                  alt={item.title}
                  src={item.image_url}
                  style={{
                    width: "100%", // Full width
                    height: "auto", // Maintain aspect ratio
                    borderRadius: "8px", // Optional border radius
                  }}
                />
              </div>
              <Typography.Title
                level={4}
                style={{ color: "#333333", fontSize: "20px" }}
              >
                {item.title}
              </Typography.Title>
              <Typography.Text
                style={{
                  fontSize: "16px",
                  color: "#333333",
                }}
              >
                {item.description}
              </Typography.Text>
              <br />
              <Button
                size="large"
                style={{
                  marginTop: "15px",
                  borderColor: "#1D91B6",
                  borderRadius: "10px",
                  color: "#1D91B6",
                }}
              >
                Read More
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReadMentor;
