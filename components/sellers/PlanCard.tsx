import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PlanCard = ({ data }: any) => {
  return (
    <div className="2xl:max-w-[260px] text-center space-y-[30px] 2xl:space-y-[60px] p-[10px] rounded-[20px] justify-between xl:flex-col items-center">
      <div
        className={
          "text-white text-[24px] font-[400] leading-[35px] tracking-[0.24px] capitalize text-center bg-gradient-to-l w-full rounded-[10px] " +
          data.gradient
        }
      >
        {data.type}
      </div>
      <div className=" flex flex-row justify-between 2xl:flex-col 2xl:space-y-[60px]">
        <div className="text-[#050931] text-[18px] font-[600] leading-[15px] tracking-[0.18px] capitalize">
          {data.time} TIME
        </div>
        <div className="text-[#050931] text-[18px] font-[600] leading-[15px] tracking-[0.18px] capitalize">
          {data.Commission}
        </div>
        <div className="text-[#050931] text-[18px] font-[600] leading-[15px] tracking-[0.18px] capitalize">
          {data.Referral}
        </div>
        <div className="text-[#050931] text-[18px] font-[600] leading-[15px] tracking-[0.18px] capitalize flex justify-center">
            {/* {!data.type ? "Feature your Gig" : ""} */}
             {/* {(data.type && data.type === "Gold" || data.type === "Platinum") ? <div className="border-2 border-[#0071BC] w-[30px] h-[30px] rounded-full bg-[#0071BC] flex items-center justify-center text-white"><FontAwesomeIcon icon={faCheck} /></div>: <div className="border-2 border-[#0071BC] border-[#0071BC] w-[30px] h-[30px] rounded-full"></div>}} */}
        </div>
        <div className="text-[#050931] text-[18px] font-[600] leading-[15px] tracking-[0.18px] capitalize">
            {data.Profile}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="capitalize rounded-full px-[30px] py-[12px] text-[18px] text-[#0071BC] font-[600] leading-[25px] tracking-[0.18px] border-[#0071BC] border-2">
          buy now 
        </button>
      </div>
    </div>
  )
};
