import { Typography } from "antd";
import BookingCard from "../../components/bookingCard";
import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { upcomingBookingSession } from "../../features/booking/bookingSlice";

const NoBooking = () => {
  return (
    <section className="no-booking-empty-wrapper">
      <figure className="no-bookings-picture">
        <img loading="lazy" src="/images/no-bookings.png" alt="" className="" />
      </figure>
    </section>
  );
};

const BookingsListing = ({ bookingSession }) => {
  return (
    <section className="booking-listing-wrapper">
      {bookingSession &&
      Array.isArray(bookingSession) &&
      bookingSession.length > 0 ? (
        bookingSession.map((booking) => (
          <BookingCard
            mentor
            progress="Completed"
            mentorName={booking?.jsName}
            selectedDateTime={booking?.selectedDateTime}
          />
        ))
      ) : (
        <NoBooking />
      )}

      {/* <BookingCard mentor progress="In Progress" />
      <BookingCard mentor progress="Completed" /> */}
      {/* <CustomPagination /> */}
    </section>
  );
};

const UpcomingBookings = () => {
  const { bookingSession, sessionLoading } = useSelector(
    (state) => state.bookings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(upcomingBookingSession());
  }, [dispatch]);

  const handleTabChange = (key) => {
    console.log(key);
  };

  return (
    <section>
      <Typography.Title level={3}>Upcoming Bookings</Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="today"
        items={[
          {
            key: "today",
            label: "Today",
            children: <BookingsListing bookingSession={bookingSession} />,
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
