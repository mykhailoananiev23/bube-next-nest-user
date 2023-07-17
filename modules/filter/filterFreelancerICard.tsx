import { useState } from "react";
const style = {
  title: " text-[30px] font-[500] leading-[30px] ",
  subTitle: " text-[20px] font-[500] leading-[25px] pb-[15px] ",
  subFilterGuard: " pt-[35px] ",
  hoverBtn: " hover:text-[#aa73BC ",
  input: " w-full h-[58px] bg-[#F6F6F9] rounded-full px-[30px] ",
};

export const FilterFreelancerICard = ({ className }: any) => {
  const [Categories, setCategories] = useState<any>([]);
  const [SelCategory, setSelCategory] = useState<any>();
  const [SubCategories, setSubCategories] = useState<any>([]);
  const [SelSkills, setSelSkills] = useState();
  const [SelPriceRange, setSelPriceRange] = useState();
  const [Skills, setSkills] = useState<any>([]);
  const [PriceRange, setPriceRange] = useState<any>([]);
  const [Sort, setSort] = useState<any>([]);
  const [SelSort, setSelSort] = useState();
  //   const []

  const fetchCategory = () => {};

  return (
    <div className={className + " rounded-[10px] p-[40px]"}>
      <div className="flex justify-between ">
        <div className={style.title}>Filter By</div>
        <button className="text-[#0071BC] text-[16px] leading-[30px] font-[500] hover:text-[#bd80d1]">
          Clear All
        </button>
      </div>
      <div className={style.subFilterGuard}>
        <div className={style.subTitle + ""}>Categories</div>
        <select
          className={style.input + ""}
          onChange={(e: any) => setSelCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {SubCategories.map((ele: any, idx: number) => {
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
          onChange={(e: any) => setSelSkills(e.target.value)}
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
