import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";
const ProtectRouter = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // যদি এখনও লোডিং শেষ না হয়

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  // যদি সাইন ইন না করা থাকে
  if (!isSignedIn) {
    return <Navigate to={"/?sign-in=true"} state={{ from: pathname }} />;
  }
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  )
    return <Navigate to={"/onboarding"} />;

  // সাইন ইন করা থাকলে কন্টেন্ট দেখাও
  return children;
};

export default ProtectRouter;
