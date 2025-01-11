import { lazy } from "react";
import JobDetail from "../pages/employerDashboard/JobDetail";
import ViewJobApplicantList from "../pages/employerDashboard/ViewJobApplicantList";
import EditJob from "../pages/employerDashboard/EditJob";
import ViewTimeSheetRecruiter from "../pages/employerDashboard/ViewTimesheetRecruiter";
import AddJob from "../pages/employerDashboard/AddJob";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import ErrorPage from "../ErrorPage";
const EmployerDashboard = lazy(() => import("../pages/employerDashboard"));
const EmployerJobs = lazy(() => import("../pages/employer-jobs"));
const EmployerHiredRecruiter = lazy(() =>
  import("../pages/employer-recruiter")
);
const EmployerStaffs = lazy(() => import("../pages/employer-staff"));
const EmployerTalent = lazy(() => import("../pages/employerRecruiter"));
const EmployerRecruiter = lazy(() => import("../pages/employerTalent"));

const EmployerSubscription = lazy(() =>
  import("../pages/employerSubscription")
);
const RecruiterNotification = lazy(() =>
  import("../pages/recruiterNotification")
);
const Settings = lazy(() => import("../pages/settings"));
export const staffMemberRoutes = [
  {
    path: "*",
    element: <Navigate to={"/staff/dashboard"} replace />,
    errorElement: <ErrorPage />, // Adding Error Page for error handling
  },
  {
    path: "/staff",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <EmployerDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notifications",
        element: <RecruiterNotification />,
        errorElement: <ErrorPage />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "subscriptions",
        element: <EmployerSubscription />,
        errorElement: <ErrorPage />,
      },
      {
        path: "jobs",
        element: <EmployerJobs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "hired-recruiter",
        element: <EmployerHiredRecruiter />,
        errorElement: <ErrorPage />,
      },

      {
        path: "talent",
        element: <EmployerTalent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "recruiter",
        element: <EmployerRecruiter />,
        errorElement: <ErrorPage />,
      },
      {
        path: "job-detail/:id",
        element: <JobDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "add-job",
        element: <AddJob />,
        errorElement: <ErrorPage />,
      },
      {
        path: "edit-job/:id",
        element: <EditJob />,
        errorElement: <ErrorPage />,
      },
      {
        path: "job-applicants/:id",
        element: <ViewJobApplicantList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "view-timesheet-recruiter/:id",
        element: <ViewTimeSheetRecruiter />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
