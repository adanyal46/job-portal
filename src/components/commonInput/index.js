import { Input, DatePicker } from "antd";
import { Switch, Case, Default } from "react-if";

import "./styles.scss";

const { TextArea } = Input;

const CommonInput = (props) => {
  const { category, placeholder, prefix, classes, styles } = props;

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Switch>
      <Case condition={category === "date"}>
        <DatePicker
          className={`common-datepicker-field ${classes}`}
          placeholder={placeholder}
          onChange={onChange}
          style={styles}
        />
      </Case>

      <Case condition={category === "textarea"}>
        <TextArea
          maxLength={100}
          className={`common-textarea-field ${classes}`}
          // onChange={onChange}
          placeholder={placeholder}
        />
      </Case>

      <Default>
        <Input
          className={`common-input-field ${classes}`}
          placeholder={placeholder}
          prefix={prefix}
        />
      </Default>
    </Switch>
  );
};

export default CommonInput;
