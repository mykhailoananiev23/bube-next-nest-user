import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pImg from "../../public/images/p-5.png";
import ApiService from "../../services/ApiService";

export const ViewOfferMsg = ({ owner, viewOfferFlg }: any) => {
  const userId = Number(getCookie("NewUserId"));
  const router = useRouter();
  const [RoomId, setRoomId] = useState<any>();
  const [flg, setFlg] = useState<any>(false);
  useEffect(() => {
    setRoomId(router.query.inboxId);
  }, [router.query]);

  useEffect(() => {
    const flg = viewOfferFlg?.job?.status === "3" ? true : false;
    setFlg(flg);
  }, [viewOfferFlg, owner]);

  const gotoReviewPage = () => {
    flg && router.push(`/inbox/${RoomId}/review`);
  };

  const acceptedOffer = async () => {
    viewOfferFlg?.job?.status === "2" &&
      axios.post("/api/offer/accept", {
        content: router.asPath,
        currentId: userId,
        roomId: RoomId,
      });
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="w-[64px] h-[64px] me-[20px]">
          <Image src={pImg} className="rounded-full" />
        </div>
        <div className="text-[#050931] text-[18px] leading-[15px] font-[600] me-[18px]">
          Adrian D
        </div>
        <div className={"text-[#8B939A] text-[13px]"}>10:35 am</div>
      </div>
      <div className="ps-[0px] md:ps-[84px]">
        <div className="italic MB-[30]">here's your Custom Offer</div>
        <div className="py-[20px] px-[30px]">
          <div className="text-[#000] text-[18px] font-[600] leading-[35px] tracking-[0.36px]">
            UI Website Pages Design
          </div>
          <div className="pb-[12px]">
            <span className={"text-[#8B939A] text-[16px]"}>Your Budget:</span>
            &nbsp;&nbsp;&nbsp;$ 500
          </div>
          <div className="py-[12px]">
            <span className={"text-[#8B939A] text-[16px]"}>Timeframe:</span> 30
            Aug, 2022
          </div>
          <div className="py-[12px]">
            <div>Criteria</div>
            <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] w-full break-all">
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                aliquet quis lectus ac tincidunt. Quisque fringilla hendrerit
                euismod. Curabitur aliquam magna ut mauris consequat tincidunt.
                Mauris finibus tortor sed fringilla varius. Phasellus mattis ut
                lorem et vehicula. Vivamus porta,`}
            </div>
          </div>
          <div className="pt-[20px] space-x-5">
            {owner ? (
              <button
                className="px-[35px] py-[9px] rounded-full border-2 border-[#0071BC] text-[#0071BC] text-[16px] font-[500] disabled:border-gray-500 disabled:text-gray-500"
                disabled={!flg ? true : false}
                onClick={gotoReviewPage}
              >
                View Offer
              </button>
            ) : (
              <button
                className="px-[35px] py-[10px] rounded-full bg-[#0071BC] text-[#fff] text-[16px] font-[500] disabled:opacity-70"
                disabled={viewOfferFlg?.job?.status === "2"? false: true}
                onClick={acceptedOffer}
              >
                Offer Accepted
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
