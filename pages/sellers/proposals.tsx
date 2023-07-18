import Link from "next/link";
import { Tab, Tabs } from "../../components/tabs";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { TimeAgo } from "../../components/timeago";
import { getCookie } from "cookies-next";
import { Loading } from "../../components/loading/loading";
const moment = require('moment')

const Proposals: NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"));
  const [IsLoading, setIsLoading] = useState(true);
  const [proposals, setProposal] = useState([]);

  const getData = async () => {
    setIsLoading(true)
    const res = await ApiService.getData({
      url: `proposal/fetch?userId=${userId}`,
    });
    console.log(res.data)
    setProposal(res.data)
    setIsLoading(false)
  };

  useEffect(() => {
    getData()
  }, []);

  async function activeTab(message: any) {
    // Todo
  }

  function formattedDate(date: string) {
    const format =
      new Date(date).getDate() +
      " " +
      new Date(date).toLocaleString("default", { month: "long" }) +
      " " +
      new Date(date).getFullYear();
    return format;
  }

  if (IsLoading) {
    return <Loading title="" />;
  } else {
    return (
      <div className="bg-bgcolor p-2 md:px-20  h-full-screen pb-8">
        <h1 className="py-8 text-5xl font-light">
          My <span className="font-medium">Proposals</span>
        </h1>
        <Tabs currentTab={activeTab}>
          <Tab title="Applied Jobs">
            <div className="mr-4 pl-7 bg-white px-4 py-8 drop-shadow-sm rounded-lg max-w-5xl mt-8 ">
              <h1 className="font-medium text-xl text-center md:text-left">
                Offers(0)
              </h1>
            </div>
            <div className="mr-4 pl-7 bg-white px-4 py-8 drop-shadow-sm rounded-lg max-w-5xl mt-8 ">
              <h1 className="font-medium text-xl text-center md:text-left">
                Active Proposals(0)
              </h1>
            </div>
            <div className="mr-4 pl-7 bg-white px-4 py-8 drop-shadow-sm rounded-lg max-w-5xl  mt-8 ">
              <h1 className="font-medium text-xl text-center md:text-left py-3">
                Submited Proposals({proposals.length})
              </h1>
              {proposals?.map((proposal: any) => (
                <div
                  key={proposal.id}
                  className="border-b py-8 md:flex bg-[#b8defd] md:bg-white rounded-[10px] last:border-b-0 justify-between text-center md:text-left"
                >
                  <div>
                    <h3> Submited On {moment(String(proposal.createdAt)).format("DD/MM/YYYY")}</h3>
                    <h3 className="text-[#8B939A]">
                      <TimeAgo datetime={proposal.createdAt} />
                    </h3>
                  </div>
                  <Link
                    href={{
                      pathname: "/sellers/proposal",
                      query: { id: proposal.id, jobId: proposal.jobrequests?.id },
                    }}
                  >
                    <a className="text-primary">{proposal.jobrequests?.title}</a>
                  </Link>
                  <h3 className="text-[#8B939A]">
                    {proposal.jobrequests?.category?.name}
                  </h3>
                  {proposal.active ? (
                    <h3 className="text-[#ff3737]">Active</h3>
                  ) : (
                    <h3 className="text-[#8B939A]">Disabled</h3>
                  )}
                </div>
              ))}
            </div>
          </Tab>
          <Tab title="Referrals">
            <div></div>
          </Tab>
          <Tab title="Archived">
            <div></div>
          </Tab>
        </Tabs>
        <div className="flex justify-center md:justify-end text-primary max-w-5xl md:my-8 font-medium">
          <Link href="/sellers/filterJobs">
            <a className="border-r-2 px-6">Search For Jobs</a>
          </Link>
          <Link href="/sellers/profile">
            <a className="px-6">Manage Profile</a>
          </Link>
        </div>
      </div>
    );
  }

};

Proposals.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Proposals;
