// import { JobsList, seller } from "../../hooks/data";
import {AccountLayout} from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import profilSeller from "../../public/images/profileSeller.svg";
// import JobCard from "../../components/sellers/jobCard";
// import Link from "next/link";
// import { CheckCircleIcon } from "@heroicons/react/20/solid";
// import {
//   DocumentCheckIcon,
//   DocumentDuplicateIcon,
// } from "@heroicons/react/24/outline";
// import ReactStars from "react-stars";
// import {JobsCard} from "../../modules/sellers/JobsCard";
import { useRouter } from "next/router";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { Job } from "../../types/jobs"
import { SelRequestSubJob } from "../../components/sellers/request/subJob";
import { Tab, Tabs } from "../../components/tabs";

const style = {
  catButton: " py-20px text-center border-2 border-black py-[20px] uppercase ",
  leftBorder: " rounded-s-[20px] ",
  rightBorder: " rounded-e-[20px] "
}

const Request: NextPageWithLayout = () => {
  const [job, setJob] = useState<Job>();
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
    if(!applyFlg){
      alert()
    } else if(applyFlg){
      router.push({
        pathname: "/sellers/create-proposal", 
        query: { id: job?.id }
      })
    }
  }

  const [SelTab, setSelTab] = useState("vr")

  const selTab = (str: string) => {
    setSelTab(str)
  }

  if(isLoading){
    return <p></p>
  }

  async function currentTab(message: string) {
    if (message === "View Post") {
      setSelTab("vr");
    } else if (message === "Review Proposals") {
      setSelTab("rp");
    } else {
      setSelTab("hi");
    }
  }

  return (
    <div className="w-[70%] m-auto rounded-lg">
      <div className="w-full bg-white py-[20px] mb-[20px] rounded-[20px]">
        JobTitle
      </div>
      <div className="w-full bg-white py-[20px] mb-[20px] rounded-[20px]">
        <div className="">
          <Tabs currentTab={currentTab}>
              <Tab title="View Post">
              </Tab>
              <Tab title="Review Proposals">
              </Tab>
              <Tab title="Hires">
              </Tab>
            </Tabs>
        </div>
      </div>
      { job && <SelRequestSubJob data={job} tabId={SelTab} />}
    </div>
  );
};
Request.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Request;
