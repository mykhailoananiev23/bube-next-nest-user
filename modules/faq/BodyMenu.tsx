import { FaqCards } from "./FaqCards";
import { Pagination } from "../../components/pagination";
import {
  initialState,
  PAGE_CHANGED,
  reducer,
} from "../../utils/paginationHelper";
import JobsLoader from "../../components/Loaders/jobs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import MyPagination from "../../utils/pagination";
import ApiService from "../../services/ApiService";
import { type } from "os";

export const BodyMenu = ({ categoryFilter, faqsList }: any) => {
  const [paginationKey, setPaginationKey] = useState(0);

  const getData = async (page: number, fetchurl: string) => {
    const res = await ApiService.getData({
      url: fetchurl + `&page=${page}&perpage=10`,
    });
    return res;
  };
  const queryClient = useQueryClient();
  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: 1 });
    setPaginationKey((prevKey) => prevKey + 1);
  }, [categoryFilter]);

  const { isLoading, error, data } = useQuery(
    ["Faqs", queryPageIndex, queryPageSize, categoryFilter],
    () => getData(queryPageIndex, `faq/fetch?category=${categoryFilter}`),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );
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
    <div className="my-12 w-full mx-auto rounded-xl bg-[#FFFFFF]">
      <div className="border-b ">
        <h5 className="p-4  text-lg  font-extrabold capitalize	">
          {categoryFilter}
        </h5>
      </div>
      {
        data.data.length === 0 && <div className="h-[40px] flex items-center justify-center"><p>No Records Available</p></div>
      }
      {data.data.map((item: any, idx: number) => (
        <FaqCards key={item.id} faqsList={item} />
      ))}
      <MyPagination
        key={paginationKey}
        pageCount={data.total / queryPageSize}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
