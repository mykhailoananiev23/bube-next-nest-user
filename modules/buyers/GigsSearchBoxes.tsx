import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SearchWordContext, SearchWordProps } from "../../contexts/searchwordContext";

export const GigsSearchBoxes = () => {
  const {setSearchWord} = useContext(SearchWordContext)
  const router = useRouter()
  const handlerGigSearch = (e:any) => {
    if(e.code === "Enter"){
      setSearchWord((prev:SearchWordProps) => {
        return {
          ...prev,
          content: e.target.value
        }
      })
      router.push("/buyers/filter-gigs")
    }
  }

  return (
    <section className="flex justify-center p-8 pb-4 bg-white">
      <div className="w-full max-w-[96rem] flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <label className="font-semibold">Search</label>
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
              className="bg-[#F5F6FA] border border-[#F5F6FA] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block w-full pr-10 p-3.5"
              placeholder="Search By Skills, Services..."
              onKeyDown={handlerGigSearch}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="font-semibold">Sort</label>
          <select className="bg-[#F5F6FA] border border-[#F5F6FA] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block py-3.5 px-4 w-full appearance-none" name="rate" id="gig_search_rate">
            <option value="">Rating</option>
          </select>
        </div>
      </div>
    </section>
  );
};
