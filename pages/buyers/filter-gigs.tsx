import { ReactElement } from "react";
import { FilterCategoryInput } from "../../components/buyers/filter-gigs/FilterCategoryInput";
import { FilterCategoryResults } from "../../components/buyers/filter-gigs/FilterCategoryResults";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";

const FilterGigs: NextPageWithLayout = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 xl:px-24 xl:gap-8 px-2 py-14">
        <FilterCategoryInput className="" />
        <FilterCategoryResults className="col-span-2" />
    </div>
  ) 
};

FilterGigs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default FilterGigs