import { createBrowserRouter } from "react-router";
// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Common Pages
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

// Public Pages
import Tuitions from "../pages/Tuitions/Tuitions";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";

import TutorProfile from "../pages/TutorProfile/TutorProfile";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

// Payment
import PaymentSuccess from "../Payment/PaymentSuccess";

// Route Guards
import PrivateRoute from "./PrivateRoute";

// Dashboard Common
import Statistics from "../pages/Dashboard/Common/Statistics";
import Profile from "../pages/Dashboard/Common/Profile";

// Admin Pages
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import TutorRequest from "../pages/Dashboard/Admin/TutorRequest";
import ManageTuitions from "../pages/Dashboard/Admin/ManageTuitions";
import Transactions from "../pages/Dashboard/Admin/Transactions";

// Student Pages
import PostTuition from "../pages/Dashboard/Student/PostTuition";
import MyTuitions from "../pages/Dashboard/Student/MyTuitions";
import AppliedTutors from "../pages/Dashboard/Student/AppliedTutors";
import MyPayments from "../pages/Dashboard/Student/MyPayments";

// Tutor Pages
import Tutors from "../pages/Dashboard/Tutors/Tutors";
import MyApplications from "../pages/Dashboard/Tutors/MyApplications";
import OngoingTuitions from "../pages/Dashboard/Tutors/OngoingTuitions";
import RevenueHistory from "../pages/Dashboard/Tutors/RevenueHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // ========== PUBLIC ROUTES ==========

      // Home
      {
        path: "/",
        element: <Home />,
      },

      // Tuitions
      {
        path: "/tuitions",
        element: <Tuitions />,
      },
      {
        path: "/tuition/:id",
        element: <TuitionDetails />,
      },

      // Tutors
      {
        path: "/tutors",
        element: <Tutors />,
      },
      {
        path: "/tutor/:email",
        element: <TutorProfile />,
      },

      // Static Pages
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      // Payment Success
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ========== AUTH ROUTES ==========
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // ========== DASHBOARD ROUTES ==========
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Common Routes
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // ========== STUDENT ROUTES ==========
      {
        path: "post-tuition",
        element: (
          <PrivateRoute>
            <PostTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tuitions",
        element: (
          <PrivateRoute>
            <MyTuitions />
          </PrivateRoute>
        ),
      },
      {
        path: "applied-tutors/:id",
        element: (
          <PrivateRoute>
            <AppliedTutors />
          </PrivateRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <MyPayments />
          </PrivateRoute>
        ),
      },

      // ========== TUTOR ROUTES ==========
      {
        path: "my-applications",
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "ongoing-tuitions",
        element: (
          <PrivateRoute>
            <OngoingTuitions />
          </PrivateRoute>
        ),
      },
      {
        path: "revenue",
        element: (
          <PrivateRoute>
            <RevenueHistory />
          </PrivateRoute>
        ),
      },

      // ========== ADMIN ROUTES ==========
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "tutor-request",
        element: (
          <PrivateRoute>
            <TutorRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-tuitions",
        element: (
          <PrivateRoute>
            <ManageTuitions />
          </PrivateRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
