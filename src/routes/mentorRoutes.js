import { Navigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import MentorProfile from "../components/mentorProfile";
import UpcomingBookings from "../pages/upcomingBookings";
import HistoryBookings from "../pages/historyBookings";
import Notifications from "../pages/notifications";
import Reviews from "../pages/reviews";
import MentorSettings from "../pages/settings/MentorSettings";
import Earnings from "../pages/earnings";
import Blogs from "../pages/blogs";
import Layout from "../Layout";
import WriteBlog from "../pages/blogs/WriteBlog";
import BlogDetail from "../pages/blogDetail";
import MentorDashboard from "../pages/mentorDashboard";

export const mentorRoutes = [
  {
    path: "*",
    element: <Navigate to={"/mentor/dashboard"} replace />,
    errorElement: <ErrorPage />, // Adding Error Page for error handling
  },
  {
    path: "/mentor/blogs",
    element: <Blogs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mentor/blogs/write",
    element: <WriteBlog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mentor/blogs/:id",
    element: <BlogDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mentor",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <MentorDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <MentorProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "upcoming-bookings",
        element: <UpcomingBookings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "history-bookings",
        element: <HistoryBookings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
        errorElement: <ErrorPage />,
      },
      {
        path: "reviews",
        element: <Reviews />,
        errorElement: <ErrorPage />,
      },
      {
        path: "settings",
        element: <MentorSettings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "earnings",
        element: <Earnings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "blogs",
        element: <Blogs />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
