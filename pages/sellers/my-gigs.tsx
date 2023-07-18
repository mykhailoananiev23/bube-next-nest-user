/* eslint-disable react/no-children-prop */
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { MainBody } from "../../components/mainbody";
import { Tabs, Tab } from "../../components/tabs";
import { MyGigCard } from "../../modules/sellers/my-gigs/MyGigCard";
import ApiService from "../../services/ApiService";
import { NextPageWithLayout } from "../_app";

const MyGigs: NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"))
  const { data: gigsData, refetch } = useQuery(["gig", userId], () =>
    ApiService.getData({ url: `gigs/fetch?userId=${userId}` })
  );

  const activeTabname = () => {
    // Todo
  };

  const mainChildren = (
    <main className="flex justify-center">
      <div className="container py-16 px-6 flex flex-col gap-4">
        <section className="flex flex-wrap gap-4 justify-between items-center">
          <h1 className="flex text-4xl font-semibold">My Gigs</h1>
          <Link href="/sellers/create-gig">
            <div className="text-white px-6 py-3 bg-blue-700 font-bold rounded-3xl cursor-pointer hover:bg-blue-800 active:bg-black">
              Create Your Gig
            </div>
          </Link>
        </section>
        <main>
          <Tabs currentTab={activeTabname}>
            <Tab title="Active"></Tab>
            <Tab title="In Progress"></Tab>
            <Tab title="Completed"></Tab>
          </Tabs>
          <div className="flex flex-col gap-4 py-4">
            <article className="bg-white rounded-xl p-4 flex flex-col gap-4 max-w-sm sm:max-w-md lg:flex-row lg:max-w-5xl hover:shadow-md">
              <div className="text-black px-6 py-3 font-bold rounded-3xl">
                Created Gig will be Listed here
              </div>
            </article>
            {gigsData?.data?.map(
              (gig: any, idx: number) =>
                <MyGigCard key={idx} data={gig} refetch={refetch} />
            )}
          </div>
        </main>
      </div>
    </main>
  );

  return <MainBody children={mainChildren} />;
};

MyGigs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default MyGigs;
