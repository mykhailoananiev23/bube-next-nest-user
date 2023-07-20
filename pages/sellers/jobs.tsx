import { PlayIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ReactElement, useContext, useEffect, useState } from "react";
import { user } from "../../hooks/data";
import Link from "next/link";
import { NextPageWithLayout } from "../_app";
import { AccountLayout } from "../../components/layout/AccountLayout";
import Image from "next/image";
import profileSeller from "../../public/images/profileSeller.svg";
import MyJobs from "../../components/sellers/jobs";
import { getCookie } from "cookies-next";
import { ProCard } from "../../modules/account/ProCard";
import { SearchWordContext, SearchWordProps } from "../../contexts/searchwordContext";

// const Jobs: NextPageWithLayout = () => {
const Jobs: NextPageWithLayout = () => {
  const {setSearchWord} = useContext(SearchWordContext)
  const [filterJob, setFilterJob] = useState("best");
  const [localUser, setUser] = useState<any>();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  const handleFilter = (type: string) => {
    setFilterJob(type)
    setSearchWord((prev: SearchWordProps) => {
      return {
        ...prev,
        status: type
      }
    })
  };

  return (
    <>
      <div className="bg-secondary text-center text-darkText py-16">
        <h1 className="text-5xl mb-6">
          <span className="font-light"> Hi,</span>
          <span className="uppercase text-5xl font-bold">
            {localUser?.name}
          </span>
        </h1>
        <h2 className="text-3xl mb-2">
          Create Your Gigs To Get More Projects Invitations{" "}
        </h2>
        <div className="flex-column sm:flex sm:justify-center">
          <Link href="/sellers/create-gig">
            <button className="bg-primary text-md font-medium  rounded-full px-7 m-2 py-3 text-white ">
              Create Gig
            </button>
          </Link>
          <Link href="#">
            <a className="text-primary text-md font-medium m-2 rounded-full border-2 border-primary py-3 px-7 text-center inline-flex items-center">
              <h2>How It Works</h2>{" "}
              <PlayIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </Link>
        </div>
      </div>
      <section className="lg:flex lg:flex-row px-10 sm:justify-center pt-7 mx-auto">
        <div className="rounded-xl w-full container mx-auto">
          <h1 className="text-2xl md:text-5xl font-light mb-6 text-[#050931]">
            Recent
            <span className="font-bold ml-2">Jobs Posted</span>
          </h1>
          <div className="md:flex flex-col md:flex-row md:ml-auto mt-3">
            <button
              onClick={() => handleFilter("best")}
              className={`mr-4 lg:mr-8 md:mr-6 font-medium text-[#363636] ${
                filterJob === "best" ? "border-primary border-b-2" : ""
              }`}
            >
              Best Matches
            </button>
            <button
              onClick={() => handleFilter("recent")}
              className={`mr-4 lg:mr-8 md:mr-6 font-medium text-[#363636] ${
                filterJob === "recent" ? "border-primary border-b-2" : ""
              }`}
            >
              Most Recent
            </button>
            <button
              onClick={() => handleFilter("saved")}
              className={`mr-4 lg:mr-8 md:mr-6 font-medium text-[#363636] ${
                filterJob === "saved" ? "border-primary border-b-2" : ""
              }`}
            >
              Saved jobs
            </button>
          </div>
          <MyJobs filterJob={filterJob} />
        </div>
        <div className="m-8 md:ml-8 bg-white sm:pl-0 rounded-xl md:w-1/3 w-[90%] mx-auto h-full">
          <ProCard
            userId={Number(getCookie("NewUserId"))}
            type=""
            showMethod={1}
          />
          <hr className="mx-5 my-8" />
          <div className="flex justify-between items-center mx-5 my-8">
            <h2 className="text-[#050931] text-xl font-semibold">
              My Categories
            </h2>
            <button>
              <PencilIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className={"mx-5 pb-8"}>
            {user.categories.map((category) => (
              <li
                key={category}
                className="list-none m-2 font-medium text-primary"
              >
                {category}
              </li>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
Jobs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Jobs;
