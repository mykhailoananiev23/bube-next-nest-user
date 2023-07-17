/* eslint-disable react/no-children-prop */
import { ReactElement } from "react";
import {MainFooter} from "../../components/footer/MainFooter";
import { AccountHeader } from "../../components/header/AccountHeader";
import { AccountLayout } from "../../components/layout/AccountLayout";
import {MainBody} from "../../components/mainbody";
import { CreateProposalCard } from "../../modules/sellers/create-proposal/CreateProposalCard";
import { NextPageWithLayout } from "../_app";

const CreateProposal: NextPageWithLayout = () => {
  const mainChildren = (
    <main className="flex justify-center">
      <div className="container w-full py-16 px-6">
        <CreateProposalCard />
      </div>
    </main>
  );

  return <MainBody children={mainChildren} />;
}

CreateProposal.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default CreateProposal;