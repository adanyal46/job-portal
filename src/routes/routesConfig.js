import { lazy } from "react";
import tokenDecoder from "../utils/jwtDecoder";
import { Roles } from "../utils/roles";
import { Navigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import ResetPassword from "../guest-view/ResetPassword";
import ForgetPassword from "../guest-view/ForgetPassword";
import SignUpPageUserType from "../guest-view/SignUpPageUserType";
import RegisterForm from "../pages/signUp";
import { jobSeekerRoutes } from "./jobSeekerRoutes";
import { mentorRoutes } from "./mentorRoutes";
import { recruiterRoutes } from "./recruiterRoutes";
import { employerRoutes } from "./employerRoutes";
import { staffMemberRoutes } from "./staffMemberRoutes";
import { adminRoutes } from "./adminRoutes";
import { frontRoutes } from "./frontRoutes";
import AdminLogin from "../pages/login/AdminLogin";

const SignUp = lazy(() => import("../pages/signUp"));
const LoginForm = lazy(() => import("../pages/login"));

const routeConfig = (token) => {
  const decodedToken = tokenDecoder(token);

  // Common routes (available to all users)
  const commonRoutes = [
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/signup-type",
      element: <SignUpPageUserType />,
    },
    {
      path: "/register/:role",
      element: <RegisterForm />,
    },
  ];
  if (!decodedToken) {
    return [
      ...commonRoutes,
      ...frontRoutes,
      {
        path: "*",
        element: <Navigate to={"/"} replace />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <ErrorPage />,
      },
    ];
  }

  const { role } = decodedToken;

  switch (role) {
    case Roles.JOB_SEEKER:
      return [...jobSeekerRoutes, ...frontRoutes];
    case Roles.MENTOR:
      return [...mentorRoutes, ...frontRoutes];
    case Roles.RECRUITER:
      return [...recruiterRoutes, ...frontRoutes];
    case Roles.EMPLOYER:
      return [...employerRoutes, ...frontRoutes];
    case Roles.STAFF_MEMBER:
      return [...staffMemberRoutes, ...frontRoutes];
    case Roles.ADMIN:
      return [...adminRoutes, ...frontRoutes];
    default:
      return [
        {
          path: "/login",
          element: <LoginForm />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/signup",
          element: <SignUp />,
          errorElement: <ErrorPage />,
        },
        {
          path: "*",
          element: <Navigate to={"/login"} replace />,
          errorElement: <ErrorPage />,
        },
      ];
  }
};

export default routeConfig;
