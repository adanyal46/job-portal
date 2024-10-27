import { Card, Flex, message, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../components/customButton";
import { approveNotification } from "../../features/notification/notificationSlice";
import { useDispatch } from "react-redux";

const RecruiterNotificationDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [jobDetails, setJobDetails] = useState([]);
  const [loadingJobDetails, setLoadingJobDetails] = useState(false);

  const TEXT_COLOR = {
    color: "#2F2C39",
  };

  useEffect(() => {
    if (params) {
      fetchJobDetails(params?.id);
    }
  }, [params]);

  const fetchJobDetails = async (hiringId) => {
    setLoadingJobDetails(true);
    try {
      const response = await axiosInstance.get(
        `/Recruiter/recruting/details?hiringId=${hiringId}`
      );
      setJobDetails(response?.data.data);
    } catch (error) {
      console.error("API Fetch Error:", error);
      message.error("Failed to fetch job details.");
    } finally {
      setLoadingJobDetails(false);
    }
  };

  const handleApprove = (data) => {
    Modal.confirm({
      title: `Approve request from ${data?.serviceName}?`,
      content: "Are you sure you want to approve this request?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handleApproveNotify(data);
      },
      onCancel() {
        message.info("Approval cancelled.");
      },
    });
  };
  const handleApproveNotify = async (data) => {
    let formData = {
      hiringId: data?.id,
      status: "APPROVED",
    };
    try {
      const response = await dispatch(approveNotification(formData)).unwrap();
      if (response.success) {
        message.open({
          type: "success",
          content: response.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "969px", margin: "0 auto", width: "100%" }}>
      <Typography.Title level={5} style={{ fontWeight: 400, color: "#4B465C" }}>
        Notifications <strong>/</strong> Job Request
      </Typography.Title>
      <Card loading={loadingJobDetails}>
        <Typography.Title
          level={4}
          style={{ fontWeight: 400, color: "#1C1C1C" }}
        >
          Job Request
        </Typography.Title>
        {jobDetails?.map((item) => {
          return (
            <div key={item.id}>
              {item.hiredServices?.map((data) => (
                <div key={data.id}>
                  <Flex gap={20}>
                    <Flex vertical>
                      <Typography.Text
                        style={{ fontSize: "13px", ...TEXT_COLOR }}
                      >
                        Start Date
                      </Typography.Text>
                      <Typography.Text style={{ color: "#52595C" }}>
                        {new Date(data?.startDate).toLocaleDateString()}
                      </Typography.Text>
                    </Flex>
                    <Flex vertical>
                      <Typography.Text
                        style={{ fontSize: "13px", ...TEXT_COLOR }}
                      >
                        End Date{" "}
                      </Typography.Text>
                      <Typography.Text style={{ color: "#52595C" }}>
                        {new Date(data?.endDate).toLocaleDateString()}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                  <Typography.Title
                    level={5}
                    style={{ ...TEXT_COLOR, marginTop: "10px" }}
                  >
                    {data.service?.name ?? "-"}
                  </Typography.Title>
                  <Typography.Text strong>Job Details</Typography.Text>
                  <br />
                  <Typography.Text style={TEXT_COLOR}>
                    {data.jobDetail ?? "-"}
                  </Typography.Text>
                </div>
              ))}
            </div>
          );
        })}
        <Flex justify="end" gap={6}>
          <Link to={"/recruiter/notifications"}>
            <CustomButton name="Go Back" category="plain" />
          </Link>
          {jobDetails.at(-1)?.recruiterApprovalStatus === "PENDING" && (
            <CustomButton
              name="Approve"
              category="primary"
              handleClick={() => handleApprove(jobDetails.at(-1))}
            />
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default RecruiterNotificationDetail;
