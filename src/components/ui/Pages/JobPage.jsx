import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hook/useFatch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import ApplicationCard from "@/components/ApplicationCard";
import ApplyJob from "@/components/ApplyJob";

const JobPage = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();
  // console.log("sayem in this owner ", user);
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };
  // console.log(job);
  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);
  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="" />;
  }
  // console.log(job?.recruiter_id, user?.id);
  return (
    <div className="flex flex-col gap-8 mt-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title and logo */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="gradient-title font-extrabold text-3xl sm:text-5xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-10 sm:h-12 object-contain"
          alt={job?.title}
        />
      </div>

      {/* Location, Applicants, Status */}
      <div className="flex flex-wrap gap-4 sm:gap-6 items-center text-gray-400 text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          {job?.location}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          {job?.application?.length} Applicants
        </div>
        <div className="flex items-center gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen className="h-5 w-5" /> Open
            </>
          ) : (
            <>
              <DoorClosed className="h-5 w-5" /> Closed
            </>
          )}
        </div>
      </div>

      {/* Hiring status control (only for recruiters) */}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full sm:w-1/2 md:w-1/3 ${
              job?.isOpen ? "bg-green-950" : "bg-red-950"
            } text-white`}
          >
            <SelectValue
              placeholder={`Hiring Status: ${job?.isOpen ? "Open" : "Closed"}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* About the job */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">About the job</h2>
        <p className="text-base sm:text-lg text-gray-400">{job?.description}</p>
      </section>

      {/* Requirements */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          What we are looking for
        </h2>
        <MDEditor.Markdown
          source={job?.requirments}
          className="bg-transparent text-sm sm:text-base"
        />
      </section>

      {/* Apply job (for non-owners) */}
      {job?.recruiter_id !== user.id && (
        <div className="w-full">
          <ApplyJob
            job={job}
            user={user}
            fetchJob={fnJob}
            applied={job?.application?.find(
              (ap) => ap?.candidate_id === user?.id
            )}
          />
        </div>
      )}

      {/* Application list (for recruiters only) */}
      {job?.application?.length > 0 && job?.recruiter_id === user?.id && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Applications</h2>
          {job?.application?.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </section>
      )}
    </div>
  );
};

export default JobPage;
