import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Divider,
  Flex,
  Input,
  Table,
  message,
  Empty,
  Collapse,
  Checkbox,
  Button,
} from "antd";

import { Link, useParams } from "react-router-dom";

import Rating from "../../rating";
import {
  BriefcaseIcon,
  InfoIcon,
  MentorBriefcaseIcon,
  MentorTranslateIcon,
  VerifiedIcon,
  WorkIndustriesIcon,
} from "../../../assets/svg";
import ReviewCard from "../../reviewCard";
import RecruiterVideoContainer from "../../RecruiterVideoContainer";
import LocationWithIcon from "../../locationWithIcon";
import CustomPagination from "../../customPagination";
import CustomButton from "../../customButton";
import axiosInstance from "../../../api/axiosInstance";
import MentorServiceCollapse from "../../mentorServiceCollapse";
import ProfileStatus from "../components/ProfileStatus";

const { Title, Text } = Typography;

const AdminMentorProfile = ({ action = false }) => {
  const { id } = useParams();
  const [recruiterDetail, setRecruiterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [timesheetLoading, setTimesheetLoading] = useState(true);
  const [timsheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchRecruiterInfo = async () => {
      try {
        const result = await axiosInstance.get("/admin/mentorProfile/" + id);
        setRecruiterDetail(result.data.data?.[0]);
      } catch (error) {
        message.error(
          error.message || "Failed to fetch job details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterInfo();
    if (id) {
      fetchTimesheetList();
    }
  }, [id]);

  const fetchTimesheetList = async () => {
    try {
      setTimesheetLoading(true);
      // const response = await getTimesheetListByRecruiter(id);
      // setTimesheets(response.data);
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: error.message || "Server Error",
      });
    } finally {
      setTimesheetLoading(false);
    }
  };

  const TEXT_STYLE = { fontSize: "16px" };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <>{new Date(record.createdAt).toLocaleDateString()}</>
      ),
    },
    {
      title: "Service",
      dataIndex: "hiredServices",
      key: "hiredServices",
      render: (_, record) => {
        const services = record?.recruiterHiring?.hiredServices?.flatMap(
          (item) => item.service.name
        );

        return (
          <>
            {services?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "recruiterHiring",
      key: "recruiterHiring",
      render: (_, record) => {
        const services = record?.recruiterHiring?.hiredServices.map(
          (item) => item.service.pricing
        );
        const totalPrice = services.reduce((acc, curr) => acc + curr, 0);
        return <>{totalPrice}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={"/employer/view-timesheet-recruiter/" + record?.id}>
          <CustomButton name="View" category="plain" />
        </Link>
      ),
    },
  ];
  const servicePricing = timsheets
    ?.flatMap((timesheet) => timesheet.recruiterHiring.hiredServices)
    .map((item) => item.service.pricing);

  const updateProfileStatus = async (status) => {
    if (status === recruiterDetail.profilestatus) {
      message.open({
        type: "info",
        content: "Status is already " + status,
      });
      return;
    }

    setStatusLoading(true);
    try {
      const response = await axiosInstance.put("/admin/updateUserStatus", {
        userId: recruiterDetail.id,
        userStatus: status,
      });
      message.open({
        type: "success",
        content: response.data.message || "Status Updated!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <Row gutter={16}>
      {/* Left Card - Profile Details */}
      <Col span={16}>
        <Card style={{ height: "100%" }} loading={loading}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={6}>
              <img
                src={
                  recruiterDetail?.avatarId
                    ? recruiterDetail?.avatarId
                    : "/images/no-image.jpg"
                }
                alt="Profile"
                style={{
                  width: "200px",
                  height: "250px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col span={18}>
              <Flex vertical gap={8}>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {(recruiterDetail?.fullName || recruiterDetail?.name) ?? "-"}
                </Title>
                <Rating rating={0} reviews={0} />
                <LocationWithIcon location={recruiterDetail?.location ?? "-"} />

                <Text block style={{ ...TEXT_STYLE, color: "#333333" }}>
                  Recruiter at Atos
                </Text>
                <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                  {recruiterDetail?.email ?? "-"}
                </Text>
                <Text block style={{ ...TEXT_STYLE, color: "#52595C" }}>
                  {recruiterDetail?.phoneNumber ?? "-"}
                </Text>
                <a href="#" className="verified-profile">
                  <VerifiedIcon />
                  Verified
                </a>
              </Flex>
            </Col>
          </Row>
          <hr className="mentor-detail-divider" />
          <article className="I-can-do-container">
            <p className="i-can-do-item">
              <span
                style={{
                  position: "relative",
                  top: "7px",
                  marginRight: "10px",
                }}
              >
                <MentorTranslateIcon />
              </span>
              I can Speak{" "}
              <strong>{recruiterDetail?.language ?? "English"}</strong>{" "}
              (Conversational)
            </p>

            {recruiterDetail?.services &&
              Array.isArray(recruiterDetail?.services) &&
              recruiterDetail?.services.length > 0 && (
                <p className="i-can-do-item">
                  <span
                    style={{
                      position: "relative",
                      top: "7px",
                      marginRight: "10px",
                    }}
                  >
                    <MentorBriefcaseIcon />
                  </span>
                  I can help you{" "}
                  <>
                    {recruiterDetail?.services?.map((service) => (
                      <strong key={service.id}>{service.name},</strong>
                    ))}
                  </>
                  and more
                </p>
              )}
          </article>

          <hr className="mentor-detail-divider" style={{ marginTop: "10px" }} />

          <div style={{ marginBlock: "20px" }}>
            <Typography.Title level={3}>Hired For</Typography.Title>
            <Flex gap={6}>
              {recruiterDetail?.services?.map((item, index) => (
                <Tag
                  key={index}
                  style={{
                    borderRadius: "8px",
                    padding: "4px 12px",
                    backgroundColor: "#EFF3F4",
                    color: "#2F2C39",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {item?.name || item.service?.name}
                </Tag>
              ))}
            </Flex>
          </div>

          <hr className="mentor-detail-divider" />

          <article
            className="about-mentor-container"
            style={{ marginBlock: "20px" }}
          >
            <Typography.Title level={3}>Reviews</Typography.Title>
            {recruiterDetail?.review?.length > 0 ? (
              <Flex className="review-cards-layout" gap={"small"}>
                <ReviewCard />
              </Flex>
            ) : (
              <Empty description="No Review Found" />
            )}
            {recruiterDetail?.review?.length >= 10 && <CustomPagination />}
          </article>
          {/* <Typography.Title level={3}>Timesheet</Typography.Title>
          {timsheets?.length > 0 ? (
            <>
              <Typography.Title level={3}>${totalPrice}</Typography.Title>
              <Typography.Title level={5}>
                You Earning after fuse platform fee
              </Typography.Title>
              <Typography.Title level={5}>
                Total Bill {totalPrice}$
              </Typography.Title>
              <Typography.Title level={5}>Total Fee 0$</Typography.Title>

              <Divider />
              <Input.Search
                size="large"
                placeholder="Search"
                style={{ maxWidth: "50%" }}
              />
              <Divider />

              <Table
                loading={timesheetLoading}
                dataSource={timsheets}
                size="small"
                columns={columns}
                pagination={false}
                rowKey={"id"}
              />
            </>
          ) : (
            <Empty description="No Timesheet found" />
          )} */}
        </Card>
      </Col>

      {/* Right Card - Additional Content */}
      <Col span={8}>
        <RecruiterVideoContainer canUpload={false} />
        <Card loading={loading} style={{ marginTop: "10px" }}>
          <Flex gap={5}>
            <BriefcaseIcon />
            <Typography.Title
              level={4}
              style={{ ...TEXT_STYLE, fontWeight: "400" }}
            >
              Services
            </Typography.Title>
          </Flex>
          <Flex gap={5}>
            <InfoIcon />
            <Typography.Text style={TEXT_STYLE}>
              Please click on the check boxes to select a service.
            </Typography.Text>
          </Flex>
          {recruiterDetail?.services && recruiterDetail?.services.length > 0 ? (
            <MentorServiceCollapse
              services={recruiterDetail?.services}
              isStarted={false}
            />
          ) : (
            <Empty description="No Services Found" />
          )}
        </Card>
      </Col>
      {action && (
        <Col xs={24} style={{ marginTop: "20px" }}>
          <CustomButton
            name="Approve"
            category="primary"
            handleClick={() => updateProfileStatus("APPROVED")}
            loading={statusLoading}
          />
          <CustomButton
            name="Disapprove"
            category="plain"
            handleClick={() => updateProfileStatus("DISAPPROVED")}
            loading={statusLoading}
            style={{
              backgroundColor: "#E9F0F3",
              color: "#2F2C39",
              marginLeft: "20px",
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export default AdminMentorProfile;
