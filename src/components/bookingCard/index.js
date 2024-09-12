import { CalendarIcon, ClockIcon } from "../../assets/svg";
import CustomButton from "../customButton";

import "./styles.scss";

const getClassName = (progress) => {
  if (progress === "Completed") return "completed";

  return "in-progress";
};

const BookingCard = ({ mentor, progress }) => {
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        Resume Review with <span className="mentor-name">Olivia Roy</span>
      </h5>

      <p className={`booking-tag-content ${getClassName(progress)}`}>
        {progress}
      </p>

      <section className="booking-time-slot-container">
        <section className="slot-content">
          <CalendarIcon />

          <p className="slot-info">20 Jan, 2024</p>
        </section>

        <section className="slot-content">
          <ClockIcon />

          <p className="slot-info">02:40 PM</p>
        </section>
      </section>

      {!mentor && (
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
