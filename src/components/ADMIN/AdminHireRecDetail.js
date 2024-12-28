import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Table, Row, Col, message } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { formatDateToShort } from "../../utils";

const { Title, Text } = Typography;

const AdminHireRecDetail = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetchDetail(bookingId);
  }, [bookingId]);

  const fetchDetail = async (bookingId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/admin/getRecruiterHiringDetail/" + bookingId
      );
      setDetail(
        {
          ...response.data,
          serviceDetails: [{ ...response.data.serviceDetails }],
        } || {}
      );
    } catch (error) {
      message.open({
        type: "error",
        content: error?.response?.data?.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const dummyData = {
    bookingId: "BID12345",
    recruiterName: "John Doe",
    companyName: "Tech Solutions Inc.",
    startDate: "24 Dec 2024",
    selectedServices: [
      {
        industryName: "Technology",
        serviceName: "Software Development",
        pricePerHour: "$50/hour",
      },
    ],
  };

  const columns = [
    {
      title: "Industry Name",
      dataIndex: "industryName",
      key: "industryName",
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price/Hours",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div style={{ width: "100%", margin: "20px auto", maxWidth: "800px" }}>
      <Typography.Title
        level={4}
        style={{ color: "#4B465C", fontSize: "15px" }}
      >
        Hired Recruiter / Details
      </Typography.Title>
      <Card loading={loading}>
        {/* Details Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col span={12}>
            <Text strong style={{ fontSize: "16px", color: "#2F2C39" }}>
              Booking ID:
            </Text>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: "16px", color: "#1C1C1C" }}>
              #{detail?.bookingId}
            </div>
          </Col>
          <Col span={12}>
            <Text strong style={{ fontSize: "16px", color: "#2F2C39" }}>
              Recruiter Name:
            </Text>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: "16px", color: "#1C1C1C" }}>
              {detail?.recruiterName}
            </div>
          </Col>
          <Col span={12}>
            <Text strong style={{ fontSize: "16px", color: "#2F2C39" }}>
              Hired By (Company Name):
            </Text>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: "16px", color: "#1C1C1C" }}>
              {detail?.appliedOn ? formatDateToShort(detail?.appliedOn) : "N/A"}
            </div>
          </Col>
          <Col span={12}>
            <Text strong style={{ fontSize: "16px", color: "#2F2C39" }}>
              Start Date:
            </Text>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: "16px", color: "#1C1C1C" }}>
              {detail?.appliedOn ? formatDateToShort(detail?.appliedOn) : "N/A"}
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div style={{ marginTop: "20px" }}>
          <Title level={5}>Selected Services</Title>
          <Table
            columns={columns}
            dataSource={
              detail?.serviceDetails &&
              Array.isArray(detail?.serviceDetails) &&
              detail?.serviceDetails.length > 0
                ? detail?.serviceDetails
                : []
            }
            pagination={false}
            rowKey={(record) => record.serviceName}
          />
        </div>

        {/* Approve Button */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            style={{
              backgroundColor: "#E9F0F3",
              color: "#2F2C39",
              fontWeight: 600,
            }}
            size="large"
          >
            Approve
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminHireRecDetail;
