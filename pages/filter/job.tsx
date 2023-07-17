import { ReactElement } from "react";
import { LandingLayout } from "../../components/layout/landingLayout";
import { NextPageWithLayout } from "../_app";

const FilterResultJob: NextPageWithLayout = () => {
  return (
    <main>
      <>FilterResultJob Page</>
    </main>
  );
};

FilterResultJob.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;;
};
export default FilterResultJob;
