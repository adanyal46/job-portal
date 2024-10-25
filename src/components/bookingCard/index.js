import { CalendarIcon, ClockIcon } from "../../assets/svg";
import CustomButton from "../customButton";

import "./styles.scss";

const getClassName = (progress) => {
  return progress === "ACCEPTED" ? "completed" : "in-progress";
};
export const BookingCardRecruiter = ({
  mentorName,
  status,
  serviceName,
  date,
  time,
}) => {
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        {serviceName} with <span className="mentor-name">{mentorName}</span>
      </h5>

      {status && (
        <p
          className={`booking-tag-content ${getClassName(
            status === "ACCEPTED" ? "completed" : "in-progress"
          )}`}
        >
          {status}
        </p>
      )}

      <section className="booking-time-slot-container">
        <section className="slot-content">
          <CalendarIcon />

          <p className="slot-info">{new Date(date).toLocaleDateString()}</p>
        </section>

        {/* <section className="slot-content">
          <ClockIcon />

          <p className="slot-info"> {time}</p>
        </section> */}
      </section>

      {/* {!mentorName && (
        <CustomButton
          category="plain"
          classes="reschedule-button"
          name="Reschedule"
        />
      )} */}
    </section>
  );
};

const BookingCard = ({ mentorName, status, serviceName, date, time }) => {
  console.log(status);
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        {serviceName} with <span className="mentor-name">{mentorName}</span>
      </h5>

      {status && (
        <p className={`booking-tag-content ${getClassName(status)}`}>
          {status}
        </p>
      )}

      <section className="booking-time-slot-container">
        <section className="slot-content">
          <CalendarIcon />

          <p className="slot-info">{new Date(date).toDateString()}</p>
        </section>

        <section className="slot-content">
          <ClockIcon />

          <p className="slot-info"> {time}</p>
        </section>
      </section>

      {!mentorName && (
        <CustomButton
          category="plain"
          classes="reschedule-button"
          name="Reschedule"
        />
      )}
    </section>
  );
};

export default BookingCard;
