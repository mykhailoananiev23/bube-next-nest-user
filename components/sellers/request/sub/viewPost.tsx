import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeartIcon, ListBulletIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect } from "react";
import { AccountInfoCard } from "../../../../modules/buyers/manage-service/accountInfoCard";
import { SellerSkillsCard } from "../../../../modules/sellers/SellerSkillsCard";
import ApiService from "../../../../services/ApiService";
import SkillsFrom from "../../../skills";
const moment = require("moment");

const ViewPost = ({ style, data }: any) => {
  const proposalCount = async () => {
    const url = `proposal/fetch?${data.id}`;
    const res = await ApiService.getData({ url });
  };

  return (
    <div className="w-full bg-white mb-[20px] rounded-[20px]">
      <div className="bg-white p-6 rounded-lg mb-6">
        <div className="justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-[#050931] text-xl font-medium">{data.title}</h1>
            <div className="flex items-center">
              <div className="rounded-full bg-[#EFEFEF] p-2 mr-4">
                <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="rounded-full bg-[#EFEFEF] p-2">
                <HeartIcon
                  className={"h-5 w-5 " + (true ? "text-red-600" : null)}
                  // onClick={handleFavour}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-between items-center max-sm:mb-3 mt-4">
            <h2 className="text-[#050931] text-2xl font-medium">
              {data.user.firstName} {data.user.lastName}
            </h2>
            <h4 className={"text-[#8B939A]"}>
              {moment(data.expectedDeliveryTime).format("MM / DD / YYYY")}
            </h4>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex text-[#8B939A]">
              <div className="pr-3">
                {`${`fixed price`}`}
              </div>
            </div>
            <div className="flex text-[#8B939A]">
              <div className="pr-3">
                {`Est.Budget $${data.price}`}
              </div>
            </div>
            <div className="flex text-[#8B939A]">
              <div className="ml-3">{` Job Type - ${`Full time`}`}</div>
            </div>
          </div>
          <hr className="my-5" />
          <p className="mb-5 overflow-hidden  leading-7 h-20 text-[#8B939A]">
            {data.description}
          </p>
          <div className="flex py-[2%]">
            <div>
              <p className="text-[#8B939A] text-sm">Expected Delivery Time</p>
              <p className="text-[#050931] font-medium text-[1.2rem]">
                {moment(data.expectedDeliveryTime).format("MM / DD / YYYY")}
              </p>
            </div>
            <div className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0s">
              {/* <Link
                href={{
                  pathname: "/sellers/job",
                  //   query: { id: data.id, stt: applyFlg },
                }}
              >
                <a className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0 pe-[20px]">
                  Message{" "}
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="fa-solid fa-arrow-right ml-2"
                  />
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/sellers/job",
                  //   query: { id: data.id, stt: applyFlg },
                }}
              >
                <a className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0">
                  Hire{" "}
                  <FontAwesomeIcon
                    icon={faMoneyCheckDollar}
                    className="fa-solid fa-arrow-right ml-2"
                  />
                </a>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-8">
        <div
          className={
            "bg-cyan-400 border-2 border-black border-e-0 p-[20px] col-span-6" +
            style.leftBorder
          }
        >
          <div className={style.container}>
            <p className="capitalize">{data.title}</p>
          </div>
          <div className={style.container}>
            <div className="normal-case">{data.description}</div>
          </div>
          <div className={style.container}>${data.price}</div>
          <div className={style.container}>attached file</div>
          <div className={style.container}>
            {data.jobType}
            project type
          </div>
          <div className={style.container}>
            <SellerSkillsCard skill={data.skills} />
            skills & expertise
          </div>
          <div className={style.container}>activity on this job</div>
          <div className={style.container}>bid range</div>
        </div>
        <div
          className={
            "bg-cyan-400 border-2 border-black col-span-2 p-[20px]" +
            style.rightBorder
          }
        >
          <div className={style.container}>Edit Request</div>
          <div className={style.container}>
            <AccountInfoCard data={data.user} />
          </div>
          <div className={style.container}>job link copy</div>
        </div>
      </div> */}
    </div>
  );
};

export default ViewPost;
