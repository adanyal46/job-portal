import { Button, Card, Checkbox, Form, InputNumber, Typography } from "antd";
import { PlusIcon } from "../../../assets/svg";
import CommonInput from "../../../components/commonInput";
import CustomButton from "../../../components/customButton";
import CustomSelect from "../../../components/customSelect";
import "../styles.scss";
import { useEffect, useState } from "react";
import { getDayDate } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruiterRoleDetail, fetchrecruiterTimeSheetPost } from "../../../features/timesheet/timesheetSlice";
import { useNavigate, useParams } from "react-router-dom";

const industriesOptions = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
];

const servicesOptions = [
  { value: "consulting", label: "Consulting" },
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
  { value: "training", label: "Training" },
];

const managingSupervisors = [
  { value: "1", label: "John Kerry" },
  { value: "2", label: "Alex Mercer" },
  { value: "3", label: "Sarah Connor" },
  // Add more supervisors as needed
];
const roleDetails = {
  recruiterName: "John Kerry",
  hired_by: "Alex Mercer",
  phone_number: "+1 302 3235235",
};
const TotalRow = () => {
  return (
    <section className="time-sheet-total-row-container">
      <section className="customized-total-rows">
        <p className="total-label">Total Hours Worked</p>
        <Form.Item name={`totalHourWork`} noStyle>
          <CommonInput />
        </Form.Item>
      </section>

      <section className="customized-total-rows">
        <p className="total-label">Total Amount Due</p>
        <Form.Item name={`totalDueAmount`} noStyle>
          <CommonInput />
        </Form.Item>
      </section>

      <section className="customized-total-rows half">
        <p className="total-label">Total Payable Amount</p>
        <p className="total-label">Fuse Commission (%):</p>
        <Form.Item name={`totalPayableAmount`} noStyle>
          <CommonInput />
        </Form.Item>
      </section>
    </section>
  );
};

const TimesheetRow = ({ day, date, name }) => {
  return (
    <div className="time-sheet-form-row-container">
      <p>{day}</p>
      <p>{date}</p>

      <Form.Item name={[name, "projectName"]} rules={[{ required: true, message: "Project Name is required" }]} noStyle>
        <CommonInput classes="time-sheet-row-input" placeholder="Project Name" />
      </Form.Item>

      <Form.Item name={[name, "projectDescription"]} rules={[{ required: true, message: "Project Description is required" }]} noStyle>
        <CommonInput classes="time-sheet-row-input" placeholder="Project Description" />
      </Form.Item>

      <Form.Item name={[name, "industries"]} rules={[{ required: true, message: "Industries selection is required" }]} noStyle>
        <CustomSelect classes="time-sheet-row-input" placeholder="Select Industries" height={35} options={industriesOptions} />
      </Form.Item>

      <Form.Item name={[name, "services"]} rules={[{ required: true, message: "Services selection is required" }]} noStyle>
        <CustomSelect classes="time-sheet-row-input" placeholder="Select Services" height={35} options={servicesOptions} />
      </Form.Item>

      <Form.Item name={[name, "serviceFee"]} rules={[{ required: true, message: "Service Fee is required" }]} noStyle>
        <InputNumber classes="time-sheet-row-input" placeholder="Service Fee" className="w-100" suffix="/hr" />
      </Form.Item>

      <Form.Item name={[name, "hours"]} rules={[{ required: true, message: "Hours are required" }]} noStyle>
        <InputNumber classes="time-sheet-row-input" placeholder="Hours" className="w-100" />
      </Form.Item>
    </div>
  );
};

const TimesheetForm = ({ onSubmit, roleDetail }) => {
  const { user } = useSelector((state) => state.profile);
  const [timeSheetForm] = Form.useForm();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const startIndex = todayIndex; // Start with today

  const [checkboxValues, setCheckboxValues] = useState({
    independentContracter: false,
    sendingtoclient: false,
    sendChargestoFuse: false,
  });
  const handleCheckboxChange = (checkedValues) => {
    const updatedCheckboxValues = {
      independentContracter: checkedValues.includes("independentContracter"),
      sendingtoclient: checkedValues.includes("sendingtoclient"),
      sendChargestoFuse: checkedValues.includes("sendChargestoFuse"),
    };
    setCheckboxValues(updatedCheckboxValues);
  };

  const handleValuesChange = (changedValues) => {
    const timesheetRows = timeSheetForm.getFieldValue("weeklyTimesheet") || [];
    const totalFee = timesheetRows.reduce((sum, row) => sum + (row?.serviceFee || 0) * (row?.hours || 0), 0);
    const totalHour = timesheetRows.reduce((sum, row) => sum + (row?.hours || 0), 0);
    // Update total fields in the form
    timeSheetForm.setFieldValue("totalHourWork", totalHour);
    timeSheetForm.setFieldValue("totalDueAmount", totalFee);
    timeSheetForm.setFieldValue("totalPayableAmount", totalFee);
  };

  const handleSubmit = () => {
    timeSheetForm
      .validateFields()
      .then((values) => {
        const timesheetRows = values.weeklyTimesheet || []; // Default to an empty array if undefined
        const weeklyTimesheet = timesheetRows.map((row, index) => {
          const dayIndex = (startIndex + index) % 7;
          return {
            day: daysOfWeek[dayIndex],
            date: getDayDate(daysOfWeek[dayIndex]),
            projectName: row.projectName,
            projectDescription: row.projectDescription,
            industries: row.industries,
            services: row.services,
            serviceFee: row.serviceFee,
            hours: row.hours,
          };
        });

        weeklyTimesheet.push({
          totalDueAmount: values["totalDueAmount"],
          totalHourWork: values["totalHourWork"],
          totalPayableAmount: values["totalPayableAmount"],
        });

        const jsonData = {
          recruitingId: user?.id, // Example ID, adjust as needed
          weeklyTimesheet,
          // totalDueAmount: values["totalDueAmount"],
          // totalHourWork: values["totalHourWork"],
          // totalPayableAmount: values["totalPayableAmount"],
          ...checkboxValues,
          managingSupervisor: values.managingSupervisor,
          recruiterName: roleDetail.recruiterName,
          HiredBy: roleDetail?.hireBy,
          phoneNumber: roleDetail?.phoneNumber,
        };

        // console.log("Submitted Data:", JSON.stringify(jsonData, null, 2));
        onSubmit(jsonData);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Form form={timeSheetForm} layout="vertical" onValuesChange={handleValuesChange}>
      <section className="add-time-sheet-form-wrapper">
        <section className="timesheet-form-header">
          <p className="header-field">Day</p>
          <p className="header-field">Date</p>
          <p className="header-field">Project Name</p>
          <p className="header-field">Project Description</p>
          <p className="header-field">Industries</p>
          <p className="header-field">Services</p>
          <p className="header-field">Service Fee</p>
          <p className="header-field">Hours</p>
        </section>

        <hr />
        <Form.List name="weeklyTimesheet">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                const dayIndex = (startIndex + index) % 7; // Use startIndex directly
                return (
                  <div key={field.key}>
                    <TimesheetRow
                      day={daysOfWeek[dayIndex]} // Get the correct day for the row
                      date={getDayDate(daysOfWeek[dayIndex])} // Get the correct date for the row
                      name={field.name} // Pass the correct name to TimesheetRow
                    />
                    <Button type="link" onClick={() => remove(field.name)}>
                      Remove
                    </Button>
                  </div>
                );
              })}
              <Button type="dashed" onClick={() => add()} block>
                Add Timesheet Row
              </Button>
            </>
          )}
        </Form.List>

        <TotalRow />

        <section className="role-details-wrapper inside-addtimesheet">
          <h4 className="role-heading">Role Details</h4>

          <article className="role-detail-row">
            <p className="label">Recruiter Name</p>
            <p className="value">{roleDetail?.RecruiterName}</p>
          </article>

          <article className="role-detail-row">
            <p className="label">Hired By</p>
            <p className="value">{roleDetail?.hireBy}</p>
          </article>

          <article className="role-detail-row">
            <p className="label">Phone Number</p>
            <p className="value">{roleDetail?.phoneNumber}</p>
          </article>
        </section>

        <p className="select-boxes-heading">Please select the boxes to Continue</p>

        <Form.Item name="checkboxGroup" noStyle>
          <Checkbox.Group onChange={handleCheckboxChange} className="custom-checkbox-group">
            <Checkbox value="independentContracter">Independent contractor agreement.</Checkbox>
            <Checkbox value="sendingtoclient">You are sending this timesheet to client for approval.</Checkbox>
            <Checkbox value="sendChargestoFuse">Send charges to Fuse.</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <article className="field-group-wrapper">
          <label className="select-label">Managing Supervisor</label>
          <Form.Item name="managingSupervisor" rules={[{ required: true, message: "Managing Supervisor is required" }]}>
            <CustomSelect classes="time-sheet-row-input" placeholder="Select Managing Supervisor" height={35} width={460} options={managingSupervisors} />
          </Form.Item>
        </article>
        <section className="timesheet-footer-buttons">
          <CustomButton category="additional" name="Go Back" />
          <CustomButton category="primary" name="Send to Client" handleClick={handleSubmit} />
        </section>
      </section>
    </Form>
  );
};

const AddTimesheet = () => {
  const params = useParams();
  const { roleDetail } = useSelector((state) => state.timesheet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (params && params.id) dispatch(fetchRecruiterRoleDetail(params.id));
  }, [dispatch, params, params?.id]);

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      const response = await dispatch(fetchrecruiterTimeSheetPost(data));
      console.log(response);
      if (response.status === 201) {
        navigate("/employer/timesheet");
      }
    } catch (error) {
      console.log(error);
    }
    // Here you can handle the data submission (e.g., API call)
  };

  return (
    <Card>
      <Typography.Title level={3}>Add Timesheet</Typography.Title>

      <section className="time-sheet-main-container">
        <TimesheetForm onSubmit={handleSubmit} roleDetail={roleDetail} />
      </section>
    </Card>
  );
};

export default AddTimesheet;
