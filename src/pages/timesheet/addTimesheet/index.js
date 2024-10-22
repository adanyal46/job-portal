import { Card, Checkbox, Typography } from "antd";
import { PlusIcon } from "../../../assets/svg";
import CommonInput from "../../../components/commonInput";
import CustomButton from "../../../components/customButton";
import CustomSelect from "../../../components/customSelect";
import "../styles.scss";

const TotalRow = () => {
  return (
    <section className="time-sheet-total-row-container">
      <section className="customized-total-rows">
        <p className="total-label">Total Hours Worked</p>
        <CommonInput />
      </section>

      <section className="customized-total-rows">
        <p className="total-label">Total Amount Due</p>
        <CommonInput />
      </section>

      <section className="customized-total-rows half">
        <p className="total-label">Total Payable Amount</p>
        <p className="total-label">Fuse Commission (%):</p>
        <CommonInput />
      </section>
    </section>
  );
};

const TimesheetRow = (props) => {
  const { day, date } = props;

  return (
    <section className="time-sheet-form-row-container">
      <p>{day}</p>
      <p>{date}</p>
      <CommonInput classes="time-sheet-row-input" placeholder="" />
      <CommonInput classes="time-sheet-row-input" placeholder="" />
      <CustomSelect
        classes="time-sheet-row-input"
        placeholder="Select Industries"
        height={35}
      />
      <CustomSelect
        classes="time-sheet-row-input"
        placeholder="Select Services"
        height={35}
      />
      <CommonInput classes="time-sheet-row-input" placeholder="" />
      <CommonInput classes="time-sheet-row-input" placeholder="" />
      <CustomButton
        classes="time-sheet-row-input"
        category="iconed"
        shape="square"
        icon={<PlusIcon />}
      />
    </section>
  );
};

const TimesheetForm = () => {
  return (
    <section className="add-time-sheet-form-wrapper">
      <section className="timesheet-form-header">
        <p className="header-field">Day</p>
        <p className="header-field">Date</p>
        <p className="header-field">Project Name</p>
        <p className="header-field">Project Description </p>
        <p className="header-field">Industries</p>
        <p className="header-field">Services</p>
        <p className="header-field">Service Fee</p>
        <p className="header-field">Hours</p>
      </section>

      <hr />

      <TimesheetRow day="Monday" date="07/15/2024" />
      <TimesheetRow day="Tuesday" date="07/16/2024" />
      <TimesheetRow day="Wednesday" date="07/17/2024" />
      <TimesheetRow day="Thursday" date="07/18/2024" />
      <TimesheetRow day="Friday" date="07/19/2024" />
      <TimesheetRow day="Saturday" date="07/20/2024" />
      <TimesheetRow day="Sunday" date="07/21/2024" />

      <TotalRow />

      <section className="role-details-wrapper inside-addtimesheet">
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

      <p className="select-boxes-heading">
        Please select the boxes to Continue
      </p>

      <Checkbox.Group
        //   style={{
        //     width: "100%",
        //   }}
        // onChange={onChange}
        className="custom-checkbox-group"
      >
        <Checkbox value="A">Independent contractor agreement.</Checkbox>
        <Checkbox value="B">
          You are sending this timesheet to client for approval.
        </Checkbox>
        <Checkbox value="C">Send charges to Fuse.</Checkbox>
      </Checkbox.Group>

      <article className="field-group-wrapper">
        <label className="select-label">Managing Supervisor</label>
        <CustomSelect
          classes="time-sheet-row-input"
          placeholder="Select Managing Supervisor"
          height={35}
          width={460}
        />
      </article>

      <section className="timesheet-footer-buttons">
        <CustomButton category="additional" name="Go Back" />
        <CustomButton category="primary" name="Send to Client" />
      </section>
    </section>
  );
};

const AddTimesheet = () => {
  return (
    <Card>
      <Typography.Title level={3}>Add Timesheet</Typography.Title>

      <section className="time-sheet-main-container">
        <TimesheetForm />
      </section>
    </Card>
  );
};

export default AddTimesheet;
