import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeartIcon, ListBulletIcon } from "@heroicons/react/20/solid";
import {
  faMessage,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import ApiService from "../../../services/ApiService";
import { pusherClient, pusherEvents } from "../../../utils/pusher";
import axios from "axios";
const moment = require("moment");

export const ProposalCard = ({ data, jobId }: any) => {
  const router = useRouter();

  const handlerMessage = async () => {
    const userId = Number(getCookie("NewUserId"));
    axios.post("/api/rooms/create", {
      userId,
      jobId: jobId,
      proId: data.user.id,
    })
    .then((res) => {
      const roomId = String(userId) + data.user.id + jobId
      try {
        router.push({
          pathname: `/inbox/${roomId}`,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="w-full m-0 p-0">
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
          <div className="flex text-[#8B939A]">
            <div className="border-r-2 pr-3">
              {`${`fixed price`} - ${`Expert`} - Est.Budget $${data.price}`}
            </div>
            <div className="ml-3">{` Job Type - ${`Full time`}`}</div>
          </div>
          <hr className="my-5" />
          <p className="mb-5 overflow-hidden  leading-7 h-20 text-[#8B939A]">
            {data.coverletter}
          </p>
          <div className="flex py-[2%]">
            <div>
              <p className="text-[#8B939A] text-sm">Expected Delivery Time</p>
              <p className="text-[#050931] font-medium text-[1.2rem]">
                {moment(data.expectedDeliveryTime).format("MM / DD / YYYY")}
              </p>
            </div>
            <div className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0s">
              <a
                className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0 pe-[20px]"
                onClick={handlerMessage}
              >
                Message{" "}
                <FontAwesomeIcon
                  icon={faMessage}
                  className="fa-solid fa-arrow-right ml-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
