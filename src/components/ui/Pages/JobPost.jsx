import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a Location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirement: z.string().min(1, { message: "Requirement are required" }),
});

const JobPost = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { error },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirement: "",
    },
    resolver: zodResolver(schema),
  });
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
    </div>
  );
};

export default JobPost;
