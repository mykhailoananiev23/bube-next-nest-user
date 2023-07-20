import Link from "next/link";
import { ListBulletIcon, HeartIcon } from "@heroicons/react/20/solid";
import { TimeAgo } from "../timeago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import ApiService from "../../services/ApiService";

export const ActiveJobCard = ({ item, favorJobs, refetch, status }: any) => {
  const [selFavour, setSelFavour] = useState(false);
  const [favorId, setFavorId] = useState(-1);
  const [applyFlg, setApplyFlg] = useState(true);
  const userId: any = getCookie("userID");

  const handleFavour = async () => {
    var url, res, dt;
    if (selFavour) {
      url = `/favourites/${favorId}`;
      res = await ApiService.deleteData({ url });
    } else {
      url = `/favourites/create`;
      dt = {
        type: "job",
        user: parseInt(userId),
        targetId: item.id,
      };
      res = await ApiService.postData({ url, data: dt });
    }
    setSelFavour(!selFavour);
    refetch()
  };
  return (
    <div className="bg-white p-6 rounded-lg mb-6">
      <div className="justify-between">
        <div className="flex justify-between items-center">
          <h1 className="text-[#050931] text-xl font-medium">
            {item?.category?.name}
          </h1>
          <div className="flex items-center">
            <div className="rounded-full bg-[#EFEFEF] p-2 mr-4">
              <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="rounded-full bg-[#EFEFEF] p-2">
              <HeartIcon
                className={"h-5 w-5 " + (item.favor ? "text-red-600" : null)}
                onClick={handleFavour}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-between items-center max-sm:mb-3 mt-4">
          <h2 className="text-[#050931] text-2xl font-medium">{item.title}</h2>
          <h4 className={"text-[#8B939A]"}>
            <TimeAgo datetime={item.createdAt} />
          </h4>
        </div>
        <div className="flex text-[#8B939A]">
          <div className="border-r-2 pr-3">
            {`${`fixed price`} - ${`Expert`} - Est.Budget $${item.price}`}
          </div>
          <div className="ml-3">{` Job Type - ${`Full time`}`}</div>
        </div>
        <hr className="my-5" />
        <p className="mb-5 overflow-hidden  leading-7 h-20 text-[#8B939A]">
          {item.description}
        </p>
        <div className="flex py-[2%]">
          <div>
            <p className="text-[#8B939A] text-sm">Highest Bid</p>
            <p className="text-[#050931] font-medium text-[1.2rem]">
              {item.price}
            </p>
          </div>
          <Link
            href={{
              pathname: "/sellers/job",
              query: { id: item.id, stt: applyFlg },
            }}
          >
            <a className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0">
              Apply Now{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="fa-solid fa-arrow-right ml-2"
              />
            </a>
          </Link>
        </div>
        {
          !applyFlg ? (
            <h4 className="text-[#ff3535] text-sm">You already applied!</h4>
          ):null
        }
      </div>
    </div>
  );
};
