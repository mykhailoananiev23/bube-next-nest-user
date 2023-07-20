import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyPagination from "../../utils/pagination";
import React, { useContext, useEffect, useState } from "react";
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
import { TimeAgo } from "../timeago";
import { getCookie } from "cookies-next";
import { ActiveJobCard } from "./activeJobCard";
import { SearchWordContext } from "../../contexts/searchwordContext";

const MyJobs = ({ filterJob }: any) => {
  const {query} = useContext(SearchWordContext)
  const [endPagi, setEndPagi] = useState(1);
  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  const [searchWord, setSearchWord] = useState<string>("");
  const [favorJobs, setFavorJobs] = useState<any>([]);

  const filterJobs = filterJob === "recent" ? "desc" : "";
  const getData = async (page: number, fetchurl: string) => {
      const res = await ApiService.getData({
        url:
          fetchurl + query,
      });
      return res;
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["Jobs", queryPageIndex, queryPageSize],
    () => getData(queryPageIndex, `requests/fetch?&`),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  useEffect(() => {
    refetch();
  }, [filterJob, searchWord]);

  useEffect(() => {
    setEndPagi(data?.last_page);
  }, [data]);

  useEffect(() => {
    const fetchFavor = async () => {
      const userId = getCookie("userID");
      const url = `/favourites/fetch?userId=${userId}&type=job`;
      const response = await ApiService.getData({ url });
      setFavorJobs(response);
    };
    fetchFavor()
  },[])

  const jobsResultSearch = (e: any) => {
    if (e.code === "Enter") {
      setSearchWord(e.target.value);
    }
  };

  const handlePageChange = (page: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    dispatch({ type: PAGE_CHANGED, payload: page.selected + 1 });
  };

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
              onKeyDown={(e: any) => jobsResultSearch(e)}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-end w-full md:w-1/3 md:text-right font-medium text-[#8B939A] my-2 md:my-4">
          <p>{data.total} Services Available</p>
        </div>
      </div>
      {data.data.length === 0 ? (
        <div className="min-h-[300px] w-full flex justify-center items-center bg-gray-200 rounded-[10px]">
          <div className="text-medium text-slate-500 text-center min-h-[30px]">
            There is no record
          </div>
        </div>
      ) : (
        <>
          {data.data.map((item: any) => (
            <div key={item.id}>
              <ActiveJobCard item={item} refetch={refetch} favorJobs={favorJobs} />
            </div>
          ))}
          <MyPagination
            pageCount={endPagi}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MyJobs;
