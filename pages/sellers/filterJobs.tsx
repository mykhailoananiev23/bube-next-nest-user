import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { FilterJobsInputCard } from "../../modules/filter/filterJobsInputCard";
import { FilterJobsResultCard } from "../../modules/filter/filterJobsResultCard";
import { NextPageWithLayout } from "../_app";

const filterJobs: NextPageWithLayout = () => {
  return (
    <main className="grid grid-cols-3 gap-8 px-32 py-14">
      <FilterJobsInputCard className="" />
      <FilterJobsResultCard className="col-span-2" />
    </main>
  );
};

filterJobs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default filterJobs;
