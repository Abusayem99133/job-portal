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
import { Controller, useForm } from "react-hook-form";
import useFetch from "@/hook/useFatch";
import { applyToJob } from "@/api/apiApplication";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      {
        message: "Only PDF of Word documents are allowed",
      }
    ),
});
const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };
  // console.log("full name here", name);
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 pb-0"
          >
            <Input
              type="number"
              placeholder="Years of Experience"
              className="flex-1"
              {...register("experience", { valueAsNumber: true })}
            />

            {errors.experience && (
              <p className="text-red-500">{errors.experience.message}</p>
            )}
            <Input
              type="text"
              placeholder="Skills (Comma Separated)"
              className="flex-1"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-500">{errors.skills.message}</p>
            )}

            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} {...field}>
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
              )}
            />

            {errors.experience && (
              <p className="text-red-500">{errors.experience.message}</p>
            )}
            <Input
              type="file"
              accept=".pdf, .doc, .docx"
              className="flex-1 file:text-gray-500"
              {...register("resume")}
            />
            {errors.resume && (
              <p className="text-red-500">{errors.resume.message}</p>
            )}
            {errorApply?.message && (
              <p className="text-red-500">{errorApply.message}</p>
            )}
            <Button type="submit" variant="blue" size="lg" className="w-full">
              Submit
            </Button>
          </form>
          <DrawerFooter className="flex flex-col gap-4">
            <DrawerClose asChild>
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
