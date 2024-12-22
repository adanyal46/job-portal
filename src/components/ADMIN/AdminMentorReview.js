import React, { useEffect, useState } from "react";
import CustomTabs from "../customTabs";
import { Card, Col, Empty, Flex, message, Rate, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { fetchMentorReviewApi } from "../../features/admin/user/userApi";
import CustomPagination from "../customPagination";

const ReviewList = ({ mentorReview }) => {
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24}>
        {mentorReview?.length === 0 && (
          <Flex justify="center">
            <Empty description="No reviews found!" />
          </Flex>
        )}
      </Col>

      {mentorReview?.map((item, index) => (
        <Col xs={24} md={12} lg={8} key={index}>
          <Card
            style={{ borderColor: "#DBDADE" }}
            bordered
            styles={{
              body: {
                padding: "15px",
              },
            }}
          >
            <Flex align="center" gap={"small"} style={{ marginBottom: "10px" }}>
              <img
                src="/images/review-write-icon.png"
                alt="review-write-icon"
                width={"80px"}
                height={"80px"}
                style={{ borderRadius: "8px" }}
              />
              <Flex vertical gap={0}>
                <Typography.Title level={5}>
                  {item?.fullname ?? "N/A"}
                </Typography.Title>
                <Flex gap={"small"}>
                  <Typography.Text strong>{item.rating ?? 0}</Typography.Text>
                  <Rate disabled defaultValue={item.rating ?? 0} />
                </Flex>
              </Flex>
            </Flex>
            <Typography.Paragraph
              style={{ color: "#2F2C39", minHeight: "20px", height: "100%" }}
            >
              {item.content ?? "N/A"}
            </Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const AdminMentorReview = () => {
  const { id: userId } = useParams();
  const [mentorReview, setMentorReview] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabType, setTabType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (userId && tabType && currentPage) {
      fetchMentorReview(tabType, userId, currentPage);
    }
  }, [userId, tabType, currentPage]);

  const fetchMentorReview = async (userId, tabType, page) => {
    try {
      setLoading(true);
      const result = await fetchMentorReviewApi(userId, tabType, page);
      setMentorReview(result.reviews);
      setPagination(result.pagination);
      setLoading(false);
    } catch (error) {
      message.error(error.message || "Internal Server Error");
      setLoading(false);
    }
  };
  const handleTabChange = (key) => {
    setTabType(key);
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Card loading={loading}>
      <Typography.Title level={3}>Reviews</Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey={tabType}
        items={[
          {
            key: "earliest",
            label: "Earliest",
            children: <ReviewList mentorReview={mentorReview} />,
          },
          {
            key: "latest",
            label: "Latest",
            children: <ReviewList mentorReview={mentorReview} />,
          },
        ]}
      />
      <CustomPagination
        total={pagination?.totalItems}
        pageSize={pagination?.pageSize}
        currentPage={currentPage}
        onChange={handlePaginationChange}
      />
    </Card>
  );
};

export default AdminMentorReview;
