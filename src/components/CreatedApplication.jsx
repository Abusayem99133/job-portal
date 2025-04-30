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
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
};

export default CreatedApplication;
