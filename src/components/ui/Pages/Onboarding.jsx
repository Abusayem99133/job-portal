import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
  const { user, isLoaded } = useUser();
  // if (!isLoaded) {
  //   return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  // }
  const navigate = useNavigate();
  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/jobs-post" : "/jobs-listing");
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter"
          ? "/jobs-post"
          : "jobs-listing"
      );
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center mt-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h2 className="gradient-title font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-center">
        I am a...
      </h2>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Button
          variant="blue"
          className="h-28 sm:h-36 text-xl sm:text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-28 sm:h-36 text-xl sm:text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
