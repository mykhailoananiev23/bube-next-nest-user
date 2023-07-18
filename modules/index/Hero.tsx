import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import profPic1 from "../../public/images/prof_pic1.png";
import stars from "../../public/images/stars.png";
import gmailPic from "../../public/images/gmail_pic.png";
import tickPic from "../../public/images/tick_pic.png";
import google from "../../public/images/google.png";
import paypal from "../../public/images/paypal.png";
import netflix from "../../public/images/netflix.png";
import facebook from "../../public/images/facebook.png";
import homePic1 from "../../public/images/home_pic1.png";
import Image from "next/image";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SearchWordContext } from "../../contexts/searchwordContext";

const companies = [
  { name: "Google", image: google },
  { name: "Paypal", image: paypal },
  { name: "Netflix", image: netflix },
  { name: "Facebook", image: facebook },
];

export const Hero = () => {
  const { setSearchWord } = useContext(SearchWordContext);
  const [filterFreelancerkey, setFilterFreelancerkey] = useState<string>("");
  const [filterJobKey, setfilterJobKey] = useState<string>("");
  const router = useRouter();
  const gotoFilterFreelancers = (e: any) => {
    if (e.code === "Enter") {
      router.push(`/filter/freelancers?ttldes=${e.target.value}`);
    }
  };

  const gotoFilterJobs = (e: any) => {
    if (e.code === "Enter") {
      router.push(`/filter/jobs?ttldes=${e.target.value}`);
    }
  };

  const handleSearch = () => {
    if (filterFreelancerkey !== "") {
      router.push(`/filter/freelancers?ttldes=${filterFreelancerkey}`);
      return;
    }
    if (filterJobKey !== "") {
      router.push(`/filter/jobs?ttldes=${filterJobKey}`);
      return;
    }
  };
  return (
    <div className="bg-[#DCF0FB]">
      <div className="container px-2 mx-auto sm:px-[] md:px-[] lg:px-[] xl:px-[] 2xl:px-[]">
        <div className="md:flex items-center ">
          <div className="md:flex-auto md:w-1/2 pt-8 md:pt-0 justify-center">
            <div className="flex w-full h-[42px] bg-[#C8E5F5] rounded-3xl md:mt-20 relative">
              <a
                href="#"
                className={
                  "max-[639px]:text-[] px-4 text-[0.7rem] mx-1 text-white text-center bg-[#1e50d7] rounded-3xl leading-8 h-3/4 my-auto"
                }
              >
                New
              </a>
              <p className="text-[#363636] text-[0.8rem] lg:text-[0.9rem] leading-10 ml-2 overflow-hidden">
                stay connected to get upcoming job with us
              </p>
            </div>
            <div className="text-[#050931] mt-6 md:mt-12">
              <div className="max-[639px]:text-center sm:text-center md:text-left">
                <span className=" font-thin text-[2.5rem] leading-10 max-[639px]:text-[30px] max-[639px]:text-center md:text-[40px] lg:text-[52px]">
                  The Easiest Way To
                </span>
                <br />
                <span className="uppercase leading-none text-[2.8rem] lg:text-[4.5rem] font-medium max-[639px]:text-[30px] md:text-[40px] lg:text-[54px]">
                  access artisans
                </span>
              </div>
              <p className="text-[1.2rem] lg:text-[1.7rem] font-light my-5 max-[639px]:text-[15px] max-[639px]:text-center sm:text-center md:text-left">
                Your Dream Job is waitng For you
              </p>
              <div className="flex bg-white p-2 mb-[20px] rounded h-[3.5rem] lg:h-[4rem] w-full sm:w-full md:w-[97%] sm:text-center lg:w-[97%] overflow-hidden relative justify-evenly max-[639px]:hidden">
                <input
                  type=""
                  name=""
                  placeholder="Job title or key words"
                  className="bg-[#F5F6FA] rounded w-[50%] h-[99%] text-center focus:outline-[#0071BC]"
                  onKeyDown={(e: any) => gotoFilterJobs(e)}
                  onChange={(e: any) => setfilterJobKey(e.target.value)}
                  />
                <input
                  type=""
                  name=""
                  placeholder="Talent"
                  className="bg-[#F5F6FA] rounded w-[40%] h-[99%] text-center focus:outline-[#0071BC]"
                  onKeyDown={(e: any) => gotoFilterFreelancers(e)}
                  onChange={(e: any) => setFilterFreelancerkey(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#0071BC] text-white md:[8%] w-[8%] rounded"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="bg-white p-2 rounded h-auto max-[639px]:block sm:hidden">
                <input
                  type=""
                  name=""
                  placeholder="Job title or key words"
                  className="bg-[#F5F6FA] rounded w-full h-[3.3rem]  text-center focus:outline-[#0071BC]"
                  onKeyDown={(e: any) => gotoFilterJobs(e)}
                  onChange={(e: any) => setfilterJobKey(e.target.value)}
                />
                <input
                  type=""
                  name=""
                  placeholder="Talent"
                  className="bg-[#F5F6FA] rounded w-full h-[3.3rem] text-center focus:outline-[#0071BC] mt-[2px]"
                  onKeyDown={(e: any) => gotoFilterFreelancers(e)}
                  onChange={(e: any) => setFilterFreelancerkey(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-[#0071BC] text-white w-full h-[3.3rem] rounded mt-[2px]"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-auto md:w-1/2 relative">
            <div className="w-[80%] h-auto mt-7 mx-auto flex items-bottom max-[639px]:pb-[7rem]">
              <Image src={homePic1} alt="Home Pic" />
              <div className="z-10 bg-[#ffffff82] rounded-2xl w-[7rem] h-[7rem] lg:w-[9rem] lg:h-[9rem] absolute shadow-md border border-solid border-[#fff] ">
                <div className="w-[50%] h-auto object-center mx-auto mt-2 lg:mt-4">
                  <Image
                    src={profPic1}
                    alt="Profile Pic"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-center text-black font-medium text-[0.8rem] md:lg:text-sm hidden">
                    Hemens
                  </p>
                  <p className="text-center text-[#8B939A] font-light text-[0.8rem] md:lg:text-sm hidden max-[639px]:hidden md:block">
                    Applied for a job
                  </p>
                </div>
              </div>
              <div className="z-10 bg-[#ffffffb5] h-[4.5rem] w-[16rem] absolute rounded-2xl left-0 shadow-md bottom-0 lg:w-fit lg:bottom-[0.5rem]">
                <div className="w-1/3 mt-3 lg:mt-5 ml-4">
                  <Image src={stars} alt="Stars" />
                </div>
                <p className="text-[#4F516A] text-[0.8rem] lg:text-sm mt-2 ml-4 lg:pr-5">
                  4.7 Rating based on over 500 reviews
                </p>
              </div>
              <div className="z-10 bg-[#ffffffb5] h-[4.5rem] w-[16rem] absolute rounded-2xl right-0 shadow-md bottom-[4.7rem] lg:bottom-[5.2rem]">
                <div className="w-[12%] mt-2 lg:mt-3 ml-4 absolute">
                  <Image
                    src={gmailPic}
                    className="w-[12%] mt-2 lg:mt-3 ml-4 absolute"
                    alt="Gmail"
                  />
                </div>
                <div className="w-[10%] mt-2 lg:mt-3 mr-2 right-0 absolute">
                  <Image src={tickPic} alt="Tick " className="" />
                </div>
                <p className="text-[#0071BC] font-medium text-md relative z-10 lg:mt-3 ml-16 mt-2">
                  Congrats!
                </p>
                <p className="text-[#4F516A] text-sm mt-1 ml-16 relative z-10">
                  You Have got an Email
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="md:flex items-center ">
          <div className="md:flex-auto md:w-1/2 pt-8 md:pt-0 justify-center">
            
            <div className="mt-6 lg:mt-12">
              <p className="text-[#050931] text-[0.9rem] mb-2">
                We are trusted by
              </p>
              <div className="bg-white p-2 grid grid-cols-4 gap-4 content-center rounded w-[9rem]">
                {companies.map((company) => (
                  <div key={company.name} className="flex items-center">
                    <Image src={company.image} alt={company.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:flex-auto md:w-1/2 relative">
            <div className="z-10 bg-[#ffffff82] rounded-2xl w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem] lg:w-[9rem] lg:h-[9rem] absolute shadow-md border border-solid border-[#fff] mt-[4rem] lg:mt-[6rem] lg:ml-[5.5rem] ml-[2rem]">
              <div className="w-[50%] h-auto object-center mx-auto mt-2 lg:mt-4">
                <Image
                  src={profPic1}
                  alt="Profile Pic"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-center text-black font-medium text-[0.8rem] md:lg:text-sm hidden">
                  Hemens
                </p>
                <p className="text-center text-[#8B939A] font-light text-[0.8rem] md:lg:text-sm hidden">
                  Applied for a job
                </p>
              </div>
            </div>
            <div className="z-10 bg-[#ffffffb5] h-[4.5rem] w-[16rem] lg:h-[5rem] lg:w-[18rem] absolute rounded-2xl md:mt-[18.2rem] lg:mt-[23rem] lg:ml-2 xl:mt-[32rem] xl:ml-20 mt-[21.5rem] ml-0 shadow-md">
              <div className="w-1/3 mt-3 lg:mt-5 ml-4">
                <Image src={stars} alt="Stars" />
              </div>
              <p className="text-[#4F516A] text-[0.8rem] lg:text-sm mt-2 ml-4">
                4.7 Rating based on over 500 reviews
              </p>
            </div>
            <div className="z-10 bg-[#ffffffb5] h-[4.5rem] w-[16rem] lg:h-[5rem] lg:w-[18rem] absolute rounded-2xl right-0 xl:mr-[8rem] xl:mt-[25rem] lg:mr-[1rem] lg:mt-[19rem] md:mt-[13.5rem] mr-2 mt-[16rem] shadow-md">
              <div className="w-[12%] mt-2 lg:mt-3 ml-4 absolute">
                <Image
                  src={gmailPic}
                  className="w-[12%] mt-2 lg:mt-3 ml-4 absolute"
                  alt="Gmail"
                />
              </div>
              <div className="w-[10%] mt-2 lg:mt-3 mr-2 right-0 absolute">
                <Image src={tickPic} alt="Tick " className="" />
              </div>
              <p className="text-[#0071BC] font-medium text-md relative z-10 lg:mt-3 ml-16 mt-2">
                Congrats!
              </p>
              <p className="text-[#4F516A] text-sm mt-1 ml-16 relative z-10">
                You Have got an Email
              </p>
            </div>
            <div className="w-5/6 h-auto mt-7 mx-auto lg:ml-[7rem] flex items-bottom">
              <Image src={homePic1} alt="Home Pic" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
