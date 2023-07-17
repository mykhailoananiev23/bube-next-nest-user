import { Tab, Tabs } from "../../components/tabs";
import * as React from "react";
import { useState } from "react";
import { FreelancerCard } from "./freelancerCard";

export const FilterFreelancerRCard = ({ className }: any) => {
  const [Title, setTitle] = useState<string>("Best Matches");
  const [Jobs, setJobs] = useState<any>([]);
  const currentTab = (message: string) => {

  };
  return (
    <div className={className + " rounded-[10px] p-[40px]"}>
      <div>
        <div className="text-[#050931] text-[50px] font-[200] leading-[75px]">
          Recent <span className="">Job Posted</span>
        </div>
        <div className="mb-[49px]">
          <Tabs currentTab={currentTab}>
            <Tab title="Best Matches"></Tab>
            <Tab title="Most Recent"></Tab>
          </Tabs>
        </div>
        <div className="md:flex md:flex-row md:items-center md:justify-between text-[#8B939A] ">
          <div className="w-full md:w-7/12">
            <input
              type="text"
              id="simple-search"
              className="bg-[#FFFFFF] border border-[#FFFFFF] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block w-full px-4 p-2.5"
              placeholder="Search Jobs Here.."
            //   onKeyDown={(e: any) => setSwdContent(e)}
            />
          </div>
          <div className="w-full md:w-3/12">{`${Jobs.length} Services Available`}</div>
        </div>
      </div>
    <div className="my-[20px]">
        <FreelancerCard />
    </div>
    </div>
  );
};
