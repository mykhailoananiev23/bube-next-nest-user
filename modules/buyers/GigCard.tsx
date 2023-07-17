import {
  ArrowRightIcon,
  Bars3Icon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GigCardProps } from "../../interface";
import ApiService from "../../services/ApiService";
import calcReviewMarks, { testCalcReviewMarks } from "../../utils/getReviewMark";

export const GigCard = ({
  title,
  img,
  authorLogo,
  authorName,
  href,
  price,
  level,
  rating,
  orders,
  data,
  favor,
  fetchFavor
}: any) => {
  const [selFlg, setSelFlg] = useState(false);
  const [favorId, setFavorId] = useState(-1);

  // Get Review Marks
  const [ReviewList, setReviewList] = useState<any>([]);
  const [ReviewMark, setReviewMark] = useState<any>();

  const fetchReviewHistoryByUserId = async (id: number) => {
    const res = await ApiService.getData({
      url: `/reviews/findAll?proId=${id}`,
    });
    setReviewList(res);
  };

  useEffect(() => {
    fetchReviewHistoryByUserId(data.user.id);
  }, [data]);

  useEffect(() => {
    const mark = calcReviewMarks(ReviewList, "pro")
    setReviewMark(mark)
  }, [ReviewList]);
  // End
  
  useEffect(() => {
    const FavorGigsIds = favor.map((ele: any) => {
      return ele.targetId;
    });
    favor.map((ele: any) => {
      if (ele.targetId === data.id) {
        setFavorId(ele.id);
      }
    });
    const flg = FavorGigsIds.includes(data.id);
    setSelFlg(flg);
  });

  const handleChangeFavor = async () => {
    var url, dt: any, res;
    const userId: any = getCookie("userID");
    const dataId = data.id;
    if (selFlg) {
      url = `/favourites/${favorId}`;
      dt = dataId;
      res = await ApiService.deleteData({ url });
    } else {
      url = `/favourites/create`;
      dt = {
        type: "gig",
        user: parseInt(userId),
        targetId: dataId,
      };

      res = await ApiService.postData({ url, data: dt });
    }
    setSelFlg(!selFlg);
    fetchFavor();
  };

  return (
    <article className="bg-white rounded-xl border-neutral-300 border-[1px] hover:shadow-md w-full max-w-[20rem] overflow-hidden flex flex-col md:max-w-sm h-fit">
      <picture className="w-full h-max">
        <img src={img} alt="" className="w-full" />
      </picture>
      <div className="flex flex-col gap-2 p-4 w-full h-full justify-between">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <picture>
              <img
                src={authorLogo}
                loading="lazy"
                alt=""
                className="rounded-full w-11"
              />
            </picture>
            <div className="flex flex-col capitalize">
              <h4 className="font-bold text-lg">{authorName}</h4>
              <p className="text-sm text-neutral-600">Level {level} seller</p>
            </div>
          </div>
          <div className="flex gap-2 text-neutral-600">
            <Bars3Icon className="cursor-pointer hover:text-black" width={16} />
            <HeartIcon
              className={"cursor-pointer " + (selFlg ? "text-red-600" : null)}
              onClick={handleChangeFavor}
              width={16}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg text-neutral-800">{title}</h3>
          <div className="flex gap-2 items-center">
            <span className="text-blue-500 font-bold flex gap-1 items-center">
              <StarIcon width={20}  />
              <span>{ReviewMark}</span>
            </span>
            <span className="text-neutral-400 font-semibold text-sm">
              ({orders})
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-neutral-500 text-xs">Starting at</p>
            <h4 className="text-neutral-800 text-xl font-bold">${price}</h4>
          </div>
          <div>
            <Link
              href={{ pathname: "/buyers/gig-preview", query: { id: href } }}
            >
              <div className="flex gap-1 text-blue-600 font-bold hover:underline hover:text-black cursor-pointer">
                <span className="text-sm">View Details</span>
                <ArrowRightIcon width={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
