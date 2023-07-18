import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { Tabs, Tab } from "../../components/tabs";
import { NextPageWithLayout } from "../_app";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { RequestCard } from "../../modules/sellers/RequestCard";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { Job } from "../../types/jobs";
import MyPagination from "../../utils/pagination";
import {
  PAGE_CHANGED,
  initialState,
  reducer,
} from "../../utils/paginationHelper";
import { getCookie } from "cookies-next";

const MyRequests: NextPageWithLayout = () => {
  const [activeTabId, setactiveTabId] = useState(1);
  const userId = Number(getCookie("NewUserId"));

  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const getData = async (page: number, fetchurl: string) => {
    const res = await ApiService.getData({
      url:
        fetchurl +
        `?page=${page}&perpage=5&userId=${userId}&status=${activeTabId}&f=f`,
    });
    return res;
  };

  const { data: userRequestsData, refetch } = useQuery(
    ["myrequests", queryPageIndex, queryPageSize, userId],
    () => getData(queryPageIndex, `requests/fetch`),
    {
      keepPreviousData: true,
      enabled: !!userId
    }
  );

  async function currentTab(message: string) {
    console.log(message);
    if (message === "Active") {
      setactiveTabId(1);
    } else if (message === "Completed") {
      setactiveTabId(3);
    } else {
      setactiveTabId(2);
    }
  }

  useEffect(()=>{
    refetch();
  },[activeTabId])

  const ItemsGroup = () => {
    return (
      <div className="flex flex-col gap-4 py-4">
        {userRequestsData?.total > 0 ? (
          userRequestsData.data.map((job: Job, idx:number) => (
            <RequestCard
              key={job.id}
              data={job}
            />
          ))
        ) : (
          <p className="text-center text-3xl p-24">No Requests Available</p>
        )}
      </div>
    );
  };

  const handlePageChange = (page: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch({ type: PAGE_CHANGED, payload: page.selected + 1 });
  };

  return (
    <>
      <main className="flex justify-center">
        <div className="container py-16 px-6 flex flex-col gap-4">
          <section className="flex flex-wrap gap-4 justify-between items-center">
            <h1 className="flex text-4xl font-semibold">My Requests</h1>
            <Link href="/buyers/create-service">
              <div className="text-white px-6 py-3 bg-blue-700 font-bold rounded-3xl cursor-pointer hover:bg-blue-800 active:bg-black">
                Create A Request
              </div>
            </Link>
          </section>
          <main>
            <Tabs currentTab={currentTab}>
              <Tab title="Active">
                <ItemsGroup />
              </Tab>
              <Tab title="In Progress">
                <ItemsGroup />
              </Tab>
              <Tab title="Completed">
                <ItemsGroup />
              </Tab>
            </Tabs>
          </main>
          {userRequestsData?.total > 5 && (
            <MyPagination
              pageCount={userRequestsData?.last_page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </>
  );
};

MyRequests.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default MyRequests;
