import Link from "next/link";
import JobCard from "../../components/sellers/jobCard";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ApiService from "../../services/ApiService";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import profileSeller from "../../public/images/profileSeller.svg";
import {
  DocumentCheckIcon,
  DocumentDuplicateIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/20/solid"
import { TimeAgo } from "../../components/timeago";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { getCookie } from "cookies-next";
import calcReviewMarks from "../../utils/getReviewMark";
const moment = require('moment')

const GigPreview: NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"))
  const router = useRouter();
  const [gigId, setGigId] = useState(router.query.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const resetCopy: any = useRef();
  const [ReviewList, setReviewList] = useState<any>([]);
  const [ReviewMark, setReviewMark] = useState<any>();

  const fetchReviewHistoryByUserId = async (id: number) => {
    const res = await ApiService.getData({
      url: `/reviews/findAll?proId=${id}`,
    });
    setReviewList(res);
  };

  useEffect(() => {
    fetchReviewHistoryByUserId(Number(router.query.id));
  }, [router.query]);

  useEffect(() => {
    const mark = calcReviewMarks(ReviewList, "pro")
    console.log(mark)
    setReviewMark(mark)
  }, [ReviewList]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setGigId("");
    } else {
      setGigId(router.query.id || "");
    }
  }, [router.query.id]);

  const { data: gigData } = useQuery(
    ["gig-view", gigId],
    () => ApiService.getData({ url: `gigs/${gigId}` }),
    { keepPreviousData: true, staleTime: 5000, enabled: !!gigId }
  );

  function formattedDate(date: string) {
    const format =
      new Date(date).getDate() +
      " " +
      new Date(date).toLocaleString("default", { month: "long" }) +
      " " +
      new Date(date).getFullYear();
    return format;
  }

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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const gigLikethis = (id: number) => {
    console.log("object", id);
  };

  const handlerCreateRoom = () => {
    console.log(gigData)
    // axios.post('/api/rooms/create', {
    //   userId,
    //   jobId: jobId,
    //   proId: data.user.id,
    // })
    router.push('/inbox')
  }

  const handlerCreateOffer = () => {
    router.push('/inbox')
  }

  if (!router.query.id) {
    return <span>Error</span>;
  }
  console.log(gigData)
  return (
    <>
      <div className="m-2 md:w-full w-full container">
        <h1 className="text-2xl md:text-5xl font-light text-[#050931] text-center">
          {gigData?.title}
        </h1>
      </div>
      <section className="lg:flex lg:flex-row  sm:flex sm:justify-center pt-7 container mx-auto">
        <div className="md:w-2/3 w-[90%] mx-6 mb-6 h-full-screen text-[#8B939A] bg-white px-8 py-8  drop-shadow-sm rounded-lg mt-8">
          <div>
            {gigData?.fileLocations?.map(
              (loc: { key: string; location: string }, idx: any) =>
                loc.location && (
                  <div key={idx}>
                    <Carousel 
                      itemClass="flex justify-center"
                      sliderClass="flex"
                      showDots={false}
                      responsive={responsive}
                    >
                      <Image
                        width={400}
                        height={400}
                        src={loc.location}
                        alt={gigData?.title}
                      />
                    </Carousel>
                  </div>
                )
            )}
            <div className="justify-between mt-12">
              <div className="flex justify-between text-[#8B939A] mt-3">
                <div className="">{gigData?.category?.name}</div>
                <div className="flex items-center">
                  <div className="rounded-full bg-[#EFEFEF] p-2">
                    <HeartIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div>Created At: {moment(gigData?.createdAt).format("MM/DD YYYY")}</div>
              </div>
              <hr className="my-5" />
              <div className="">
                <p className="text-lg leading-7 w-full my-1">
                  {gigData?.description}
                </p>
              </div>
              <hr className="my-5" />
              <div className="flex justify-around text-[#8B939A] mt-3 w-[450px]">
                <div className="text-xl flex flex-col">
                  <span className="text-[#8B939A]">Budget</span>
                  <span className="text-darkText text-end font-medium text-2xl">
                    {gigData?.price}
                  </span>
                </div>
                <div className="border-r-2 pr-3"></div>
                <div className="text-xl flex flex-col">
                  <span className="text-[#8B939A]">Expert</span>
                  <span className="text-darkText text-end font-medium text-2xl">
                    {"Intermediate"}
                  </span>
                </div>
              </div>
              <hr className="my-5" />
              <h2 className="text-xl pb-5 font-medium text-darkText">
                Skills And Expertise
              </h2>
              <div className="mt-5">
                {gigData?.skill?.map((skill: { id: number; name: string }) => (
                  <div
                    key={skill.id}
                    className="inline-block bg-gray-200 text-black font-bold px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="m-8 md:ml-8 bg-white sm:pl-0 rounded-xl md:w-1/3 w-[90%] mx-auto h-full">
          <h1 className="text-2xl md:text-2xl text-center font-light mt-6 text-[#050931]">
            About the Seller
          </h1>
          <div className="pt-8 w-full flex justify-center">
            <Image
              src={profileSeller}
              alt="Profile Seller"
              className="rounded-full "
            />
          </div>
          <div className="text-center mt-6 p-2">
            <h2 className="text-[#050931] text-2xl font-medium">{`${gigData?.user?.firstName} ${gigData?.user?.lastName}`}</h2>
          </div>
          <div className="flex text-center justify-center">
            <span className="flex">
            <span className="text-blue-500 font-bold flex gap-1 items-center">
              <span>{ReviewMark}</span>
              <StarIcon width={20}  />
              <span>{ReviewList.length} Reviews</span>
            </span>
            </span>
          </div>
          <h3 className="text-primary mt-2 justify-center flex text-l font-medium" onClick={handlerCreateRoom}>
            Send Message
          </h3>

          <hr className="mx-5 my-8" />
          <div className="flex justify-center items-center mx-5 my-2">
            <button className="w-4/6 rounded-full border text-white bg-primary px-8 py-2" onClick={handlerCreateOffer}>
              Hire Now
            </button>
          </div>
          <div className="flex justify-center items-center mx-5 my-2">
            <Link
              href={{
                pathname: "/sellers/create-gig",
                query: { gigId: gigData?.id },
              }}
            >
              <button className="w-4/6 rounded-full border text-primary border-primary px-8 py-2">
                Post A Gig Like This
              </button>
            </Link>
          </div>

          <div className={"mx-5 pb-8"}>
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
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
        </div>
      </section>
    </>
  );
};

GigPreview.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default GigPreview;
