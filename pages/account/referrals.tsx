import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Tab, Tabs } from "../../components/tabs";
import { referralWithdraws, userReferrals } from "../../hooks/data";
import { MainFooter } from "../../components/footer/MainFooter";
import { KeyFeatures } from "../../modules/index/KeyFeatures";
import { DownloadApp } from "../../modules/index/DownloadApp";
import { AccountHeader } from "../../components/header/AccountHeader";
import { getCookie } from "cookies-next";
import notify from "../../utils/toast";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Referrals() {
  const userId = getCookie("userID");
  const basePath = process.env.BACKEND_URL;
  const links = basePath + `/referral/${userId}`;
  const copyLinks = (e: any) => {
    navigator.clipboard.writeText(links);
    notify.success("Successful Copy!");
  };
  const [activeTabId, setactiveTabId] = useState(1);

  async function currentTab(message: string) {
    if(message === "User Referrals"){

    }
    if(message === "Withdrawals"){
      
    }
  }

  return (
    <>
      <AccountHeader />
      <ToastContainer />
      <div className="bg-bgcolor h-full-screen text-[#8B939A]">
        <div className="bg-secondary text-darkText text-center py-16">
          <h1 className="text-5xl font-extralight	">
            Invite Friends & You Both{" "}
          </h1>
          <h1 className="text-5xl font-bold">Get Up To $100</h1>
          <h3 className="text-2xl ">
            Introduce Your Friend To The Easiest Way To Get Things Done
          </h3>
        </div>

        <div className="bg-white rounded-lg ml-20 my-16 mr-16 p-8">
          <div className="flex-column  sm:flex ">
            <div>
              <p>
                Invite Your Friends And Colleagues To Buy A Gig And Receive 50%
                Of The Commission Free Paid To BuBe. To Invite A User To
                Purchase Accept A Regular Job, Simply Copy The Link And Send It
                To Them.
              </p>
              <p className="my-8">
                You Can Also Share Gigs And Jobs Using Our Social Media Buttons
              </p>
              <Link href="/">
                <button className="text-white rounded-full text-center bg-primary py-4 px-12 font-semibold">
                  Withdraw
                </button>
              </Link>
            </div>
            <div className="border rounded-lg border-darkText p-8 mt-10 sm:mt-0">
              <h2 className="text-darkText flex">
                <InformationCircleIcon
                  className="h-5 w-5 mr-2"
                  aria-hidden="true"
                />
                Referral Link
              </h2>
              <p className="my-4">
                s Use The Referral Link To Invite Your Friends To BuBe And Earn
                Referral Bonuses.
              </p>
              <div className="flex-column justify-center w-full">
                <button
                  className="bg-[#0071BC] text-white text-md lg:px-12 px-8 py-3 rounded-3xl flex lg:mr-[19vw]"
                  onClick={copyLinks}
                >
                  <span> Copy</span> <span className="ml-3">Link</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border my-8 "></div>

          <Tabs currentTab={currentTab}>
            <Tab title="User Referrals">
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-center border-collapse border rounded-full mt-6 ">
                  <thead className="text-base bg-bgcolor font-light text-darkText capitalize">
                    <tr>
                      <th className="p-4 border">User</th>
                      <th className="p-4 border">Registration Date</th>
                      <th className="p-4 border">Completed Contracts</th>
                      <th className="p-4 border">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userReferrals.map(
                      (
                        {
                          id,
                          user,
                          dateRegistered,
                          completedContracts,
                          profit,
                        },
                        idx
                      ) => (
                        <tr key={idx} className="">
                          <td className="p-4 border">{user}</td>
                          <td className="p-4 border">{dateRegistered}</td>

                          <td className="p-4 border">{completedContracts}</td>

                          <td className="p-4 border">{profit}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab title="Withdrawals">
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-center border-collapse border rounded-full mt-6 ">
                  <thead className="text-base bg-bgcolor font-light text-darkText capitalize">
                    <tr>
                      <th className="p-4 border">Amount</th>
                      <th className="p-4 border">Payment Method</th>
                      <th className="p-4 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralWithdraws.map(
                      ({ id, amount, date, paymentMethod }, idx) => (
                        <tr key={idx} className="">
                          <td className="p-4 border">{amount}</td>
                          <td className="p-4 border">{paymentMethod}</td>
                          <td className="p-4 border">{date}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>{" "}
            </Tab>
          </Tabs>
        </div>

        <KeyFeatures />
        <DownloadApp />
        <MainFooter />
      </div>
    </>
  );
}
