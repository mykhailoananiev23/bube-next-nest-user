import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import yellowDot from "../../public/images/yellow_dot.png";
import blueDot from "../../public/images/blue_dot.png";
import orangeDot from "../../public/images/orange_dot.png";
import redDot from "../../public/images/red_dot.png";
import ApiService from "../../services/ApiService";
import { useState, useEffect } from "react";
import Loader from "../../components/Loaders/jobs";
import { Job } from "../../types/jobs";
import { TimeAgo } from "../../components/timeago"

const JobCard = ({ id, dot, category, time, title, type, bid }: any) => (
  <div className="bg-white lg:w-[30%] w-[80%] lg:mx-4 mx-auto h-[18rem] mb-10 rounded-xl mr-10 overflow-hidden shadow-2xl">
    <div className="flex mx-[6%] mt-[7%]">
      <div className="w-[3%] h-[3%] my-auto">
        <Image src={dot} alt="Dot" />
      </div>
      <p className="text-[#050931] pl-[3%] text-[0.8rem] font-medium my-auto">
        {category}
      </p>
      <div className="text-[#8B939A] text-[0.8rem] my-auto ml-auto mr-0">
        <TimeAgo datetime={ time } />
      </div>
    </div>
    <div className="pt-[2.5%] px-[12%]">
      <p className="text-[#050931] text-[1rem] font-medium">{title}</p>
      <p className="text-[#8B939A] text-[0.85rem] mt-[10%] pb-[2%] border border-[#E7E7E7] border-b-2 border-l-0 border-r-0 border-t-0">
        Job Type - {type}
      </p>
    </div>
    <div className="flex py-[2%] px-[12%]">
      <div>
        <p className="text-[#8B939A] text-[0.7rem]">Highest Bid</p>
        <p className="text-[#050931] font-medium text-[1.2rem]">${bid}</p>
      </div>
      <Link href={{ pathname: "/sellers/job", query: { id: id } }}>
        <a className="text-[#0071BC] text-[0.95rem] my-auto ml-auto mr-0">
          Apply Now{" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="fa-solid fa-arrow-right ml-2"
          />
        </a>
      </Link>
    </div>
  </div>
);

export const LatestJobs = () => {
  const [jobs, setJob] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const url: string = `requests/fetch?sort=desc`;
      const response = await ApiService.getData({ url });
      setJob(response.data as Job[]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-[#FFF]">
      <div className="container px-4 mx-auto">
        <div className="pt-12 mb-12">
          <h4 className="leading-none text-center lg:text-left">
            <span className="font-thin text-[2.5rem] max-[639px]:text-[30px] md:text-[40px]">Latest</span>
            <br />
            <span className="font-medium text-[3rem] max-[639px]:text-[30px] md:text-[40px]">Jobs Here</span>
          </h4>
        </div>
        <div
          className="flex flex-wrap justify-start"
        >
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              dot={redDot}
              category={job?.category?.name}
              time={job?.createdAt}
              title={job?.title}
              type={job?.jobType?.name}
              bid={job?.price}
            />
          ))}
        </div>
        <div className="text-center">
          <Link href={`/filter/jobs`}>
            <button className="bg-[#0071BC] text-white text-md px-10 py-3 rounded-3xl">
              View All Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
