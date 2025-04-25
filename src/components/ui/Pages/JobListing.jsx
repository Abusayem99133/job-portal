import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";

const JobListing = () => {
  const { session } = useSession();
  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data = await getJobs(supabaseAccessToken);
    console.log(data);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <h3>This is job Listing page</h3>
    </div>
  );
};

export default JobListing;
