import { getSingleJob } from "@/api/apiJobs";
import useFetch from "@/hook/useFatch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });
  console.log(job);
  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);
  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="" />;
  }
  return (
    <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
      <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
        {job?.title}
      </h1>
      <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
    </div>
  );
};

export default JobPage;
