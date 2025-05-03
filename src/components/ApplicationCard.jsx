import { Box, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useFetch from "@/hook/useFatch";
import { updateApplication } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplication,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <div className="w-full ">
      <Card className="w-full">
        {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 font-bold text-base sm:text-lg">
            <span>
              {isCandidate
                ? `${application?.job?.title} at /${application?.job?.company?.name}`
                : application?.name}
            </span>
            <Download
              size={18}
              className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
              onClick={handleDownload}
            />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm sm:text-base">
            <div className="flex gap-2 items-center">
              <BriefcaseBusiness size={16} />
              {application?.experience} years of experience
            </div>
            <div className="flex gap-2 items-center">
              <School size={16} />
              {application?.education}
            </div>
            <div className="flex gap-2 items-center">
              <Box size={16} />
              Skills: {application?.skills}
            </div>
          </div>
          <hr />
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 text-sm sm:text-base">
          <span>{new Date(application?.created_at).toLocaleString()}</span>
          {isCandidate ? (
            <span className="capitalize font-semibold text-right w-full sm:w-auto">
              Status: {application?.status}
            </span>
          ) : (
            <div className="w-full sm:w-52">
              <Select
                onValueChange={handleStatusChange}
                defaultValue={application.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Application Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplicationCard;
