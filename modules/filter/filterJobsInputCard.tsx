import { useContext, useEffect, useState } from "react";
import {
  InitSearchWordContext,
  SearchWordContext,
  SearchWordProps,
} from "../../contexts/searchwordContext";
import ApiService from "../../services/ApiService";
const style = {
  title: " text-[30px] font-[500] leading-[30px] ",
  subTitle: " text-[20px] font-[500] leading-[25px] pb-[15px] ",
  subFilterGuard: " pt-[35px] ",
  hoverBtn: " hover:text-[#aa73BC ",
  input: " w-full h-[58px] bg-[#F6F6F9] rounded-full px-[30px] ",
};

const priceRange = [
  {
    title: "$0 - $100",
    min: 5,
    max: 100,
  },
  {
    title: "$100 - $500",
    min: 100,
    max: 500,
  },
  {
    title: "$500 - $1000",
    min: 500,
    max: 1000,
  },
  {
    title: "$1000 - $10000",
    min: 1000,
    max: 10000,
  },
];

const defaultSort = [
  {
    title: "test",
    value: "rate",
  },
];

export const FilterJobsInputCard = ({ className }: any) => {
  const { searchWord, setSearchWord } = useContext(SearchWordContext);

  const [Category, setCategory] = useState<any>([]);
  const [SelCategory, setSelCategory] = useState<any>();
  const [Skills, setSkills] = useState<any>([]);
  const [SelSkills, setSelSkills] = useState<any>();
  const [PriceRange, setPriceRange] = useState<any>(priceRange);
  const [SelPriceRange, setSelPriceRange] = useState<any>();
  const [Sort, setSort] = useState<any>(defaultSort);
  const [SelSort, setSelSort] = useState<any>();
  const [FilterFetchJobs, setFilterFetchJobs] = useState<any>();

  async function fetchSkill() {
    const response = await ApiService.getData({ url: `skills/fetch` });
    setSkills(response);
  }

  async function fetchCategory() {
    const response = await ApiService.getData({ url: "categories/fetch" });
    setCategory(response.data);
  }

  async function fetchPriceRange() {
    const response = await ApiService.getData({ url: "categories/fetch" });
    setCategory(response.data);
  }

  async function fetchSort() {
    const response = await ApiService.getData({ url: "categories/fetch" });
    setCategory(response.data);
  }

  useEffect(() => {
    fetchSkill();
    fetchCategory();
    fetchPriceRange();
    fetchSort();
  }, []);

  const fetchJobs = (s1: any, s2: any, s3: any, s4: any) => {
    setSearchWord((prev: SearchWordProps) => {
      return {
        ...prev,
        category: s1 ? Number(s1) : null,
        skills: s2 ? Number(s2) : null,
        prMin: s3 ? Number(PriceRange[s3].min) : null,
        prMax: s3 ? Number(PriceRange[s3].max) : null,
        sort: s4 || null,
      };
    });
  };

  useEffect(() => {
    fetchJobs(SelCategory, SelSkills, SelPriceRange, SelSort);
  }, [SelCategory, SelSkills, SelPriceRange, SelSort]);

  const clearSearchWordContext = () => {
    setSearchWord(InitSearchWordContext.searchWord)
  } 

  return (
    <div className={className + " rounded-[10px] p-[40px] bg-white"}>
      <div className="flex justify-between ">
        <div className={style.title}>Filter By</div>
        <button className="text-[#0071BC] text-[16px] leading-[30px] font-[500] hover:text-[#bd80d1]" onClick={clearSearchWordContext}>
          Clear All
        </button>
      </div>
      <div className={style.subFilterGuard}>
        <div className={style.subTitle + ""}>CateGory</div>
        <select
          className={style.input + ""}
          onChange={(e: any) => setSelCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {Category.map((ele: any, idx: number) => {
            return (
              <option value={ele.id} key={idx}>
                {ele.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={style.subFilterGuard}>
        <div className={style.subTitle + ""}>Skills</div>
        <select
          className={style.input + ""}
          onChange={(e: any) =>
            setSelSkills(e.target.value)
          }
        >
          <option value="">Select a Skill</option>
          {Skills.map((ele: any, idx: number) => {
            return (
              <option value={ele.id} key={idx}>
                {ele.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={style.subFilterGuard}>
        <div className={style.subTitle + ""}>Price Range</div>
        <select
          className={style.input + ""}
          onChange={(e: any) => setSelPriceRange(e.target.value)}
        >
          <option value="">Select a PriceRange</option>
          {PriceRange.map((ele: any, idx: number) => {
            return (
              <option value={idx} key={idx}>
                {ele.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className={style.subFilterGuard}>
        <div className={style.subTitle + ""}>Sort</div>
        <select
          className={style.input + ""}
          onChange={(e: any) => setSelSort(e.target.value)}
        >
          <option value="">Select a Sort</option>
          {Sort.map((ele: any, idx: number) => {
            return (
              <option value={ele.value} key={idx}>
                {ele.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
