import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Loading } from "../components/loading/loading";
import profilSeller from "../public/images/profileSeller.svg";
import ApiService from "../services/ApiService";
import { calcProfileMarks } from "../utils/calcProfileMarks";
import calcReviewMarks from "../utils/getReviewMark";

export const UserInfoCard = ({ data }: any) => {
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
    fetchReviewHistoryByUserId(data?.user.id);
  }, [data]);

  useEffect(() => {
    const mark = calcReviewMarks(ReviewList, "pro")
    setReviewMark(mark)
  }, [ReviewList]);
  // End

  // Get Profile Info
  const [UserProfileInfo, setUserProfileInfo] = useState<any>();
  const [IsLoading, setIsLoading] = useState(true);

  const getUserInfo = async (id: number) => {
    setIsLoading(true)
    const res = await ApiService.getData({
      url: `/user-profile/fetch?&userId=${id}`,
    });
    console.log(res)
    setUserProfileInfo(res?.data[0])
    setIsLoading(false)
  };

  useEffect(() => {
    getUserInfo(data?.user.id)
  }, [data]);

  if(IsLoading){
    return <Loading title="Please a wait" />
  }

  // End

  // Get Job Posts List
  const getPostsList = async () => {
    const res = await ApiService.getData({url: "/"})
  }
  // End

  return (
    <>
      <div className="pt-8 w-full flex justify-center">
        <Image
          src={profilSeller}
          alt="Profile Seller"
          className="rounded-full "
        />
      </div>
      <div className="text-center mt-6 p-2">
        <h2 className="text-[#050931] text-2xl font-medium">{data?.user.firstName + " " + data?.user.lastName[0] + "."}</h2>
      </div>
      <div className="flex justify-center items-center">
        {
          ReviewMark === "New User" ? null : (
            <ReactStars
              count={5}
              size={24}
              edit={false}
              half={true}
              color2={"#ffd700"}
              value={ReviewMark}
            />
          )
        }
        <h2 className="text-darkText mt-1 mx-2">{ReviewMark} ({ReviewList.length} Reviews)</h2>
      </div>
      <div className="flex justify-center items-center my-4 text-xl">
        <CheckCircleIcon
          className="h-5 w-5 text-[#01A101]"
          aria-hidden="true"
        />
        <h3 className="">Payment Method Verified</h3>
      </div>
      <div className="flex text-center">
        <div className="block border-r-2 px-6 mr-2 w-full">
          {/* <h2 className="text-[#050931] text-l font-medium">{`${data.jobsPosted}`}</h2> */}
          <h3 className={"text-[#8B939A]"}>Job Posted</h3>
        </div>
        <div className="block border-r-2 px-6 w-full">
          {/* <h2 className="text-[#050931] text-l font-medium">{`$ ${data.totalSpent}`}</h2> */}
          <h3 className={"text-[#8B939A]"}>Total Spent</h3>
        </div>
        <div className="block px-6 w-full">
          <h3 className={"text-[#8B939A]"}>Location</h3>
          <h2 className="text-[#050931] text-l font-medium">{`${UserProfileInfo?.country}`}</h2>
        </div>
      </div>
    </>
  );
};
