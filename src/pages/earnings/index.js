import CustomTabs from "../../components/customTabs";
import { DownloadIcon, SearchFieldIcon } from "../../assets/svg";

import "./styles.scss";
import CustomButton from "../../components/customButton";
import CommonInput from "../../components/commonInput";
import CommonTable from "../../components/commonTable";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    // render: (id) => <a>{id}</a>,
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Earning",
    dataIndex: "earning",
    key: "earning",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const tableData = [
  {
    key: "1",
    id: "1",
    date: "11 May 2024",
    time: "11:00AM-12:00 noon",
    name: "Pablo Martinez",
    service: "Resume Review",
    earning: "$69.60",
    status: "Paid",
  },
  {
    key: "2",
    id: "2",
    date: "11 May 2024",
    time: "11:00AM-12:00 noon",
    name: "Pablo Martinez",
    service: "Resume Review",
    earning: "$69.60",
    status: "Pending",
  },
  {
    key: "3",
    id: "3",
    date: "11 May 2024",
    time: "11:00AM-12:00 noon",
    name: "Pablo Martinez",
    service: "Resume Review",
    earning: "$69.60",
    status: "Paid",
  },
  {
    key: "4",
    id: "4",
    date: "11 May 2024",
    time: "11:00AM-12:00 noon",
    name: "Pablo Martinez",
    service: "Resume Review",
    earning: "$69.60",
    status: "Pending",
  },
  {
    key: "5",
    id: "5",
    date: "11 May 2024",
    time: "11:00AM-12:00 noon",
    name: "Pablo Martinez",
    service: "Resume Review",
    earning: "$69.60",
    status: "Paid",
  },
];

const LifeTimeEarnings = ({ monthly, weekly, custom }) => {
  return (
    <section className="earnings-main-layout-container">
      <section className="download-buttons-wrapper">
        <CustomButton
          classes="download-button"
          name={
            <article className="button-title">
              <DownloadIcon />
              <p className="title">Download CVS</p>
            </article>
          }
        />
        <CustomButton
          classes="download-button"
          name={
            <article className="button-title">
              <DownloadIcon />
              <p className="title">Download PDF</p>
            </article>
          }
        />
      </section>

      <hr className="form-divider" />

      <section className="earning-detail-container">
        <h4 className="grand-total">$190</h4>
        <p className="earning-detail">
          Your earnings after FuseWW platform commission
        </p>

        <p className="earning-detail">
          Total Billed <span className="amount">$200</span>
        </p>

        <p className="earning-detail">
          Fuse Commission <span className="amount">$10</span>
        </p>
      </section>

      <hr className="form-divider" />

      <section className="earnings-search-fields-wrapper">
        <CommonInput
          classes="earnings-search-field"
          placeholder="Search ID"
          prefix={<SearchFieldIcon />}
        />

        {monthly && (
          <CommonInput
            category="date"
            classes="earnings-select-field"
            placeholder="Select Month"
            prefix={<SearchFieldIcon />}
          />
        )}

        {weekly && (
          <CommonInput
            category="date"
            classes="earnings-select-field"
            placeholder="This Week"
            prefix={<SearchFieldIcon />}
          />
        )}

        {custom && (
          <>
            <CommonInput
              category="date"
              classes="earnings-select-field"
              placeholder="Select From"
              prefix={<SearchFieldIcon />}
            />

            <CommonInput
              category="date"
              classes="earnings-select-field"
              placeholder="Select To"
              prefix={<SearchFieldIcon />}
            />
          </>
        )}
      </section>

      <hr className="form-divider" />

      <section className="earnings-table-wrapper">
        <CommonTable columns={columns} data={tableData} />
      </section>
    </section>
  );
};

const Earnings = () => {
  const handleTabChange = (key) => {
    console.log(key);
  };

  return (
    <section className="main-layout-container">
      <h3 className="layout-main-heading">Earnings</h3>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="lifetimeEarnings"
        items={[
          {
            key: "lifetimeEarnings",
            label: "Lifetime Earnings",
            children: <LifeTimeEarnings />,
          },
          {
            key: "monthlyEarnings",
            label: "Monthly Earnings",
            children: <LifeTimeEarnings monthly />,
          },
          {
            key: "weeklyEarnings",
            label: "Weekly Earnings",
            children: <LifeTimeEarnings weekly />,
          },
          {
            key: "customRange",
            label: "Custom Range",
            children: <LifeTimeEarnings custom />,
          },
        ]}
      />
    </section>
  );
};

export default Earnings;
