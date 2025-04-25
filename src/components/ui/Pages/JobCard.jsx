import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Card, CardHeader, CardTitle } from "../card";
import { Trash2Icon } from "lucide-react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job?.title}</CardTitle>
        {isMyJob && (
          <Trash2Icon
            fill="red"
            size={18}
            className="text-red-300 cursor-pointer"
          />
        )}
      </CardHeader>
    </Card>
  );
};

export default JobCard;
