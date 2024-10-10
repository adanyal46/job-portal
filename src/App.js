import { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./features/profile/profileSlice";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute ";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import "./App.scss";
import useAuth from "./hooks/useAuth";
import MentorProfile from "./components/mentorProfile";
import MentorDetails from "./pages/mentorDetails";

// Lazy-loaded components
const MyProfile = lazy(() => import("./pages/myProfile"));
const UpcomingBookings = lazy(() => import("./pages/upcomingBookings"));
const HistoryBookings = lazy(() => import("./pages/historyBookings"));
const Reviews = lazy(() => import("./pages/reviews"));
const JobSearch = lazy(() => import("./pages/jobSearch"));
const Mentors = lazy(() => import("./pages/mentors"));
const Bookings = lazy(() => import("./pages/bookings"));
const Notifications = lazy(() => import("./pages/notifications"));
const Settings = lazy(() => import("./pages/settings"));
const Earnings = lazy(() => import("./pages/earnings"));
const Blogs = lazy(() => import("./pages/blogs"));
const SignUp = lazy(() => import("./pages/signUp"));
const LoginForm = lazy(() => import("./pages/login"));

// Layout component that conditionally shows Navbar and Sidebar
const Layout = () => {
  const location = useLocation();
  const hideNavbarSidebar = ["/signup", "/login"]; // Paths to hide Navbar and Sidebar
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.profile);

  // Call useAuth to handle authentication and role checks
  useAuth(navigate);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-wrapper">
      <section className="fuse-main-wrapper">
        {!hideNavbarSidebar.includes(location.pathname) && <Navbar />}
        <main className="fuse-main-body">
          {!hideNavbarSidebar.includes(location.pathname) && <Sidebar />}
          <Outlet /> {/* Outlet for rendering child routes */}
        </main>
      </section>
    </div>
  );
};

// Define the routes based on user role
const createRoutes = (user) => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]} user={user}>
              <MyProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mentor",
          element: (
            <ProtectedRoute allowedRoles={["MENTOR"]} user={user}>
              <MentorProfile />
            </ProtectedRoute>
          ),
        }, // Accessible by all
        {
          path: "jobs/search",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]} user={user}>
              <JobSearch />
            </ProtectedRoute>
          ),
        },
        {
          path: "bookings",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]} user={user}>
              <Bookings />
            </ProtectedRoute>
          ),
        },
        {
          path: "mentorDetails",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]} user={user}>
              <MentorDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "notifications",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER", "MENTOR"]} user={user}>
              <Notifications />
            </ProtectedRoute>
          ),
        },
        {
          path: "mentors",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]} user={user}>
              <Mentors />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute allowedRoles={["JOB_SEEKER", "MENTOR"]} user={user}>
              <Settings />
            </ProtectedRoute>
          ),
        },

        {
          path: "upcomingBookings",
          element: (
            <ProtectedRoute allowedRoles={["MENTOR", "RECRUITER"]} user={user}>
              <UpcomingBookings />
            </ProtectedRoute>
          ),
        },
        {
          path: "historyBookings",
          element: (
            <ProtectedRoute allowedRoles={["MENTOR", "RECRUITER"]} user={user}>
              <HistoryBookings />
            </ProtectedRoute>
          ),
        },
        {
          path: "earnings",
          element: (
            <ProtectedRoute allowedRoles={["MENTOR", "RECRUITER"]} user={user}>
              <Earnings />
            </ProtectedRoute>
          ),
        },
        {
          path: "reviews",
          element: (
            <ProtectedRoute allowedRoles={["MENTOR", "RECRUITER"]} user={user}>
              <Reviews />
            </ProtectedRoute>
          ),
        },
        {
          path: "blogs",
          element: (
            <ProtectedRoute
              allowedRoles={["JOB_SEEKER", "MENTOR", "RECRUITER"]}
              user={user}
            >
              <Blogs />
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <LoginForm /> },
  ];

  return routes;
};

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && !loading && token) {
      dispatch(profile());
    }
  }, [dispatch, user, loading]);

  const router = createBrowserRouter(createRoutes(user));

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
