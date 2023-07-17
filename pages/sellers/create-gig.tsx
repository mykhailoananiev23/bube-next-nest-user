/* eslint-disable react/no-children-prop */
import { ReactElement } from "react";
import {MainFooter} from "../../components/footer/MainFooter";
import { AccountHeader } from "../../components/header/AccountHeader";
import { AccountLayout } from "../../components/layout/AccountLayout";
import {MainBody} from "../../components/mainbody";
import { CreateGigCard } from "../../modules/sellers/create-gig/CreateGigCard";
import { NextPageWithLayout } from "../_app";

const CreateGig: NextPageWithLayout = () => {
  const mainChildren = (
    <main className="flex justify-center">
      <div className="container w-full py-16 px-6">
        <CreateGigCard />
      </div>
    </main>
  );

  return <MainBody children={mainChildren} />;
}

CreateGig.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default CreateGig;