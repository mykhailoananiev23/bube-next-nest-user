import { ReactElement } from "react";
import {AccountLayout} from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";

const DisputePage: NextPageWithLayout = () => {
  return <>DisputePage</>;
};

DisputePage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default DisputePage;
