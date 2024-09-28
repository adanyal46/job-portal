import { Input, DatePicker } from "antd";
import { Switch, Case, Default } from "react-if";

import "./styles.scss";

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
  } = props;

  const handleDateChange = (date, dateString) => {
    if (onChange) onChange(date, dateString);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    onChange(capitalizedValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(); // Call the onEnter function when Enter is pressed
    }
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

      <Case condition={category === "textarea"}>
        <TextArea
          maxLength={200}
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
          onKeyPress={handleKeyPress}
        />
      </Default>
    </Switch>
  );
};

export default CommonInput;
