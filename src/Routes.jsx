import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/JobListing";
import JobPage from "./pages/JobPage";
import JobPost from "./pages/JobPost";
import SaveJob from "./pages/SaveJob";
import MyJobs from "./pages/MyJobs";
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
