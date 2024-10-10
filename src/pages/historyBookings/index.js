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

const HistoryBookings = () => {
  const handleTabChange = (key) => {
    console.log(key);
  };

  return (
    <section >
      <Typography.Title level={3}>Bookings History/Past Bookings</Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="last-3-Days"
        items={[
          {
            key: "last-3-Days",
            label: "Last 3 Days",
            children: <BookingsListing />,
          },
          {
            key: "last-Week",
            label: "Last Week",
            children: <NoBooking />,
          },
          {
            key: "last-Month",
            label: "Last Month",
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

export default HistoryBookings;
