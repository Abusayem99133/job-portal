import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layouts/AppLayout";
import LandingPage from "./components/ui/Pages/LandingPage";
import Onboarding from "./components/ui/Pages/Onboarding";
import JobListing from "./components/ui/Pages/JobListing";
import JobPage from "./components/ui/Pages/JobPage";
import JobPost from "./components/ui/Pages/JobPost";
import SaveJob from "./components/ui/Pages/SaveJob";
import MyJobs from "./components/ui/Pages/MyJobs";
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/jobs-listing",
        element: <JobListing />,
      },

      {
        path: "/jobs/:id",
        element: <JobPage />,
      },
      {
        path: "/jobs-post",
        element: <JobPost />,
      },
      {
        path: "/save-jobs",
        element: <SaveJob />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);
