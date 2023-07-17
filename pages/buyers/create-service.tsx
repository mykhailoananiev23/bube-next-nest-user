/* eslint-disable react/no-children-prop */
import { ReactElement } from "react";
import { MainFooter } from "../../components/footer/MainFooter";
import { AccountHeader } from "../../components/header/AccountHeader";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { MainBody } from "../../components/mainbody";
import { CreateServiceCard } from "../../modules/buyers/create-service/CreateServiceCard";
import { NextPageWithLayout } from "../_app";

const CreateService: NextPageWithLayout = () => {
  return (
    <main className="flex justify-center">
      <div className="container w-full py-16 px-6">
        <CreateServiceCard />
      </div>
    </main>
  );
};

CreateService.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default CreateService;
