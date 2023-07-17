import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";

const filterJob: NextPageWithLayout = () => {
  return (
    <>
      FilterJob
    </>
  );
};

filterJob.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default filterJob;
