import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import GigListModal from "../../components/modal/GigListModal";
import GigsList from "../../pages/sellers/profile";
import pImg from "../../public/images/p-4.png";

const style = {
  grayText: " text-[#8B939A] leading-[25px] font-[500] ",
};

export const OrderReqMsg = ({onSubmit}:any) => {
  const handle = () => {
    onSubmit(true);
  }

  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="w-[64px] h-[64px] me-[20px]">
          <Image src={pImg} className="rounded-full" />
        </div>
        <div className="text-[#050931] text-[18px] leading-[15px] font-[600] me-[18px]">
          Amanda
        </div>
        <div className={style.grayText + "text-[13px]"}>10:35 am</div>
      </div>
      <div className="md:ps-[84px]">
        <div className="italic MB-[30]">Custom Order Request</div>
        <div className="py-[20px] px-[30px]">
          <div className="text-[#000] text-[18px] font-[600] leading-[35px] tracking-[0.36px]">
            Specifications
          </div>
          <GigListModal />
          <div className="pb-[12px]">
            <span className={style.grayText + "text-[16px]"}>Your Budget:</span>
            &nbsp;&nbsp;&nbsp;$ 1000
          </div>
          <div className="py-[12px]">
            <span className={style.grayText + "text-[16px]"}>Timeframe:</span>{" "}
            31 Aug, 2022
          </div>
          <div className="py-[12px]">
            <div>Criteria</div>
            <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] w-full break-all">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              aliquet quis lectus ac tincidunt. Quisque fringilla hendrerit
              euismod. Curabitur aliquam magna ut mauris consequat tincidunt.
              Mauris finibus tortor sed fringilla varius. Phasellus mattis ut
              lorem et vehicula. Vivamus porta,
            </div>
          </div>
          <div className="pt-[20px]">
            <button className="px-[35px] py-[10px] rounded-full bg-[#0071BC] text-[#fff] text-[16px] font-[500]" onClick={handle}>Create An Offer</button>
          </div>
        </div>
      </div>
    </div>
  );
};
