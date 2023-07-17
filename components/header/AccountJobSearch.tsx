import { useRouter } from "next/router";
import { useContext } from "react";
import { SearchWordContext, SearchWordProps } from "../../contexts/searchwordContext";

export const AccountJobSearch = () => {
    const {setSearchWord} = useContext(SearchWordContext)
    const router = useRouter();
    const searchHandler = (e:any) => {
        if(e.key === "Enter"){
            setSearchWord((prev:SearchWordProps) => {
                return{
                  ...prev,
                  content: e.target.value
                }
              });
            router.push({
                pathname: "/sellers/filterJobs",
            })
        }
    }
  return (
    <input
      type="text"
      id="simple-search"
      className="bg-[#F5F6FA] border border-[#F5F6FA] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block w-full pr-10 pl-4 p-2.5 cursor-pointer"
      placeholder="Search"
      onKeyDown={(e:any) => searchHandler(e)}
      required
    />
  );
};
