import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
  return (
    <div className="w-full sm:w-auto">
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild>
          <Button
            className="w-full"
            size="lg"
            variant={job?.isOpen && !applied ? "blue" : "destructive"}
            disabled={!job?.isOpen || applied}
          >
            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-lg mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-center">
              Apply for {job?.title} at {job?.company?.name}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Please fill out the form below carefully.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-4">
            <Button className="w-full">Submit</Button>
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ApplyJob;
