import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import AccountSection from "../../modules/account/AccountSection";
import { NextPageWithLayout } from "../_app";

const Account: NextPageWithLayout = () => {
  return (
    <div className="container mx-auto">
      <AccountSection />
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Account;
