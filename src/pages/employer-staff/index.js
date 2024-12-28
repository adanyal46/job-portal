import {
  Card,
  Col,
  DatePicker,
  Flex,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon, EmptyStateRecruiter } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";
import "./styles.scss";
import StaffCard from "../employerDashboard/StaffCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffMember } from "../../features/EMPLOYER/staffMemberSlice";

const FilterTab = () => {
  return (
    <Row gutter={16} style={{ alignItems: "center" }}>
      <Col flex={1}>
        <Input.Search
          size="large"
          placeholder="Search"
          onSearch={(value) => console.log(value)}
        />
      </Col>
      <Col flex={1}>
        <DatePicker
          size="large"
          className="w-100"
          suffixIcon={<CalendarDashboardIcon />}
          placeholder="Date Range"
        />
      </Col>
      <Col flex={1}>
        <DatePicker
          size="large"
          className="w-100"
          suffixIcon={<CalendarDashboardIcon />}
          placeholder="Date Range"
        />
      </Col>
      <Col>
        <CustomButton category="primary" name="Add" />
      </Col>
    </Row>
  );
};

const EmpStaffMember = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.empStaffMember);

  useEffect(() => {
    dispatch(fetchStaffMember());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error,
      });
      return;
    }
  }, [error]);

  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 400 }}>
        Staff Member
      </Typography.Title>
      <Card bordered={false}>
        <FilterTab />
        {Array.isArray(data) && data.length > 0 ? (
          <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
            {data?.map((item, index) => (
              <Col md={8} key={item.id}>
                <StaffCard key={`staff-card-${index}`} {...item} />
              </Col>
            ))}
          </Row>
        ) : (
          <Flex
            style={{ minHeight: "calc(100vh - 30.5vh)" }}
            align="center"
            justify="center"
          >
            <EmptyStateRecruiter />
          </Flex>
        )}

        {Array.isArray(data) && data?.length >= 10 && <CustomPagination />}
      </Card>
    </div>
  );
};

export default EmpStaffMember;
