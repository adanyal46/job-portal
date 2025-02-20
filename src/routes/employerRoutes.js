import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Layout from "../Layout";
import StaffMemberDetail from "../pages/employerDashboard/StaffMemberDetail";
import StaffMemberProfile from "../pages/employerDashboard/StaffMemberProfile";
import EmployerSetting from "../pages/employerSetting";
import JobRequest from "../pages/employerDashboard/JobRequest";
import JobSeekerDetail from "../pages/jobSeekerRecruiter/JobSeekerDetail";
import RecruiterNotification from "../pages/recruiterNotification";
import EmployerRecruiter from "../pages/employerRecruiter";
import JobDetail from "../pages/employerDashboard/JobDetail";
import AddJob from "../pages/employerDashboard/AddJob";
import EditJob from "../pages/employerDashboard/EditJob";
import ViewJobApplicantList from "../pages/employerDashboard/ViewJobApplicantList";
import ViewTimeSheetRecruiter from "../pages/employerDashboard/ViewTimesheetRecruiter";
import EmployerSubscription from "../pages/employerSubscription";
import EmployerTalent from "../pages/employerTalent";
const EmployerDashboard = lazy(() => import("../pages/employerDashboard"));
const EmployerJobs = lazy(() => import("../pages/employer-jobs"));
const EmployerHiredRecruiter = lazy(() =>
  import("../pages/employer-recruiter")
);
const EmployerStaffs = lazy(() => import("../pages/employer-staff"));
const EmployerProfile = lazy(() => import("../pages/empoyerProfile"));
export const employerRoutes = [
  {
    path: "*",
    element: <Navigate to={"/employer/profile"} replace />,
    errorElement: <ErrorPage />, // Adding Error Page for error handling
  },
  {
    path: "/employer",
    element: <Layout />,
    children: [
      {
        path: "profile",
        element: <EmployerProfile />,
        errorElement: <ErrorPage />,
      },
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
        path: "staffs",
        element: <EmployerStaffs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "recruiter",
        element: <EmployerTalent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "talent",
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
      {
        path: "staff-member/:id",
        element: <StaffMemberDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "talent/:id",
        element: <JobSeekerDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile/:id",
        element: <StaffMemberProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "job-request",
        element: <JobRequest />,
        errorElement: <ErrorPage />,
      },
      {
        path: "settings",
        element: <EmployerSetting />,
        errorElement: <ErrorPage />,
      },
      {
        path: "subscriptions",
        element: <EmployerSubscription />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
