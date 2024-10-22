import { Card } from "antd";
import CommonTable from "../../components/commonTable";
import "./styles.scss";

const columns = [
  {
    title: "Day",
    dataIndex: "weekday",
    key: "weekday",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "Project Description",
    dataIndex: "projectDescription",
    key: "projectDescription",
  },
  {
    title: "Industries",
    dataIndex: "industries",
    key: "industries",
  },
  {
    title: "Services",
    dataIndex: "services",
    key: "services",
  },
  {
    title: "Service Fee",
    dataIndex: "serviceFee",
    key: "serviceFee",
  },
  {
    title: "Hours",
    dataIndex: "hours",
    key: "hours",
  },
];

const tableData = [
  {
    key: "1",
    weekday: "Monday",
    date: "07/15/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "5",
  },
  {
    key: "2",
    weekday: "Tuesday",
    date: "07/16/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "5",
  },
  {
    key: "3",
    weekday: "Wednesday",
    date: "07/17/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "5",
  },
  {
    key: "4",
    weekday: "Thursday",
    date: "07/18/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "5",
  },
  {
    key: "5",
    weekday: "Friday",
    date: "07/19/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "5",
  },
  {
    key: "6",
    weekday: "Saturday",
    date: "07/20/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "0",
  },
  {
    key: "7",
    weekday: "Sunday",
    date: "07/21/2024",
    projectName: "Interviews",
    projectDescription: "Interview for 6 openings",
    industries: "Logistics",
    services: "Conduct Interviews",
    serviceFee: "20/hr",
    hours: "0",
  },
];

const Timesheet = () => {
  return (
    <Card>
      <section className="time-sheet-main-container">
        <Typography>Timesheet</Typography>

        <CommonTable columns={columns} data={tableData} />

        <section className="time-total-calculation-wrapper">
          <article className="total-content-wrapper">
            <p>
              <strong>Total Hours Worked</strong>
            </p>
            <p className="total-amount">30/hrs</p>
          </article>

          <article className="total-content-wrapper">
            <p>
              <strong>Total Amount Due</strong>
            </p>
            <p className="total-amount">$1000</p>
          </article>

          <article className="total-content-wrapper">
            <p>
              <strong>Total Payable Amount</strong>
            </p>
            <p>
              <strong>Fuse Commission (%):</strong>
            </p>
            <p className="total-amount">$2000</p>
          </article>
        </section>

        <section className="role-details-wrapper">
          <h4 className="role-heading">Role Details</h4>

          <article className="role-detail-row">
            <p className="label">Recruiter Name</p>
            <p className="value">John Kerry</p>
          </article>

          <article className="role-detail-row">
            <p className="label">Hired By</p>
            <p className="value">Alex Mercer</p>
          </article>

          <article className="role-detail-row">
            <p className="label">Phone Number</p>
            <p className="value">+1 302 3235235</p>
          </article>
        </section>
      </section>
    </Card>
  );
};

export default Timesheet;
