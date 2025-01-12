import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/jobs/JobsFilter";
import Pagination from "@/components/shared/Pagination";

import {
  fetchCountries,
  fetchJobs,
  // fetchLocation,
} from "@/lib/actions/job.action";

import { Job } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | Dev Overflow",
};

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  // const userLocation = await fetchLocation();
  // // const userLocation = {};
  // console.log(userLocation);
  const countries = await fetchCountries();

  console.log(countries[0].flags);
  const jobs = await fetchJobs({
    query: `${searchParams.q}, ${searchParams.location}` ?? `Software Engineer`,
    page: searchParams.page ? +searchParams.page : 1,
  });
  // const jobs = {}
  // console.log(jobs);
  
  const page = searchParams.page ? +searchParams.page : 1;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs?.length > 0 ? (
          jobs?.map((job: Job) => {
            if (job.job_title && job.job_title.toLowerCase() !== "undefined")
              return <JobCard key={job.id} job={job} />;

            return null;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs?.length > 0 && (
        <Pagination pageNumber={page} isNext={jobs.length === 10} />
      )}
    </>
  );
};

export default Page;
