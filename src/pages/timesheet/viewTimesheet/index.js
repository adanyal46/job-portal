import { DetailsIcon } from "../../../assets/svg";
import CommonInput from "../../../components/commonInput";
import CommonTable from "../../../components/commonTable";
import CustomButton from "../../../components/customButton";
import CustomPagination from "../../../components/customPagination";
import CustomTabs from "../../../components/customTabs";

import "../styles.scss";

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
    dataIndex: "bookingID",
    key: "bookingID",
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
    dataIndex: "bookingID",
    key: "bookingID",
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
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
    render: () => <CustomButton category="additional" name="Add Timesheet" />,
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
  const { role } = props;

  const tableColumns = (arg) => {
    if (arg === "view-timesheet") return viewTimesheetColumns;
    else if (arg === "in-progress-roles") return InprogressRolesColumns;

    return columns;
  };

  return (
    <section className="common-view-timesheet-container">
      <CommonInput classes="view-timesheet-search" placeholder="Search" />

      <CommonTable columns={tableColumns(role)} data={data} />

      <CustomPagination />
    </section>
  );
};

const ViewTimesheet = () => {
  const handleTabChange = (key) => {};

  return (
    <section className="main-layout-container">
      <h3 className="layout-main-heading">Timesheet</h3>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="allRoles"
        items={[
          {
            key: "allRoles",
            label: "All Roles",
            children: <AllRoles role="in-progress-roles" />,
          },
          {
            key: "inProgressRoles",
            label: "In Progress Roles",
            children: <AllRoles role="in-progress-roles" />,
          },
          {
            key: "addTimesheet",
            label: "Add Timesheet",
            children: <AllRoles />,
          },
          {
            key: "viewTimesheets",
            label: "View Timesheets",
            children: <AllRoles role="view-timesheet" />,
          },
        ]}
      />
    </section>
  );
};

export default ViewTimesheet;
