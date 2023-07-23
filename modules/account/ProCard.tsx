import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import ApiService from "../../services/ApiService";
import { calcProfileMarks } from "../../utils/calcProfileMarks";
import calcReviewMarks from "../../utils/getReviewMark";

type ProCardProps = {
  userId: number;
  type: string;
  showMethod: number;
};

const pOne = require("../../public/images/p-1.png");

export const ProCard = (data: ProCardProps) => {
  const router = useRouter();
  const [UserId, setUserId] = useState<number>(data.userId);
  const [Type, setType] = useState<string>();
  const [ShowMethod, setShowMethod] = useState<number>();
  const [UserInfo, setUserInfo] = useState<any>();
  const [ProfileMarks, setProfileMarks] = useState<any>();
  const [ReviewList, setReviewList] = useState<any>([]);
  const [ReviewMark, setReviewMark] = useState<any>();

  const fetchReviewHistoryByUserId = async (id: number) => {
    const res = await ApiService.getData({
      url: `/reviews/findAll?proId=${id}`,
    });
    setReviewList(res);
  };

  useEffect(() => {
    fetchReviewHistoryByUserId(Number(router.query.id) || UserId);
  }, [router.query]);

  useEffect(() => {
    const mark = calcReviewMarks(ReviewList, "pro");
    setReviewMark(mark);
  }, [ReviewList]);

  const getUserInfo = async (id: number) => {
    const res = await ApiService.getData({
      url: `/user-profile/fetch?&userId=${id || UserId}`,
    });
    console.log(res.data[0])
    setProfileMarks(calcProfileMarks(res.data[0]));
    setUserInfo(res.data[0]);
  };

  useEffect(() => {
    setUserId(data.userId);
    setType(data.type);
    setShowMethod(data.showMethod);
    getUserInfo(data.userId);
  }, [data]);

  const gotoProfile = () => {
    router.push("/sellers/profile")
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        {/* Image */}
        <div className="w-[120px] h-[120px]">
          <Image src={pOne} className="rounded-full" />
        </div>
      </div>
      <div className="text-center mt-6 p-2">
        <h2 className="text-[#050931] text-2xl font-medium capitalize cursor-pointer" onClick={() => gotoProfile()}>
          {UserInfo?.user?.firstName + " " + UserInfo?.user?.lastName[0] + "."}
        </h2>
        <h3 className="text-[#8B939A] text-l font-medium cursor-default">
          {UserInfo?.profession}
        </h3>
      </div>
      <div className="flex flex-row justify-center bg-[#E4F4F1] mt-6 p-5 m-5 rounded-lg">
        {ReviewMark === "New User" ? null : (
          <ReactStars
            count={5}
            size={24}
            edit={false}
            half={true}
            color1={""}
            color2={"#ffd700"}
            value={ReviewMark}
          />
        )}
        <h2 className="text-darkText mt-1 mx-2 cursor-default">
          {ReviewMark} ({ReviewList.length} Reviews)
        </h2>
      </div>
      {ReviewMark === "New User" ? null : (
        <div className="flex text-center">
          <div className="block border-r-2 px-6 mr-2 w-full">
            <h2 className="text-[#050931] text-2xl font-medium">{`${
              ReviewMark * 20
            }%`}</h2>
            <h3 className={"text-[#8B939A]"}>Job Success</h3>
          </div>
          <div className="block border-r-2 px-6 w-full">
            <h2 className="text-[#050931] text-2xl font-medium">{`${ReviewList.length}`}</h2>
            <h3 className={"text-[#8B939A]"}>Total Jobs </h3>
          </div>
          <div className="block px-6 w-full">
            <h2 className="text-[#050931] text-2xl font-medium">{`${500}`}</h2>
            <h3 className={"text-[#8B939A]"}>Total Hours</h3>
          </div>
        </div>
      )}
      <div className="bg-[#E4F4F1] mt-6 p-5 m-5 rounded-lg">
        <h2 className={"text-[#050931] text-l font-medium cursor-pointer"} onClick={gotoProfile}>
          Profile Completeness:
        </h2>

        <div className="">
          <div className="flex relative items-center pt-1 ">
            <div className="overflow-hidden h-1  text-xs flex rounded bg-white w-full">
              <div
                style={{ width: `${ProfileMarks}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white  h-1 justify-center bg-[#55BC7E]"
              ></div>
            </div>
            <h3 className={"text-[#050931] text-l ml-2 font-medium"}>
              {ProfileMarks}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
