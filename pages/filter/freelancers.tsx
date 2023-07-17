import { ReactElement, useContext, useEffect, useState } from "react";
import { LandingLayout } from "../../components/layout/landingLayout";
import { NextPageWithLayout } from "../_app";
import { FilterFreelancerICard } from "../../modules/filter/filterFreelancerICard";
import { FilterFreelancerRCard } from "../../modules/filter/filterFreelancerRCard";

const FilterFreelancers: NextPageWithLayout = () => {
  return (
    <main className="grid grid-cols-3 gap-8 px-32 py-14">
      <FilterFreelancerICard className="" />
      <FilterFreelancerRCard className="col-span-2" />
    </main>
  );
};

FilterFreelancers.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};
export default FilterFreelancers;
