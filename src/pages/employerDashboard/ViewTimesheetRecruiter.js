import React, { useEffect, useState } from "react";
import { Table, Card, Row, Col, Typography, Flex, message } from "antd";
import { useParams } from "react-router-dom";
import { getTimesheetDetailApi } from "../../features/employerDashboard/employerDashboardApi";

const { Text, Title } = Typography;

const dataSource = [
  {
    key: "1",
    day: "Monday",
    date: "2023-10-01",
    projectName: "Project Alpha",
    projectDesc: "Initial development",
    industries: "Tech",
    services: "Web Development",
    serviceFee: 30,
    hours: 5,
  },
  {
    key: "2",
    day: "Tuesday",
    date: "2023-10-02",
    projectName: "Project Beta",
    projectDesc: "Testing phase",
    industries: "Finance",
    services: "QA Testing",
    serviceFee: 40,
    hours: 6,
  },
  {
    key: "3",
    day: "Wednesday",
    date: "2023-10-03",
    projectName: "Project Gamma",
    projectDesc: "UI/UX Design",
    industries: "Design",
    services: "UI Design",
    serviceFee: 35,
    hours: 7,
  },
  {
    key: "4",
    day: "Thursday",
    date: "2023-10-04",
    projectName: "Project Delta",
    projectDesc: "Backend API",
    industries: "Healthcare",
    services: "Backend Development",
    serviceFee: 50,
    hours: 4,
  },
  {
    key: "5",
    day: "Friday",
    date: "2023-10-05",
    projectName: "Project Epsilon",
    projectDesc: "Frontend Enhancement",
    industries: "E-commerce",
    services: "Frontend Development",
    serviceFee: 45,
    hours: 8,
  },
  {
    key: "6",
    day: "Saturday",
    date: "2023-10-06",
    projectName: "Project Zeta",
    projectDesc: "Mobile App Development",
    industries: "Retail",
    services: "Mobile Development",
    serviceFee: 60,
    hours: 5,
  },
  {
    key: "7",
    day: "Sunday",
    date: "2023-10-07",
    projectName: "Project Eta",
    projectDesc: "Database Optimization",
    industries: "Education",
    services: "Database Administration",
    serviceFee: 55,
    hours: 3,
  },
];

const columns = [
  { title: "Day", dataIndex: "day", key: "day" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Project Name", dataIndex: "projectName", key: "projectName" },
  {
    title: "Project Description",
    dataIndex: "projectDescription",
    key: "projectDescription",
  },
  { title: "Industries", dataIndex: "industries", key: "industries" },
  { title: "Services", dataIndex: "services", key: "services" },
  {
    title: "Service Fee",
    key: "serviceFee",
    render: (_, record) => `$${record.serviceFee} /hr`,
  },
  { title: "Hours", dataIndex: "hours", key: "hours" },
];

const FooterContent = ({ totalHours, totalFee, timesheetDetail }) => (
  <Card
    styles={{
      body: {
        maxWidth: "calc(100% - 10%)",
        margin: "0 auto",
      },
    }}
  >
    <Flex vertical gap={10}>
      <Row justify="space-between">
        <Col>
          <Title level={5}>Total Hour Worked</Title>
        </Col>
        <Col>
          <Text>${totalHours}/hr</Text>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Title level={5}>Total Amount Due</Title>
        </Col>
        <Col>
          <Text>${totalFee}</Text>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Title level={5}>Total Payable Amount </Title>
        </Col>
        <Col>
          <Title level={5}>Fuse Commission (10%)</Title>
        </Col>
        <Col>
          <Text>${totalFee}</Text>
        </Col>
      </Row>
    </Flex>
    <Row style={{ marginTop: "20px" }}>
      <Title level={3}>Role Details</Title>
    </Row>
    <Flex gap={6} vertical>
      <Row justify="space-between">
        <Col>
          <Text style={{ color: "#2F2C39" }}>Recruiter Name</Text>
        </Col>
        <Col>{timesheetDetail?.recruiterName ?? "N/A"}</Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Text style={{ color: "#2F2C39" }}>Hired by</Text>
        </Col>
        <Col>{timesheetDetail?.HiredBy ?? "N/A"}</Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Text style={{ color: "#2F2C39" }}>Phone Number</Text>
        </Col>
        <Col>{timesheetDetail?.phoneNumber ?? "N/A"}</Col>
      </Row>
    </Flex>
  </Card>
);

const ViewTimeSheetRecruiter = () => {
  const { id } = useParams();
  const [timesheetDetail, setTimesheetDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTimesheetDetail();
    }
  }, [id]);

  const fetchTimesheetDetail = async () => {
    try {
      setLoading(true);
      const response = await getTimesheetDetailApi(id);
      setTimesheetDetail(response.data);
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: error.message || "Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const weeklyTimesheet = timesheetDetail?.weeklyTimesheet;
  const totalFee = weeklyTimesheet?.reduce(
    (sum, row) => sum + (row?.serviceFee || 0) * (row?.hours || 0),
    0
  );
  const totalHour = weeklyTimesheet?.reduce(
    (sum, row) => sum + (row?.hours || 0),
    0
  );

  console.log(timesheetDetail);
  return (
    <div>
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        Dashboard <strong>/</strong> Timesheet
      </Typography.Title>
      <Card style={{ backgroundColor: "#fff" }} loading={loading}>
        <Table
          dataSource={weeklyTimesheet}
          columns={columns}
          pagination={false}
          footer={() => (
            <FooterContent
              totalHours={totalHour}
              totalFee={totalFee}
              timesheetDetail={timesheetDetail}
            />
          )}
        />
      </Card>
    </div>
  );
};

export default ViewTimeSheetRecruiter;
