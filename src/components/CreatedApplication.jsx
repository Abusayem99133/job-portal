import { getApplication } from "@/api/apiApplication";
import useFetch from "@/hook/useFatch";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import { useUser } from "@clerk/clerk-react";

const CreatedApplication = () => {
  const { user } = useUser();
  const {
    loading: loadingApplication,
    data: applications,
    fn: fnApplication,
  } = useFetch(getApplication, {
    user_id: user?.id,
  });

  useEffect(() => {
    fnApplication();
  }, []);

  if (loadingApplication) {
    return (
      <div className="w-full px-4 py-6">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        Your Applications
      </h2>
      <div className="flex flex-col gap-4">
        {applications?.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        ))}
      </div>
    </div>
  );
};

export default CreatedApplication;
