import { ReactElement, useContext } from "react";
import { LandingLayout } from "../../components/layout/landingLayout";
import { NextPageWithLayout } from "../_app";
import { FilterJobsInputCard } from "../../modules/filter/filterJobsInputCard";
import { FilterJobsResultCard } from "../../modules/filter/filterJobsResultCard";

const FilterJobs: NextPageWithLayout = () => {
  return (
    <main className="grid grid-cols-3 gap-8 px-32 py-14">
      <FilterJobsInputCard className="" />
      <FilterJobsResultCard className="col-span-2" />
    </main>
  );
};

FilterJobs.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};
export default FilterJobs;
