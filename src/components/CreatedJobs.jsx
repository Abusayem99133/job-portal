import { getMyJob } from "@/api/apiJobs";
import useFetch from "@/hook/useFatch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./ui/Pages/JobCard";

const CreatedJobs = () => {
  const { user } = useUser();
  const {
    loading: loadingCreateJob,
    data: CreatedJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJob, {
    recruiter_id: user?.id,
  });
  useEffect(() => {
    fnCreatedJobs();
  }, []);
  if (loadingCreateJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CreatedJobs?.length ? (
          CreatedJobs?.map((job) => {
            return (
              <JobCard
                key={job?.id}
                job={job}
                savedInit={job?.saved?.length > 0}
                isMyJob
              />
            );
          })
        ) : (
          <div>No Jobs Found 😥</div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
