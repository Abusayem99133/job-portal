import { getCompanies } from "@/api/apiCompany";
import useFetch from "@/hook/useFatch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../input";

import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { State } from "country-state-city";
import { Navigate, useNavigate } from "react-router-dom";
import { Textarea } from "../textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../button";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/AddCompanyDrawer";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a Location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirement: z.string().min(1, { message: "Requirement are required" }),
});

const JobPost = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirement: "",
    },
    resolver: zodResolver(schema),
  });
  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJbo,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJbo?.length > 0) navigate("/jobs-listing");
  }, [loadingCreateJob]);
  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to={"/jobs-listing"} />;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl text-center pb-8">
        Post a Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        {/* Responsive flex box for location and company */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div className="flex-1 mb-2 sm:mb-0">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {State?.getStatesOfCountry("BD").map(({ name }) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="flex-1 mb-2 sm:mb-0">
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Company">
                      {field.value
                        ? companies?.find(
                            (com) => com.id === Number(field.value)
                          )?.name
                        : "Company"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies?.map(({ name, id }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.company_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company_id.message}
              </p>
            )}
          </div>

          <div className="mt-2 sm:mt-0">
            <AddCompanyDrawer fetchCompanies={fnCompanies} />
          </div>
        </div>

        <div>
          <Controller
            name="requirement"
            control={control}
            render={({ field }) => (
              <MDEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.requirement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.requirement.message}
            </p>
          )}
        </div>

        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob.message}</p>
        )}

        {loadingCreateJob && (
          <BarLoader className="my-4" width={"100%"} color="#36d7b7" />
        )}

        <Button
          type="submit"
          variant="blue"
          size="lg"
          className="mt-4 self-center sm:self-start"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default JobPost;
