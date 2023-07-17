import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useState } from "react";
import { ActiveJobCard } from "../../components/sellers/activeJobCard";
import {
  SearchWordContext,
  SearchWordProps,
} from "../../contexts/searchwordContext";
import ApiService from "../../services/ApiService";
import MyPagination from "../../utils/pagination";

export const FilterJobsResultCard = ({ className }: any) => {
  const { setSearchWord, query, searchWord } = useContext(SearchWordContext);
  const [FilterKey, setFilterKey] = useState<any>("best");
  const [FilterJobs, setFilterJobs] = useState<any>([]);
  const [TotalCount, setTotalCount] = useState();
  const [favorJobs, setFavorJobs] = useState<any>([]);
  const [endPagi, setEndPagi] = useState(1);

  const fetchFilterJobs = async () => {
    const url = "/requests/fetch?";
    const res = await ApiService.getData({ url: url + query });
    setTotalCount(res.total);
    setEndPagi(res.last_page);
    console.log(res.data);
    if (searchWord.status === "saved") {
      const savedJobs = res.data.filter((ele: any) => {
        return ele.favor !== null;
      });
      setFilterJobs(savedJobs);
    } else {
      setFilterJobs(res.data);
    }
  };

  useEffect(() => {
    fetchFilterJobs();
  }, [query]);

  useEffect(() => {
    setFilterKey(searchWord.status);
  }, [searchWord]);

  const handleFilter = (str: string) => {
    setSearchWord((prev: SearchWordProps) => {
      return {
        ...prev,
        status: str,
      };
    });
  };

  useEffect(() => {
    const fetchFavor = async () => {
      const userId = getCookie("userID");
      const url = `/favourites/fetch?userId=${userId}&type=job`;
      const response = await ApiService.getData({ url });
      setFavorJobs(response);
    };
    fetchFavor();
  }, []);

  const setSwdContent = (e: any) => {
    if (e.code === "Enter") {
      setSearchWord((prev: SearchWordProps) => {
        return {
          ...prev,
          content: e.target.value,
        };
      });
    }
  };

  const handlePageChange = (page: any) => {
    setSearchWord((prev: SearchWordProps) => {
      return {
        ...prev,
        page: Number(page.selected) + 1,
      };
    });
  };

  return (
    <div className={className + " rounded-[10px] p-[40px]"}>
      <h1 className="text-2xl md:text-5xl font-light mb-6 text-[#050931]">
        Recent
        <span className="font-bold ml-2">Jobs Posted</span>
      </h1>
      <div className="md:flex flex-col md:flex-row md:ml-auto mt-3">
        {/* <button
          onClick={() => handleFilter("best")}
          className={`mr-4 lg:mr-8 md:mr-6 font-medium text-[#363636] ${
            FilterKey === "best" ? "border-primary border-b-2" : ""
          }`}
        >
          Best Matches
        </button> */}
        <button
          onClick={() => handleFilter("recent")}
          className={`mr-4 lg:mr-8 md:mr-6 font-medium text-[#363636] ${
            FilterKey === "recent" ? "border-primary border-b-2" : ""
          }`}
        >
          Most Recent
        </button>
        <button
          onClick={() => handleFilter("saved")}
          className={`mr-4 lg:mr-8 md:mr-6 font-medium text-[#363636] ${
            FilterKey === "saved" ? "border-primary border-b-2" : ""
          }`}
        >
          Saved jobs
        </button>
      </div>
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
              onKeyDown={(e: any) => setSwdContent(e)}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-end w-full md:w-1/3 md:text-right font-medium text-[#8B939A] my-2 md:my-4">
          <p>{TotalCount} Services Available</p>
        </div>
      </div>
      {/* filtering jobs list section */}
      <div className="">
        {FilterJobs.map((ele: any, idx: number) => (
          <div key={idx}>
            <ActiveJobCard
              item={ele}
              refetch={fetchFilterJobs}
              favorJobs={favorJobs}
              status={searchWord.status}
            />
          </div>
        ))}
        <MyPagination pageCount={endPagi} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};
