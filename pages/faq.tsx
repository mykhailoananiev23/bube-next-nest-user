/* eslint-disable react/no-children-prop */

import { BodyMenu } from "../modules/faq/BodyMenu";
import { MainBody } from "../components/mainbody";
import { HeroSection } from "../modules/faq/Hero";
import { SearchBox } from "../modules/faq/SearchBox";
import { SideMenu } from "../modules/faq/SideMenu";
import { categories, faqsList } from "../hooks/data";
import { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect, useState } from "react";
import { AccountLayout } from "../components/layout/AccountLayout";
import ApiService from "../services/ApiService";

const FrequentAskedQuestions: NextPageWithLayout = () => {
  const [faq, setFaq] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("general");
  useEffect(() => {
    fetchFaq();
  }, []);

  const fetchFaq = async () => {
    // try {
    //   const url: string = `faq`;
    //   const response = await ApiService.getData({ url });
    //   setFaq(response);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const heroBody = (
    <>
      <h1 className="text-center text-5xl md:text-7xl capitalize font-extra light mt-11 pb-8	">
        Frequently asked <span className="font-semibold ">questions</span>
      </h1>
      <SearchBox />
    </>
  );

  const mainChildren = (
    <>
      <HeroSection children={heroBody} />
      <section className="leading-relaxed mt-8 mx-auto px-2 lg:px-8  flex flex-col md:flex-row justify-center content-center gap-3">
        <SideMenu
          onCategoryFilterChange={setCategoryFilter}
          categories={categories}
        />
        <BodyMenu categoryFilter={categoryFilter} faqsList={faq} />
      </section>
    </>
  );

  return <MainBody children={mainChildren} />;
};

FrequentAskedQuestions.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default FrequentAskedQuestions;
