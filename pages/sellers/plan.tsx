import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { Application } from "../../modules/index/Application";
import { DownloadApp } from "../../modules/index/DownloadApp";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/20/solid";
import { PlanSection } from "../../components/sellers/PlanSection";

const plan: NextPageWithLayout = () => {
  return (
    <>
      <div className="bg-secondary text-center text-darkText py-16">
        <h2 className="md:text-5xl sm:text-[] mb-2 max-[374px]:text-[25px] ">
          About <strong>Primium Plans</strong>
        </h2>
        <p className="md:text-[30px] max-[639px]:text-[15px] max-[639px]:text-center">
          Premium Accounts Offer Exclusive Benifits For BuBe Users
        </p>
        <div className="flex-column sm:flex sm:justify-center"></div>
      </div>
      <div className="w-full pt-[50px]">
        <div className="px-[20px] md:px-[50px] space-y-[30px]">
          <div className="text-[#050931] text-[60px] font-[200] leading-[65px] tracking-[0.6px] capitalize text-center">
            Benefits <span className="font-[900]">include</span>
          </div>
          <div className="text-center max-w-[1025px] text-[#8B939A] text-[20px] font-[400] leading-[40px] tracking-[0.2px] capitalize mx-auto">
            These are designed both to make the platform more attractive to
            Customers and Freelancers, and to drive value into the overall
            Chrono.tech ecosystem.
          </div>
        </div>
        <div className="px-[20px] md:px-[50px] py-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-row p-[12px]">
              <div className="flex min-w-[40px] justify-center p-[5px]">
                <span className="bg-[#0071BC] w-[12px] h-[12px] rounded-full"></span>
              </div>
              <div className="space-y-[12px]">
                <div className="text-[#050931] text-[20px] font-[600] leading-[25px] tracking-[0.2] capitalize">Rebates on the platform</div>
                <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] tracking-[0.15px] capitalize">
                  Highlighting and priority placement in the search results for
                  Customers and Freelancers, respectively
                </div>
              </div>
            </div>
            <div className="flex flex-row p-[12px]">
              <div className="flex min-w-[40px] justify-center p-[5px]">
                <span className="bg-[#0071BC] w-[12px] h-[12px] rounded-full"></span>
              </div>
              <div className="space-y-[12px]">
                <div className="text-[#050931] text-[20px] font-[600] leading-[25px] tracking-[0.2] capitalize">referral Bonus</div>
                <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] tracking-[0.15px] capitalize">Referral bonuses for introducing new users to BuBe</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-row p-[12px]">
              <div className="flex min-w-[40px] justify-center p-[5px]">
                <span className="bg-[#0071BC] w-[12px] h-[12px] rounded-full"></span>
              </div>
              <div className="space-y-[12px]">
                <div className="text-[#050931] text-[20px] font-[600] leading-[25px] tracking-[0.2] capitalize">Time Cashbacks</div>
                <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] tracking-[0.15px] capitalize">TIME cashback bonuses for Customers</div>
              </div>
            </div>
            <div className="flex flex-row p-[12px]">
              <div className="flex min-w-[40px] justify-center p-[5px]">
                <span className="bg-[#0071BC] w-[12px] h-[12px] rounded-full"></span>
              </div>
              <div className="space-y-[12px]">
                <div className="text-[#050931] text-[20px] font-[600] leading-[25px] tracking-[0.2] capitalize">Placement</div>
                <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] tracking-[0.15px] capitalize">
                  Highlighting and priority placement in the search results for
                  Customers and Freelancers, respectively
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlanSection />
      <Application />
      <DownloadApp />
    </>
  );
};

plan.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default plan;
