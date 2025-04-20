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
        path: "/job-listing",
        element: <JobListing />,
      },

      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/job-post",
        element: <JobPost />,
      },
      {
        path: "/save-job",
        element: <SaveJob />,
      },
      {
        path: "/my-job",
        element: <MyJobs />,
      },
    ],
  },
]);
