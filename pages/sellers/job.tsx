import { JobsList, seller } from "../../hooks/data";
import {AccountLayout} from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useRef, useState } from "react";
import Image from "next/image";
import profilSeller from "../../public/images/profileSeller.svg";
import JobCard from "../../components/sellers/jobCard";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  DocumentCheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import ReactStars from "react-stars";
import {JobsCard} from "../../modules/sellers/JobsCard";
import { useRouter } from "next/router";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { Job } from "../../types/jobs"
import { UserInfoCard } from "../../modules/aboutClient";
import { getCookie } from "cookies-next";
import notify from "../../utils/toast";

const Job: NextPageWithLayout = () => {
  const userId = getCookie("NewUserId")
  const [job, setJob] = useState<any>();
  const router = useRouter()
  const [id, setId] = useState(router.query.id);
  const [applyFlg, setApplyFlg] = useState(true);
  const getData = async () => {
    const res = await ApiService.getData({
      url: `requests/${id}`,
    });
    return res;
  };
  const { isLoading, error, data, refetch } = useQuery(
    ["job", id],
    () => getData(),
    {
      staleTime: 5000,
      enabled: !!id,
      onSuccess: (resdata) => setJob(resdata as Job),
    }
  );

  console.log(data)
  
  useEffect(() => {
    setId(router.query.id);
    if(router.query.stt === "false"){
      setApplyFlg(false);
    }
  }, [router.query.id, router.query.stt]);
  
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState(false);
  const resetCopy: any = useRef();

  useEffect(() => {
    if (copied) {
      resetCopy.current = setTimeout(() => setCopied(false), 2000);
    }
    return () => {
      clearTimeout(resetCopy.current);
    };
  }, [copied]);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => setCopied(true));
    }
  };

  const applyToJob = () => {
    router.push({
      pathname: "/sellers/create-proposal", 
      query: { id: job?.id }
    })
  }

  return (
    <>
      <section className="pt-7 container mx-auto">
        <h1 className="md:w-full w-[90%] mx-auto text-[#050931] text-xl font-medium">
          <a className="text-primary">{job?.category?.name} </a> / {job?.subCategory?.map((sub: any) => (sub.name))}
        </h1>
        <h1 className="md:w-full w-[90%] mx-auto text-darkText text-5xl font-light capitalize py-8">
          {job?.title}
        </h1>
      </section>
      <section className="lg:flex lg:flex-row  sm:flex sm:justify-center container mx-auto">
        <div className="mr-6 rounded-xl md:w-2/3 w-[90%] mx-auto">
          <JobCard id={job?.id} data={job} category={ job?.category?.id } title={ job?.title } description={ job?.description } price={ job?.price } jobLevel={ job?.jobLevel?.name} jobType={ job?.jobType?.name} createdAt={ job?.createdAt } expectedDeliveryTime={ job?.expectedDeliveryTime} />
        </div>
        <div className="m-8 md:ml-8 bg-white sm:pl-0 rounded-xl md:w-1/3 w-[90%] mx-auto h-full py-8">
          <div className="flex flex-col w-[80%] md:w-[60%] mx-auto">
            <div className="mb-2">
              <button className={"rounded-full font-medium py-3 border w-full " + (applyFlg ? "bg-primary text-[#fff]": "border-2  text-[#d1d0d0]")} disabled={(!applyFlg ? true: false)} onClick={applyToJob}>
                Apply Now
              </button>
            </div>
            <div className="mb-2">
              <Link href={`/sellers/job`}>
                <a>
                  <button className="text-primary rounded-full font-medium py-3 border border-primary w-full">
                    Save This Job
                  </button>
                </a>
              </Link>
            </div>
          </div>
          <h1 className="text-center text-xl text-darkText my-2 font-medium">
            About The Seller
          </h1>
          <UserInfoCard data={job}/>
          <div className=" mt-6 p-5 m-5 rounded-lg">
            <h2 className={"text-[#050931] text-l mb-1 font-medium"}>
              Copy Job Link
            </h2>

            <div className="flex">
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                  value={process.env.FRONTEND_URL + router.asPath}
                  disabled
                />
                <button
                  type="submit"
                  onClick={copyToClipboard}
                  className={`absolute inline-flex items-center top-0 right-0 p-2.5 px-3 text-sm font-medium ${
                    copied ? `text-[#01A101]` : `text-darkText`
                  }
                   bg-gray-300 rounded-full border border-gray-300 hover:bg-gray-400 hover:text-white`}
                >
                  {copied ? (
                    <>
                      <>
                        <DocumentCheckIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className=""> Copied</span>
                      </>
                    </>
                  ) : (
                    <>
                      <DocumentDuplicateIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className=""> Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-7 bg-white">
        <div className="container mx-auto">
          <h1 className="md:w-full w-[90%] mx-auto text-darkText text-5xl font-light capitalize py-8">
            Similar <span className="font-medium">Jobs</span>
          </h1>
          <JobsCard jobs={JobsList} />
        </div>
      </section>
    </>
  );
};
Job.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Job;
