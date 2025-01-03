import { Navigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Layout from "../Layout";
import MyProfile from "../pages/myProfile";
import JobSearch from "../pages/jobSearch";
import Bookings from "../pages/bookings";
import Mentors from "../pages/mentors";
import MentorDetails from "../pages/mentorDetails";
import Notifications from "../pages/notifications";
import Settings from "../pages/settings";
import Blogs from "../pages/blogs";
import WriteBlog from "../pages/blogs/WriteBlog";
import BlogDetail from "../pages/blogDetail";

export const jobSeekerRoutes = [
  {
    path: "*",
    element: <Navigate to={"/job-seeker/profile"} replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/job-seeker/blogs",
    element: <Blogs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/job-seeker/blogs/write",
    element: <WriteBlog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/job-seeker/blogs/:id",
    element: <BlogDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/job-seeker",
    element: <Layout />,
    children: [
      {
        path: "profile",
        element: <MyProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "jobs/search",
        element: <JobSearch />,
        errorElement: <ErrorPage />,
      },
      {
        path: "bookings",
        element: <Bookings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "mentors",
        element: <Mentors />,
        errorElement: <ErrorPage />,
      },
      {
        path: "mentor/mentorDetail",
        element: <MentorDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
        errorElement: <ErrorPage />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
