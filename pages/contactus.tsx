/* eslint-disable react/no-children-prop */

import ContactUsBody from "../modules/contactus/ContactUsBody";
import { MainBody } from "../components/mainbody";
import { HeroSection } from "../modules/faq/Hero";
import { NextPageWithLayout } from "./_app";
import React, { ReactElement, useEffect, useState } from "react";
import { AccountLayout } from "../components/layout/AccountLayout";
import ApiService from "../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { Tickets } from "../types/tickets";
import MyPagination from "../utils/pagination";
import { PAGE_CHANGED, initialState, reducer } from "../utils/paginationHelper";
import { Loading } from "../components/loading/loading";
import { getCookie } from "cookies-next";
import ReviewModal from "../components/modal/ReviewModal";

const ContactUs: NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"))
  const [ticketData, setTicketsData] = useState<Tickets[]>([]);
  const [status, setStatus] = useState("");
  const [paginationKey, setpaginationkey] = useState(0);
  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  const [ReviewModalFlg, setReviewModalFlg] =useState(false)
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {

    }
  }, []);

  const getData = async (page: number, fetchurl: string) => {
    const res = await ApiService.getData({
      url:
        fetchurl +
        `?userId=${userId}`,
    });
    return res;
  };
  const { isLoading, error, data, refetch } = useQuery(
    ["tickets-list", userId, queryPageIndex, status],
    () => getData(queryPageIndex, "dispute/fetch"),
    {
      enabled: !!userId,
      keepPreviousData: false,
      onSuccess: (res) => setTicketsData(res as Tickets[]),
    }
  );
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch({ type: PAGE_CHANGED, payload: 1 });
    setpaginationkey((prevKey) => prevKey + 1);
  }, [status]);

  useEffect(() => {
    console.log(ticketData, data);
  }, [ticketData, data]);

  const handlePageChange = (page: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    dispatch({ type: PAGE_CHANGED, payload: page.selected + 1 });
  };

  const refetchData = () => {
    refetch();
  };

  async function handleStatusChange(value: string) {
    await setStatus(value);
  }
  const heroBody = (
    <>
      <h1 className="text-center text-5xl md:text-7xl capitalize font-extralight mt-11 pb-8	">
        My Support <span className="font-semibold ">Requests</span>
      </h1>
    </>
  );

  const mainChildren = (
    <>
      <HeroSection children={heroBody} />
      <section className="leading-relaxed mt-8 mb-8 mx-auto px-2 lg:px-8  space-y-2 flex flex-col content-center">
        {/*<ContactUsBody ticketData={ticketData} userId={userId} onmodalClose={refetchData} statusFilter={handleStatusChange} />*/}
        <ContactUsBody
          ticketData={data}
          userId={1}
          onmodalClose={refetchData}
          statusFilter={handleStatusChange}
        />
        <MyPagination
          key={paginationKey}
          pageCount={data?.last_page}
          handlePageChange={handlePageChange}
        />
      </section>
    </>
  );

  // if (isLoading) {
  //   return <Loading title="Loading... contact us" />;
  // }

  return <MainBody children={mainChildren} />;
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default ContactUs;
