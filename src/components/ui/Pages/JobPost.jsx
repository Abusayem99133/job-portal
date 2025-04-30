import { getCompanies } from "@/api/apiCompany";
import useFetch from "@/hook/useFatch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Navigate } from "react-router-dom";
import { Textarea } from "../textarea";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a Location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirement: z.string().min(1, { message: "Requirement are required" }),
});

const JobPost = () => {
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
  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to={"/jobs"} />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form>
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </form>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {State?.getStatesOfCountry("BD").map(({ name }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies?.map(({ name, id }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobPost;
