import { CalendarIcon, ClockIcon } from "../../assets/svg";
import CustomButton from "../customButton";

import "./styles.scss";

const getClassName = (progress) => {
  if (progress === "Completed") return "completed";

  return "in-progress";
};

const BookingCard = ({ mentorName, progress, selectedDateTime }) => {
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        Resume Review with <span className="mentor-name">{mentorName}</span>
      </h5>

      {/* <p className={`booking-tag-content ${getClassName(progress)}`}>
        {progress}
      </p> */}

      <section className="booking-time-slot-container">
        <section className="slot-content">
          <CalendarIcon />

          <p className="slot-info">
            {new Date(selectedDateTime).toDateString()}
          </p>
        </section>

        <section className="slot-content">
          <ClockIcon />

          <p className="slot-info">
            {" "}
            {new Date(selectedDateTime).toLocaleTimeString()}
          </p>
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
