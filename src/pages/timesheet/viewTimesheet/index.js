import { Card, Typography } from "antd";
import { DetailsIcon } from "../../../assets/svg";
import CommonInput from "../../../components/commonInput";
import CommonTable from "../../../components/commonTable";
import CustomButton from "../../../components/customButton";
import CustomPagination from "../../../components/customPagination";
import CustomTabs from "../../../components/customTabs";

import "../styles.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecruiterAddTimesheetList, fetchRecruiterProgressRole, fetchRecruiterRole } from "../../../features/timesheet/timesheetSlice";

const viewTimesheetColumns = [
  {
    title: "Timesheet ID",
    dataIndex: "timesheetID",
    key: "timesheetID",
  },
  {
    title: "Booking ID",
    dataIndex: "bookingID",
    key: "bookingID",
  },
  {
    title: "Recruiter Name",
    dataIndex: "recruiterName",
    key: "recruiterName",
  },
  {
    title: "Employer Name",
    dataIndex: "employerName",
    key: "employerName",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <CustomButton category="iconed" icon={<DetailsIcon />} />,
  },
];

const InprogressRolesColumns = [
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    key: "bookingId",
  },
  {
    title: "Employer Name",
    dataIndex: "employerName",
    key: "employerName",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <CustomButton category="iconed" icon={<DetailsIcon />} />,
  },
];

const columns = [
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    key: "bookingId",
  },
  {
    title: "Company Name",
    dataIndex: "CompanyName",
    key: "companyName",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => (
      <Link to="/recruiter/create-timesheet">
        <CustomButton category="additional" name="Add Timesheet" />
      </Link>
    ),
  },
];

const data = [
  {
    key: "1",
    bookingID: "5586468",
    companyName: "Black Box Tech",
    date: "06/22/2024",
    timesheetID: "2211552",
    recruiterName: "Oliver Max",
    employerName: "Black Box Tech",
    startDate: "06/22/2024",
  },
  {
    key: "2",
    bookingID: "5586468",
    companyName: "Black Box Tech",
    date: "06/22/2024",
    timesheetID: "2211552",
    recruiterName: "Oliver Max",
    employerName: "Black Box Tech",
    startDate: "06/22/2024",
  },
  {
    key: "3",
    bookingID: "5586468",
    companyName: "Black Box Tech",
    date: "06/22/2024",
    timesheetID: "2211552",
    recruiterName: "Oliver Max",
    employerName: "Black Box Tech",
    startDate: "06/22/2024",
  },
  {
    key: "4",
    bookingID: "5586468",
    companyName: "Black Box Tech",
    date: "06/22/2024",
    timesheetID: "2211552",
    recruiterName: "Oliver Max",
    employerName: "Black Box Tech",
    startDate: "06/22/2024",
  },
  {
    key: "5",
    bookingID: "5586468",
    companyName: "Black Box Tech",
    date: "06/22/2024",
    timesheetID: "2211552",
    recruiterName: "Oliver Max",
    employerName: "Black Box Tech",
    startDate: "06/22/2024",
  },
];

const AllRoles = (props) => {
  const { role, tableData = [], loading = false } = props;

  const tableColumns = (arg) => {
    if (arg === "view-timesheet") return viewTimesheetColumns;
    else if (arg === "in-progress-roles") return InprogressRolesColumns;

    return columns;
  };

  return (
    <section className="common-view-timesheet-container">
      <CommonInput classes="view-timesheet-search" placeholder="Search" />

      <CommonTable columns={tableColumns(role)} data={tableData} loading={loading} />

      <CustomPagination />
    </section>
  );
};

const ViewTimesheet = () => {
  const [activeKey, setActiveKey] = useState("allRoles");
  const { roles, progressRole, roleLoading, pRoleLoading } = useSelector((state) => state.timesheet);
  const dispatch = useDispatch();
  console.log("roles", progressRole);
  useEffect(() => {
    if (activeKey === "allRoles") {
      dispatch(fetchRecruiterRole());
    } else if (activeKey === "inProgressRoles") {
      dispatch(fetchRecruiterProgressRole());
    } else {
      console.log("Key not found");
    }
    dispatch(fetchRecruiterAddTimesheetList());
  }, [dispatch, activeKey]);

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div>
      <Typography.Title level={2} style={{ fontWeight: "400" }}>
        Timesheet{" "}
      </Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="allRoles"
        items={[
          {
            key: "allRoles",
            label: "All Roles",
            children: (
              <Card>
                <AllRoles tableData={Array.isArray(roles) ? roles : []} loading={roleLoading} />
              </Card>
            ),
          },
          {
            key: "inProgressRoles",
            label: "In Progress Roles",
            children: (
              <Card>
                <AllRoles role="in-progress-roles" loading={pRoleLoading} tableData={progressRole} />
              </Card>
            ),
          },
          {
            key: "addTimesheet",
            label: "Add Timesheet",
            children: (
              <Card>
                <AllRoles />
              </Card>
            ),
          },
          {
            key: "viewTimesheets",
            label: "View Timesheets",
            children: (
              <Card>
                <AllRoles role="view-timesheet" />
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ViewTimesheet;
