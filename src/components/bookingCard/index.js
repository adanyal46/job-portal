import { CalendarIcon, ClockIcon } from "../../assets/svg";
import CustomButton from "../customButton";

import "./styles.scss";

const getClassName = (progress) => {
  if (progress === "Completed") return "completed";

  return "in-progress";
};
export const BookingCardRecruiter = ({
  mentorName,
  progress,
  serviceName,
  date,
  time,
}) => {
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        {serviceName} with <span className="mentor-name">{mentorName}</span>
      </h5>

      <p className={`booking-tag-content ${getClassName(progress)}`}>
        {progress}
      </p>

      <section className="booking-time-slot-container">
        <section className="slot-content">
          <CalendarIcon />

          <p className="slot-info">{new Date(date).toDateString()}</p>
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

const BookingCard = ({ mentorName, progress, serviceName, date, time }) => {
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        {serviceName} with <span className="mentor-name">{mentorName}</span>
      </h5>

      {/* <p className={`booking-tag-content ${getClassName(progress)}`}>
        {progress}
      </p> */}

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
