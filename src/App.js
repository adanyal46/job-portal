import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Loader from "./components/Loader";

import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./features/profile/profileSlice";
import { isTokenValid } from "./utils";

// Lazy-loaded components
const MyProfile = lazy(() => import("./pages/myProfile"));
const JobSearch = lazy(() => import("./pages/jobSearch"));
const Mentors = lazy(() => import("./pages/mentors"));
const Bookings = lazy(() => import("./pages/bookings"));
const UpcomingBookings = lazy(() => import("./pages/upcomingBookings"));
const HistoryBookings = lazy(() => import("./pages/historyBookings"));
const MentorDetails = lazy(() => import("./pages/mentorDetails"));
const Earnings = lazy(() => import("./pages/earnings"));
const Reviews = lazy(() => import("./pages/reviews"));
const Blogs = lazy(() => import("./pages/blogs"));
const BlogDetail = lazy(() => import("./pages/blogDetail"));
const WriteBlog = lazy(() => import("./pages/writeBlog"));
const Timesheet = lazy(() => import("./pages/timesheet"));
const AddTimesheet = lazy(() => import("./pages/timesheet/addTimesheet"));
const ViewTimesheet = lazy(() => import("./pages/timesheet/viewTimesheet"));
const Notifications = lazy(() => import("./pages/notifications"));
const Settings = lazy(() => import("./pages/settings"));
const SignUp = lazy(() => import("./pages/signUp"));
const LoginForm = lazy(() => import("./pages/login"));

// Layout component that conditionally shows Navbar and Sidebar
const Layout = () => {
  const location = useLocation();
  const hideNavbarSidebar = ["/signup", "/login"]; // Paths to hide Navbar and Sidebar
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.profile);
  let profileData = user?.Profile[0];

  useEffect(() => {
    const userExistAndTokenExist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !isTokenValid(token)) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } catch (error) {
        navigate("/login");
      }
    };

    userExistAndTokenExist();
  }, [dispatch, location.pathname, navigate]);

  useEffect(() => {
    dispatch(profile());  // Fetch user data and store in Redux
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-wrapper">
      <section className="fuse-main-wrapper">
        {!hideNavbarSidebar.includes(location.pathname) && <Navbar profileData={profileData} />}
        <main className="fuse-main-body">
          {!hideNavbarSidebar.includes(location.pathname) && <Sidebar user={user} />}
          <Outlet context={{ user }} /> {/* Outlet for rendering child routes */}
        </main>
      </section>
    </div>
  );
};

// Root component to be used as the main layout
const Root = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Layout />
    </Suspense>
  );
};

const MyProfileWrapper = () => {
  const { user } = useSelector((state) => state.profile); 

  return <MyProfile user={user} />;
};

const NotificationsWrapper = () => {
  const { user } = useSelector((state) => state.profile); 
  return <Notifications user={user} />; 
}

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Main layout component
    children: [
      { path: "/", element: <MyProfileWrapper /> },
      { path: "jobs/search", element: <JobSearch /> },
      { path: "mentors", element: <Mentors /> },
      { path: "bookings", element: <Bookings /> },
      { path: "upcomingBookings", element: <UpcomingBookings /> },
      { path: "historyBookings", element: <HistoryBookings /> },
      { path: "mentorDetails", element: <MentorDetails /> },
      { path: "earnings", element: <Earnings /> },
      { path: "reviews", element: <Reviews /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogDetails", element: <BlogDetail /> },
      { path: "writeBlog", element: <WriteBlog /> },
      { path: "timesheet", element: <Timesheet /> },
      { path: "add-timesheet", element: <AddTimesheet /> },
      { path: "view-timesheet", element: <ViewTimesheet /> },
      { path: "notifications", element: <NotificationsWrapper /> }, // Use wrapper to pass user data
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />, // Separate route for signup (no Navbar/Sidebar)
  },
  {
    path: "/login",
    element: <LoginForm />, // Separate route for login (no Navbar/Sidebar)
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
