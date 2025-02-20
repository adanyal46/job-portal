import { Input, DatePicker, TimePicker } from "antd";
import { Switch, Case, Default } from "react-if";
import "./styles.scss";
import dayjs from "dayjs"; // Import Day.js

const { TextArea } = Input;

const CommonInput = (props) => {
  const {
    category,
    placeholder,
    prefix,
    classes,
    styles,
    value,
    onChange,
    required = false,
    onEnter,
    name,
    handleClear,
    maxLength,
  } = props;

  const handleDateChange = (date, dateString) => {
    if (onChange) onChange(date, dateString);
  };

  const handleMonthChange = (date) => {
    if (!date) {
      if (onChange) onChange(null);
    } else {
      const startDate = dayjs(date).startOf("month").format("YYYY-MM-DD");
      const endDate = dayjs(date).endOf("month").format("YYYY-MM-DD");
      if (onChange) onChange(startDate, endDate);
    }
  };

  const handleWeekChange = (date) => {
    if (!date) {
      // Clear action
      if (onChange) onChange(null); // or onChange(""); based on your API requirement
    } else {
      const startDate = dayjs(date).startOf("week").format("YYYY-MM-DD");
      const endDate = dayjs(date).endOf("week").format("YYYY-MM-DD");
      if (onChange) onChange(startDate, endDate);
    }
  };

  const handleTimeChange = (time, timeString) => {
    if (onChange) onChange(time, timeString);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(); // Call the onEnter function when Enter is pressed
    }
  };

  // Handle the clear action for the input field
  const handleClearInput = () => {
    if (onChange) onChange("");
    if (handleClear) handleClear();
  };

  return (
    <Switch>
      <Case condition={category === "date"}>
        <DatePicker
          className={`common-datepicker-field ${classes}`}
          placeholder={placeholder}
          onChange={handleDateChange}
          value={value} // Assuming the value is a moment object for DatePicker
          style={styles}
          format={"YYYY-MM-DD"}
        />
      </Case>

      <Case condition={category === "month"}>
        <DatePicker
          className={`common-datepicker-field ${classes}`}
          placeholder={placeholder}
          onChange={handleMonthChange}
          picker="month" // Use month picker
          value={value}
          style={styles}
        />
      </Case>

      <Case condition={category === "week"}>
        <DatePicker
          className={`common-datepicker-field ${classes}`}
          placeholder={placeholder}
          onChange={handleWeekChange}
          picker="week" // Use week picker
          value={value}
          style={styles}
        />
      </Case>

      <Case condition={category === "customDateRange"}>
        <DatePicker.RangePicker
          className={`common-datepicker-field ${classes}`}
          placeholder={placeholder}
          onChange={(dates, dateStrings) => {
            if (onChange) onChange(dateStrings);
          }}
          value={value} // Assuming value is an array of moment objects
          style={styles}
          format={"YYYY-MM-DD"}
        />
      </Case>

      <Case condition={category === "time"}>
        <TimePicker
          format={"h:m"}
          className={`common-datepicker-field ${classes}`}
          placeholder={placeholder}
          onChange={handleTimeChange} // Use handleTimeChange here
          value={value}
          style={styles}
        />
      </Case>

      <Case condition={category === "textarea"}>
        <TextArea
          maxLength={maxLength || 200}
          className={`common-textarea-field ${classes}`}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={value}
          style={styles}
        />
      </Case>

      <Default>
        <Input
          required={required}
          className={`common-input-field ${classes}`}
          placeholder={placeholder}
          prefix={prefix}
          onChange={handleInputChange}
          value={value}
          style={styles}
          allowClear // Enable clear option
          onClear={handleClearInput} // Set the clear handler
          name={name || ""}
          onKeyUp={handleKeyPress}
        />
      </Default>
    </Switch>
  );
};

export default CommonInput;
