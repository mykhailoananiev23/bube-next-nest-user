/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { MainFooter } from "../../components/footer/MainFooter";
import { AccountHeader } from "../../components/header/AccountHeader";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { MainBody } from "../../components/mainbody";
import { EditGigCard } from "../../modules/sellers/create-gig/EditGigCard";
import ApiService from "../../services/ApiService";
import { NextPageWithLayout } from "../_app";

const EditGig: NextPageWithLayout = ()=> {
  const mainChildren = (
    <main className="flex justify-center">
      <div className="container w-full py-16 px-6">
        <EditGigCard />
      </div>
    </main>
  );

  return <MainBody children={mainChildren} />;
}

EditGig.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default EditGig;