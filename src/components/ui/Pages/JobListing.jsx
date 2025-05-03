import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hook/useFatch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";
import { getCompanies } from "@/api/apiCompany";
import { Input } from "../input";
import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { State } from "country-state-city";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };
  // location search
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);
  const clearFilters = (e) => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl md:text-6xl text-center pb-6 sm:pb-8">
        Latest Jobs
      </h1>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-6"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          className="flex-1 px-4 text-base h-12"
          name="search-query"
        />
        <Button type="submit" className="h-12 w-full sm:w-32" variant="blue">
          Search
        </Button>
      </form>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full sm:w-1/3">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State?.getStatesOfCountry("BD")?.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="w-full sm:w-1/3">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={clearFilters}
          variant="destructive"
          className="w-full sm:w-1/3"
        >
          Clear Filters
        </Button>
      </div>

      {/* Job cards */}
      {loadingJobs === false && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {jobs?.length ? (
            jobs?.map((job) => (
              <JobCard
                key={job?.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-lg font-semibold text-gray-500">
              No Jobs Found 😥
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
