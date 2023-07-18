import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { GigListCard } from "../../modules/buyers/GigListCard";
import { addDays } from "../../utils/addDay";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import axios from "axios";

const GigListModal = ({ visible, onClose }: any) => {
  const handleOnBackDropClick = (e: any) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  const [isNext, setIsNext] = useState(true);
  const [ExpireDay, setExpireDay] = useState(new Date());
  const sendOffer = () => {
    setIsNext(true);
  };

  const router = useRouter()
  const roomId = router.query.inboxId
  const userId = Number(getCookie("NewUserId"))

  const createOfferApi = async () => {
    await axios.post("/api/offer/create", {
      roomId: roomId,
      currentId: userId,
      content: '',
    })
  }

  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {isNext ? (
        <div className="bg-white w-max-[801px] p-[30px] w-[801px] rounded-[10px]">
          <div className="flex flex-row justify-between mb-[41px]">
            <div>Select A Gig</div>
            <div id="backdrop" className="cursor-pointer" onClick={handleOnBackDropClick}>
              &#10060;
            </div>
          </div>
          <GigListCard onSelect={(e: any) => setIsNext(false)} />
          <GigListCard onSelect={(e: any) => setIsNext(false)} />
          <GigListCard onSelect={(e: any) => setIsNext(false)} />
          <GigListCard onSelect={(e: any) => setIsNext(false)} />
        </div>
      ) : (
        <div className="bg-white w-max-[801px] p-[30px] w-[801px] rounded-[10px]">
          <div className="flex flex-row items-center justify-between mb-[20px]">
            <div>Create A Single Payment Offer</div>
            <div id="backdrop" className="cursor-pointer" onClick={handleOnBackDropClick}>
              &#10060;
            </div>
          </div>
          <div className="flex w-full">
            <GigListCard onSelect={(e: any) => {}} />
          </div>
          <div className="flex w-full mb-[20px]">
            <textarea
              className="w-full p-[10px]"
              name="offerDescription"
              id="offer_des"
              onChange={() => {}}
              rows={8}
              placeholder="Describe Your Offer"
            />
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 pe-[10px]">
              <div className="flex w-full mb-[20px]">
                Price, ${" "}
                <span className="text-[#979696] text-[16px]">
                  (Set A Price For This Project)
                </span>
              </div>
              <div className="flex w-full mb-[20px]">
                <input
                  className="px-[30px] py-[10px] w-full rounded-full"
                  placeholder="Set Price"
                />
              </div>
            </div>
            <div className="w-1/2 ps-[10px]">
              <div className="flex w-full mb-[20px]">
                Time{" "}
                <span className="text-[#979696] text-[16px]">
                  (Set Timeframe For This Project)
                </span>
              </div>
              <div className="flex w-full mb-[20px]">
                {/* <input className="px-[30px] w-full py-[10px] rounded-full" /> */}
                <ReactDatePicker
                  className="px-[30px] w-full py-[10px] rounded-full"
                  selected={ExpireDay}
                  onChange={(date: any) => setExpireDay(date)}
                  maxDate={addDays(new Date(), 365 * 3)}
                  minDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  disabledKeyboardNavigation
                  dropdownMode="select"
                  placeholderText="This has disabled keyboard navigation"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full pe-[10px]">
              <div className="flex w-full mb-[20px]">
                Select Payment Method{" "}
                <span className="text-[#979696] text-[16px]">
                  (Choose Which Cryptocurrency You Will Prefer For Your Payment)
                </span>
              </div>
              <div className="flex w-full mb-[20px]">
                <select className="px-[30px] py-[10px] w-full rounded-full text">
                  <option value="" className="text-[#979696]">Please select payment method</option>
                  <option value="Cryptocurrency">Cryptocurrency</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row mb-[20px] space-x-5">
            <button
                id="backdrop"
              className="text-[23px] bg-[#0071BC] px-[30px] py-[8px] text-white rounded-full"
              onClick={(e:any) => {sendOffer(); handleOnBackDropClick(e); createOfferApi()}}
            >
              Send Offer
            </button>
            <button
              className="text-[23px] px-[30px] py-[8px] border-2 border-[#0071BC] rounded-full text-[#0071BC]"
              onClick={() => sendOffer()}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigListModal;
