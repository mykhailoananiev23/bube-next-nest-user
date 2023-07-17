import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyPagination from "../../utils/pagination";
import React, { useEffect, useState } from "react";
import JobsLoader from "../Loaders/jobs";
import { HeartIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  initialState,
  PAGE_CHANGED,
  reducer,
} from "../../utils/paginationHelper";
import ApiService from "../../services/ApiService";

const MyJobs = ({ filterJob }: any) => {
  const queryClient = useQueryClient();
  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const filterJobs = filterJob === "recent" ? "desc" : "";
  const getData = async (page: number, fetchurl: string) => {
    const res = await ApiService.getData({
      url: fetchurl + `?&page=${page}&perpage=10&sort=${filterJobs}`,
    });
    return res;
  };
  const { isLoading, error, data, refetch } = useQuery(
    ["Jobs", queryPageIndex, queryPageSize],
    () => getData(queryPageIndex, `requests/fetch`),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );
  useEffect(() => {
    refetch();
  }, [filterJob]);

  const handlePageChange = (page: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    dispatch({ type: PAGE_CHANGED, payload: page.selected + 1 });
  };
  const [currentPage] = useState(0);

  if (isLoading) {
    return <JobsLoader />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row my-4">
        <div className="w-full md:w-2/3 my-2 md:my-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-[#FFFFFF] border border-[#FFFFFF] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block w-full pr-10 p-2.5"
              placeholder="Search Jobs Here.."
              required
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-end w-full md:w-1/3 md:text-right font-medium text-[#8B939A] my-2 md:my-4">
          <p>{new Intl.NumberFormat().format(data.count)} Services Available</p>
        </div>
      </div>
      {data.data.map((item: any) => (
        <div key={item.id} className="bg-white p-6 rounded-lg mb-6">
          <div className="justify-between">
            <div className="flex justify-between items-center">
              <h1 className="text-[#050931] text-xl font-medium">
                {item?.category?.name}
              </h1>
              <div className="flex items-center">
                <div className="rounded-full bg-[#EFEFEF] p-2 mr-4">
                  <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="rounded-full bg-[#EFEFEF] p-2">
                  <HeartIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="md:flex md:justify-between items-center max-sm:mb-3 mt-4">
              <h2 className="text-[#050931] text-2xl font-medium">
                {item.title}
              </h2>
              <h4 className={"text-[#8B939A]"}>{`Posted 1 Days ago`}</h4>
            </div>
            <div className="flex text-[#8B939A]">
              <div className="border-r-2 pr-3">
                {`${`fixed price`} - ${`Expert`} - Est.Budget $${item.price}`}
              </div>
              <div className="ml-3">{` Job Type - ${`Full time`}`}</div>
            </div>
            <hr className="my-5" />
            <p className="mb-5 overflow-hidden  leading-7 h-20 text-[#8B939A]">
              {item.description}
            </p>
            <div className="flex py-[2%]">
              <div>
                <p className="text-[#8B939A] text-sm">Highest Bid</p>
                <p className="text-[#050931] font-medium text-[1.2rem]">
                  {item.price}
                </p>
              </div>
              <Link href={{ pathname: "/sellers/job", query: { id: item.id } }}>
                <a className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0">
                  Apply Now{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="fa-solid fa-arrow-right ml-2"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <MyPagination
        pageCount={15}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MyJobs;
