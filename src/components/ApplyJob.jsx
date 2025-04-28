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
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
  return (
    <div>
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

          <form className="flex flex-col gap-4 p-4 pb-0">
            <Input
              type="number"
              placeholder="Years of Experience"
              className="flex-1"
            />
            <Input
              type="text"
              placeholder="Skills (Comma Separated)"
              className="flex-1"
            />
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Graduate" id="graduate" />
                <Label htmlFor="graduate">Graduate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Post Graduate" id="post-graduate" />
                <Label htmlFor="post-graduate">Post Graduate</Label>
              </div>
            </RadioGroup>
          </form>
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
