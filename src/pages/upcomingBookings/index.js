import { Typography } from "antd";
import BookingCard, {
  BookingCardRecruiter,
} from "../../components/bookingCard";
// import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { upcomingBookingSession } from "../../features/booking/bookingSlice";
import tokenDecoder from "../../utils/jwtDecoder";

const NoBooking = () => {
  return (
    <section className="no-booking-empty-wrapper">
      <figure className="no-bookings-picture">
        <img loading="lazy" src="/images/no-bookings.png" alt="" className="" />
      </figure>
    </section>
  );
};

const BookingsListingMentor = ({ bookingSession }) => {
  return (
    <>
      {bookingSession &&
      Array.isArray(bookingSession) &&
      bookingSession.length > 0 ? (
        bookingSession.map((booking) => (
          <section className="booking-listing-wrapper">
            <BookingCard
              mentor
              progress="Completed"
              serviceName={booking?.serviceName}
              mentorName={booking?.jobSeekerName}
              date={booking?.date}
              time={booking?.time}
            />
          </section>
        ))
      ) : (
        <NoBooking />
      )}

      {/* <BookingCard mentor progress="In Progress" />
    <BookingCard mentor progress="Completed" /> */}
      {/* <CustomPagination /> */}
    </>
  );
};
const BookingsListingRecruiter = ({ bookingSession }) => {
  return (
    <>
      <section className="booking-listing-wrapper">
        {bookingSession &&
          Array.isArray(bookingSession) &&
          bookingSession.length > 0 &&
          bookingSession.map((booking) => (
            <BookingCardRecruiter
              mentor
              progress="Completed"
              serviceName={booking?.serviceName}
              mentorName={booking?.fullname}
              date={booking?.datetime}
            />
          ))}
      </section>

      {/* <BookingCard mentor progress="In Progress" />
    <BookingCard mentor progress="Completed" /> */}
      {/* <CustomPagination /> */}
    </>
  );
};

const UpcomingBookings = () => {
  const token = localStorage.getItem("token");
  const decodedToken = tokenDecoder(token);
  const USER_ROLE = decodedToken.role;
  const dispatch = useDispatch();
  const { bookingSession } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(upcomingBookingSession());
  }, [dispatch]);
  const handleTabChange = (key) => {};

  console.log('bookingSession',bookingSession);

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
            children:
              bookingSession.length > 0 ? (
                USER_ROLE !== "RECRUITER" ? (
                  <BookingsListingMentor bookingSession={bookingSession} />
                ) : (
                  <BookingsListingRecruiter bookingSession={bookingSession} />
                )
              ) : (
                <NoBooking />
              ),
          },
          {
            key: "upcoming",
            label: "Up Coming",
            children: <NoBooking bookingSession={bookingSession} />,
          },
          {
            key: "previous",
            label: "Previous",
            children: <NoBooking bookingSession={bookingSession} />,
          },
          {
            key: "customFilters",
            label: "Custom Filters",
            children: <NoBooking bookingSession={bookingSession} />,
          },
        ]}
      />
    </section>
  );
};

export default UpcomingBookings;
