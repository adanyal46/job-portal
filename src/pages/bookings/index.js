import CustomPagination from "../../components/customPagination";
import CustomButton from "../../components/customButton";
import CustomTabs from "../../components/customTabs";

import { CalendarIcon, ClockIcon } from "../../assets/svg";

import "./styles.scss";

const BookingCard = () => {
  return (
    <section className="booking-card-container">
      <h5 className="booking-card-heading">
        Resume Review with <span className="mentor-name">Olivia Roy</span>
      </h5>

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

      <CustomButton
        category="plain"
        classes="reschedule-button"
        name="Reschedule"
      />
    </section>
  );
};

const BookingsListing = () => {
  return (
    <section className="booking-listing-wrapper">
      <BookingCard />
      <BookingCard />
      <BookingCard />

      <BookingCard />
      <BookingCard />
      <BookingCard />

      <BookingCard />
      <BookingCard />
      <BookingCard />

      <CustomPagination />
    </section>
  );
};

const NoBooking = () => {
  return (
    <section className="no-booking-empty-wrapper">
      <figure className="no-bookings-picture">
        <img loading="lazy" src="/images/no-bookings.png" alt="" className="" />
      </figure>
    </section>
  );
};

const Bookings = () => {
  const handleTabChange = (key) => {
    console.log(key);
  };

  return (
    <section className="main-layout-container">
      <h3 className="layout-main-heading">Bookings</h3>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="today"
        items={[
          {
            key: "today",
            label: "Today",
            children: <BookingsListing />,
          },
          {
            key: "upcoming",
            label: "Up Coming",
            children: <NoBooking />,
          },
          {
            key: "previous",
            label: "Previous",
            children: <NoBooking />,
          },
          {
            key: "customFilters",
            label: "Custom Filters",
            children: <NoBooking />,
          },
        ]}
      />
    </section>
  );
};

export default Bookings;
