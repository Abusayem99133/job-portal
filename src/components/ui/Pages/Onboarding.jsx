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
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a....
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
