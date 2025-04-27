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
import ProtectRouter from "./components/ProtectRouter";
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
        element: (
          <ProtectRouter>
            <Onboarding />,
          </ProtectRouter>
        ),
      },
      {
        path: "/jobs-listing",
        element: (
          <ProtectRouter>
            <JobListing />,
          </ProtectRouter>
        ),
      },

      {
        path: "/jobs/:id",
        element: (
          <ProtectRouter>
            <JobPage />,
          </ProtectRouter>
        ),
      },
      {
        path: "/jobs-post",
        element: (
          <ProtectRouter>
            <JobPost />,
          </ProtectRouter>
        ),
      },
      {
        path: "/save-jobs",
        element: (
          <ProtectRouter>
            <SaveJob />,
          </ProtectRouter>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectRouter>
            <MyJobs />,
          </ProtectRouter>
        ),
      },
    ],
  },
]);
