import Link from "next/link";
import JobCard from "../../components/sellers/jobCard";
// import { jobData, proposalData } from "../../hooks/data";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ApiService from "../../services/ApiService";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Job } from "../../types/jobs";
import notify from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import Modal from "../../components/modal/Modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Proposal: NextPageWithLayout = () => {
  const router = useRouter();

  const [jobId, setJobId] = useState(router.query.jobId);
  const [proposalId, setProposalId] = useState(router.query.id);
  const [showModal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { data: proposalData } = useQuery(
    ["proposal", proposalId],
    () => ApiService.getData({ url: `proposal/${proposalId}` }),
    { keepPreviousData: true, staleTime: 5000, enabled: !!proposalId }
  );
  const { data: jobs } = useQuery(
    ["job-detail", jobId],
    () => ApiService.getData({ url: `requests/${jobId}` }),
    { keepPreviousData: true, staleTime: 5000, enabled: !!jobId }
  );

  useEffect(() => {
    setJobId(router.query.jobId);
  }, [router.query.jobId]);

  useEffect(() => {
    setProposalId(router.query.id);
  }, [router.query.id]);

  function formattedDate(date: string) {
    const format =
      new Date(date).getDate() +
      " " +
      new Date(date).toLocaleString("default", { month: "long" }) +
      " " +
      new Date(date).getFullYear();
    return format;
  }
  const withdrawClick = () => {
    setModal(true);
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleWithdraw = async () => {
    notify.success("Proposal Withdraw Was Successfully");
    const res = await ApiService.deleteData({ url: `proposal/${proposalId}` });
    setModal(false);
    setTimeout(() => {
      router.push("/sellers/proposals");
    }, 1000);
  };
  
  const WithdrawData = [
    { id: 1, label: "Applied by mistake" },
    { id: 2, label: "Rate too Low" },
    { id: 3, label: "Scheduling Conflict With Client" },
    { id: 4, label: "Unresponsive Client" },
    { id: 5, label: "Others" },
  ];

  if (!router.query.id) {
    return <span>Error</span>;
  }

  return (
    <div className="bg-bgcolor   h-full-screen text-[#8B939A] text-xl ">
      <ToastContainer />
      <section className="pt-7 container mx-auto">
        <h1 className="md:w-full w-[90%] mx-auto text-[#050931] text-xl font-medium">
          <a className="text-primary">{jobs?.category?.name} </a> /{" "}
          {jobs?.subCategory?.map((sub: any) => sub.name)}
        </h1>
        <h1 className="md:w-full w-[90%] mx-auto text-darkText text-5xl font-light capitalize py-8">
          {jobs?.title}
        </h1>
      </section>
      <div className="px-8 container mx-auto py-4">
        <JobCard
          id={jobs?.id}
          category={jobs?.category?.id}
          title={jobs?.title}
          description={jobs?.description}
          price={jobs?.price}
          jobLevel={jobs?.jobLevel?.name}
          jobType={jobs?.jobType?.name}
          createdAt={jobs?.createdAt}
          expectedDeliveryTime={jobs?.expectedDeliveryTime}
        />
        <div className=" bg-white px-8 py-8  drop-shadow-sm rounded-lg mt-8 ">
          <h1 className="text-darkText font-medium text-2xl mb-4">
            Your Terms
          </h1>
          <h2>
            Your Budget :{""}
            <span className="text-darkText font-medium">
              {proposalData?.price}
            </span>
          </h2>
          <hr className="my-4" />
          <h2>
            Time Frame:{" "}
            <span className="text-darkText font-medium">
              {proposalData?.expectedDeliveryTime}
            </span>
          </h2>
          <hr className="my-4" />
          <h2 className="text-darkText font-medium"> You Will Receive</h2>
          <h2 className="my-4">The Estimated Payment, After Service Fee </h2>
          <h2 className="text-darkText font-medium mb-4">{`800`}</h2>
          <h2 className="text-darkText font-medium">Cover Letter </h2>
          <p className="py-4 text-lg leading-7">{proposalData?.coverletter}</p>
          <hr className="mb-8" />
          <Link href={`/sellers/job`}>
            <button className="text-white rounded-full px-8 py-2 border bg-primary font-medium text-xl ">
              Change Terms
            </button>
          </Link>
          <button
            onClick={withdrawClick}
            className="text-primary rounded-full px-8 py-2 border border-primary font-medium ml-0 sm:ml-6  mt-8 text-xl"
          >
            Withdraw Proposal
          </button>
        </div>
      </div>
      <Modal onClose={() => setModal(false)} visible={showModal}>
        <div className="bg-white p-6 sm:p-8 rounded-lg flex flex-col gap-8 shadow-md lg:w-1/3 md:w-full m-2">
          <div className="text-gray-900 text-center flex justify-between text-lg font-bold">
            <span className="p-2 pl-0"> Withdraw Proposal</span>
            <button
              onClick={() => setModal(false)}
              className="p-2 lg:pr-0 lg:px-8 md:mx-2 text-center"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div>
            <p className="text-neutral-600 font-semibold">Choose Reason</p>
          </div>
          <div>
            {WithdrawData.map((data) => (
              <div key={data.id} className="flex items-center p-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value={data.label}
                  checked={selectedOption === data.label}
                  onChange={handleOptionChange}
                />
                <label className="ml-2 block text-gray-700 text-base font-medium">
                  {data.label}
                </label>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => setModal(false)}
              className="p-2 lg:px-8 md:mx-2 text-white text-center bg-[#1e50d7] rounded-3xl mt-3 md:mt-0"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              className="p-2 lg:px-8 md:mx-2 text-[#1e50d7] text-center border border-solid border-[#1e50d7] rounded-3xl"
            >
              Withdraw
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Proposal.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Proposal;
