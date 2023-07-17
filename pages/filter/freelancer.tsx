import { ReactElement } from "react";
import { LandingLayout } from "../../components/layout/landingLayout";
import { NextPageWithLayout } from "../_app";

const FilterFreelancer: NextPageWithLayout = () => {
  return (
    <main>
      <>FilterFreelancer Page</>
    </main>
  );
};

FilterFreelancer.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;;
};
export default FilterFreelancer;
