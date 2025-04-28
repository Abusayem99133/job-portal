import { Card, CardHeader, CardTitle } from "./ui/card";

const ApplicationCard = ({ application, isCandidate = false }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {isCandidate
              ? `${application?.job?.title} at /${application?.job?.company?.name}`
              : application?.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ApplicationCard;
