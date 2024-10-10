import { Typography } from "antd";
import BookingCard from "../../components/bookingCard";
import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";

const BookingsListing = () => {
  return (
    <section className="booking-listing-wrapper">
      <BookingCard mentor progress="Completed" />
      <BookingCard mentor progress="In Progress" />
      <BookingCard mentor progress="Completed" />

      <BookingCard mentor progress="In Progress" />
      <BookingCard mentor progress="Completed" />
      <BookingCard mentor progress="In Progress" />

      <BookingCard mentor progress="Completed" />
      <BookingCard mentor progress="In Progress" />
      <BookingCard mentor progress="Completed" />

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

const UpcomingBookings = () => {
  const handleTabChange = (key) => {
    console.log(key);
  };

  return (
    <section >
      <Typography.Title level={3}>Upcoming Bookings</Typography.Title>

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

export default UpcomingBookings;
