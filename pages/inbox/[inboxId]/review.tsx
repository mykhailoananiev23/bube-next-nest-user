import { ReactElement, useEffect, useState } from "react";
import { AccountLayout } from "../../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../../_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCartPlus,
  faCartShopping,
  faCheck,
  faFile,
  faHourglassHalf,
  faPencil,
  faQuestion,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faReact, faResolving } from "@fortawesome/free-brands-svg-icons";
import ReviewModal from "../../../components/modal/ReviewModal";
import ApiService from "../../../services/ApiService";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import axios from "axios";

const ReviewPage: NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"))
  const router = useRouter()
  const [RoomId, setRoomId] = useState<any>(router.query.inboxId)
  const [ReviewModalFlg, setReviewModalFlg] =useState(false)
  const [BtnStt, setBtnStt] = useState(0);
  const [RoomInfo, setRoomInfo] = useState<any>()
  const [Btn, setBtn] = useState<any>({
    title: "Submit your work",
    icon: null,
  });
  const [ReviewInfo, setReviewInfo] = useState<any>();

  useEffect(() => {
    setRoomId(router.query.inboxId)
  },[router.query])

  useEffect(()=> {
    getRoomInfo()
    getReviewInfo()
  },[RoomId])

  useEffect(() => {
    if(RoomInfo?.participant.id === userId || ReviewInfo?.proStt){
      setBtn({title:"Give a Review", icon:null})
      setBtnStt(2)
    }
  }, [RoomInfo, ReviewInfo])

  const getRoomInfo = async () => {
    const res = await ApiService.getData({url:`/rooms/findAll?roomId=${RoomId}`})
    setRoomInfo(res[0])
  }

  const getReviewInfo = async () => {
    const res = await ApiService.getData({url:`/reviews/findOne/${RoomId}`})
    setReviewInfo(res);
  }

  const handlerReviewModal = () => {
    setReviewModalFlg(true)
  };

  const handler = () => {
    userId === RoomInfo?.ownerId ? (ReviewInfo?.ownerStt === 1? console.log("false", "ownerStt"): console.log("true", "ownerStt")):(ReviewInfo?.proStt === 0? console.log("false", "proStt"): console.log("true", "proStt"))
    switch (BtnStt) {
      case 0:
        setBtnStt(1);
        setBtn({ title: "Done", icon: faCheck });
        break;
      case 1:
        axios.post("/api/offer/complete", {
          content: "",
          currentId: userId,
          roomId: String(RoomId)
        })
        setBtnStt(2);
        setBtn({ title: "Give A Review", icon: null });
        break;
      case 2:
        handlerReviewModal();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="2xl:grid 2xl:grid-cols-4 2xl:px-[90px] px-[20px] pt-[31px] pb-[92px]">
        <div className="w-full 2xl:col-span-3">
          <div className="space-y-3 bg-white rounded-[20px] lg:me-[20px] p-[20px]">
            <div className="mb-[11px] flex flex-row items-center">
              <div className="rounded-full w-[35px] h-[35px] bg-[#0071BC] flex justify-center items-center me-[20px]">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-[#fff]"
                />
              </div>
              <div className="">Your Order Details</div>
            </div>
            <div className="px-[30px] py-[20px]">
              <div className="pb-[12px]">
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Your Budget:
                </span>
                &nbsp;&nbsp;&nbsp;$ 1000
              </div>
              <div className="py-[12px]">
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Buyer:
                </span>{" "}
                <span className="text-[#0071BC] leading-[25px] font-[500] text-[16px]">
                  John Doe&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                  Date Order:&nbsp;&nbsp;
                </span>
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Oct12, 1:20pm
                </span>
              </div>
              <div className="text-[#8B939A] leading-[25px] font-[500] text-[16px]"></div>
              <div className="py-[12px]">
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Timeframe:
                </span>{" "}
                31 Aug, 2022
              </div>
              <div className="py-[12px]">
                <div>Criteria</div>
                <div className="text-[#8B939A] text-[15px] font-[500] leading-[25px] w-full break-all">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur aliquet quis lectus ac tincidunt. Quisque fringilla
                  hendrerit euismod. Curabitur aliquam magna ut mauris consequat
                  tincidunt. Mauris finibus tortor sed fringilla varius.
                  Phasellus mattis ut lorem et vehicula. Vivamus porta,
                </div>
              </div>
            </div>
            <div className="mb-[11px] flex flex-row items-center">
              <div className="rounded-full w-[35px] h-[35px] bg-[#0071BC] flex justify-center items-center me-[20px]">
                <FontAwesomeIcon icon={faFile} className="text-[#fff]" />
              </div>
              <div className="">
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Buyer:
                </span>{" "}
                <span className="text-[#0071BC] leading-[25px] font-[500] text-[16px]">
                  John Doe&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                  Date Order:&nbsp;&nbsp;
                </span>
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Oct12, 1:20pm
                </span>
              </div>
            </div>
            <div className="mb-[11px] flex flex-row items-center">
              <div className="rounded-full w-[35px] h-[35px] bg-[#0071BC] flex justify-center items-center me-[20px]">
                <FontAwesomeIcon icon={faCartPlus} className="text-[#fff]" />
              </div>
              <div className="">
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Buyer:
                </span>{" "}
                <span className="text-[#0071BC] leading-[25px] font-[500] text-[16px]">
                  John Doe&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                  Date Order:&nbsp;&nbsp;
                </span>
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Oct12, 1:20pm
                </span>
              </div>
            </div>
            <div className="mb-[11px] flex flex-row items-center">
              <div className="rounded-full w-[35px] h-[35px] border-2 border-[#0071BC] flex justify-center items-center me-[20px]">
                <FontAwesomeIcon icon={faPencil} className="text-[#0071BC]" />
              </div>
              <div className="">
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Buyer:
                </span>{" "}
                <span className="text-[#0071BC] leading-[25px] font-[500] text-[16px]">
                  John Doe&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                  Date Order:&nbsp;&nbsp;
                </span>
                <span
                  className={
                    "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                  }
                >
                  Oct12, 1:20pm
                </span>
              </div>
            </div>
            {BtnStt >= 0 && RoomInfo?.participant?.id !== userId && (
              <div>
                <div className="mb-[11px] flex flex-row items-center">
                  <div className="rounded-full w-[35px] h-[35px] border-2 bg-[#E8E8E8] flex justify-center items-center me-[20px]">
                    <FontAwesomeIcon
                      icon={faHourglassHalf}
                      className="text-[#8B939A]"
                    />
                  </div>
                  <div>
                    <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                      Date Order:&nbsp;&nbsp;
                    </span>
                    <span
                      className={
                        "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                      }
                    >
                      Oct12, 1:20pm
                    </span>
                  </div>
                </div>
                {BtnStt > 0 && RoomInfo?.participant?.id !== userId && (
                  <>
                    <div className="mb-[11px] flex flex-row items-center ms-[75px] bg-[#E8E8E8] px-[30px] py-[10px]">
                      Delivery #1
                    </div>
                    <div className="mb-[11px] flex flex-row items-center ms-[75px] py-[30px]">
                      <div className="rounded-full w-[35px] h-[35px] border-2 bg-[#E8E8E8] flex justify-center items-center me-[20px]"></div>
                      <div>
                        <div className="text-[#000] leading-[25px] font-[500] text-[16px]">
                          Me&nbsp;&nbsp;
                        </div>
                        <div className="text-[#8B939A] leading-[25px] font-[500] text-[16px]">
                          I have deliver my mockup according to discussion
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {BtnStt > 0 && RoomInfo?.participant?.id !== userId && (
              <div className="mb-[11px] flex flex-row items-center">
                <div className="rounded-full w-[35px] h-[35px] border-2 bg-[#E8E8E8] flex justify-center items-center me-[20px]">
                  <FontAwesomeIcon icon={faFile} className="text-[#8B939A]" />
                </div>
                <div>
                  <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                    The Order Was Completed&nbsp;&nbsp;
                  </span>
                  <span
                    className={
                      "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                    }
                  >
                    Oct12, 1:20pm
                  </span>
                </div>
              </div>
            )}
            {BtnStt > 1 && RoomInfo?.participant?.id !== userId && (
              <div className="mb-[11px] flex flex-row items-center">
                <div className="rounded-full w-[35px] h-[35px] border-2 bg-[#E8E8E8] flex justify-center items-center me-[20px]">
                  <FontAwesomeIcon icon={faStar} className="text-[#8B939A]" />
                </div>
                <div>
                  <span className="text-[#000] leading-[25px] font-[500] text-[16px]">
                    Share Your Feedback&nbsp;&nbsp;
                  </span>
                  <span
                    className={
                      "text-[#8B939A] leading-[25px] font-[500] text-[16px]"
                    }
                  >
                    Oct12, 1:20pm
                  </span>
                </div>
              </div>
            )}
            <div>
              {BtnStt !== 3 || RoomInfo?.participant.id === userId ? (
                <button
                  className={`px-[50px] py-[19px] bg-[#0071BC] text-[#FFFFFF] rounded-full text-[20px] font-[600px] leading-[25px] tracking-[0.2px] disabled:opacity-50`}
                  onClick={handler}
                  disabled={ userId === RoomInfo?.ownerId ? (ReviewInfo?.ownerStt === 1? true: false):(ReviewInfo?.proStt === 1? true: false) }
                >
                  {Btn.title}
                  {Btn.icon && <FontAwesomeIcon icon={Btn.icon} />}
                </button>
              ):null}
              {BtnStt === 3 && RoomInfo?.ownerId === userId && (
                <div className="mb-[11px] flex flex-row items-center">
                  <div className="rounded-full w-[35px] h-[35px] border-2 bg-[#E8E8E8] flex justify-center items-center me-[20px]">
                  </div>
                  <div>
                    Your order is complete, If you need a contact the buyer, Go to Inbox
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-20px p-[20px] bg-white rounded-[20px] mb-[20px] space-y-3">
            <div className="flex flex-row items-center">
              <div className="w-[114px] h-[114px] bg-cyan-300 rounded-[20px] me-[18px]">
                {/* <Image src={} className="rounded-[20px]" /> */}
              </div>
              <div>
                <div className="text-[16px] font-[600] leading-[35px]">
                  UI Website Pages Design
                </div>
                <div className="bg-[#1DBF73] rounded-[2px] text-white text-center text-[12px] w-fit px-[10px]">
                  In Progress
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="text-[16px] text-[#8B939A] font-[500] leading-[25px] tracking-[0.16px]">
                  Order By
                </div>
                <div className="text-[16px] text-[#050931] font-[500] leading-[25px] tracking-[0.16px]">
                  John Doe
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[16px] text-[#8B939A] font-[500] leading-[25px] tracking-[0.16px]">
                  Delivery Date
                </div>
                <div className="text-[16px] text-[#050931] font-[500] leading-[25px] tracking-[0.16px]">
                  31 aug
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[16px] text-[#8B939A] font-[500] leading-[25px] tracking-[0.16px]">
                  Total Price
                </div>
                <div className="text-[16px] text-[#050931] font-[500] leading-[25px] tracking-[0.16px]">
                  $500
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[16px] text-[#8B939A] font-[500] leading-[25px] tracking-[0.16px]">
                  order number
                </div>
                <div className="text-[16px] text-[#050931] font-[500] leading-[25px] tracking-[0.16px]">
                  #B132547895
                </div>
              </div>
            </div>
          </div>
          <div className="p-[20px] space-y-3 bg-white rounded-[20px]">
            <div>Support</div>
            <div className="flex flex-row">
              <div className="me-[17px] bg-black rounded-full w-[19px] h-[19px] flex items-center justify-center mt-[5px]">
                <FontAwesomeIcon icon={faQuestion} className="text-white" />
              </div>
              <div className="flex flex-auto justify-between items-center space-x-[87px]">
                <div>
                  <div>FAQs</div>
                  <div>Find Needed Answers</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="text-[#8B939A]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="me-[17px] bg-black rounded-full w-[19px] h-[19px] flex items-center justify-center mt-[5px]">
                <FontAwesomeIcon icon={faReact} className="text-white" />
              </div>
              <div className="flex flex-auto justify-between items-center space-x-[87px]">
                <div>
                  <div>Resolutions Center</div>
                  <div>Find Needed Answers</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="text-[#8B939A]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal onClose={() => setReviewModalFlg(false)} onSubmit={() => setBtnStt(3)} visible={ReviewModalFlg} />
    </>
  );
};
ReviewPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default ReviewPage;
