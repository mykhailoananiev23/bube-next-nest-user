import { useState } from "react";

import { Fragment } from "react";
import { Button, Radio } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SuccessImg from "../../public/images/successImg.svg";

export const PaymentModal: any = ({ onClose }: any) => {
  const [ModalStt, setModalStt] = useState(0);
  const test = () => {};

  const onSubmit = () => {
    setModalStt(2);
  };

  const SelPaymentMethod = () => {
    return (
      <div className="bg-white w-[700px] rounded-[20px] px-[28px] py-[30px]">
        <div className="flex flex-row justify-between">
          <div className="text-[#050931] text-[25px] font-[200] leading-[35px] tracking-[0.5px]">
            Add a billing method
          </div>
          <div className="flex items-center" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <Fragment>
          <div>
            <div>
              <Radio
                id="react"
                name="type"
                label="Bank Account"
                nonce
                onResize={test}
                onResizeCapture
              />
              <div className="ps-[54px]">
                <div className="break-word mb-[20px]">
                  Using bank account for payments and opting into the $25 flat
                  monthly fee, you can avoid 3% fee per payment.
                </div>
                <div className="flex flex-row space-x-3 mb-[50px]">
                  <Button
                    variant="filled"
                    nonce
                    onResize={test}
                    onResizeCapture
                    onClick={() => setModalStt(1)}
                    className="bg-[#0071BC] rounded-full px-[30px] py-[15px] text-[20px] text-white font-[600] leading-[25px] tracking-[0.25px] capitalize"
                  >
                    Link Account
                  </Button>
                  <Button
                    variant="outlined"
                    nonce
                    onResize={test}
                    onResizeCapture
                    className="border-2 border-[#0071BC] rounded-full px-[30px] py-[9px] text-[#0071BC] text-[20px] leading-[25px] tracking-[0.25px] capitalize"
                  >
                    Enter Manually
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Radio
                id="html"
                name="type"
                label="Credit or Debit Card"
                nonce
                onResize={test}
                onResizeCapture
              />
            </div>
            <div>
              <Radio
                id="react"
                name="type"
                label="PayPal"
                nonce
                onResize={test}
                onResizeCapture
              />
            </div>
            <div>
              <Radio
                id="react"
                name="type"
                label="Cryptocurrency"
                nonce
                onResize={test}
                onResizeCapture
              />
            </div>
          </div>
        </Fragment>
      </div>
    );
  };

  const SetBankAccountModal = () => {
    return (
      <div className="bg-white w-[700px] rounded-[20px] px-[28px] py-[30px]">
        <div className="flex flex-row justify-between">
          <div className="text-[#050931] text-[25px] font-[200] leading-[35px] tracking-[0.5px]">
            Add a billing method
          </div>
          <div className="flex items-center" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className="space-y-[15px] mt-[20px]">
          <div className="text-[18px] text-black font-[500] leading-[35px] capitalize mb-[15px]">
            Bank Account
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 space-y-[15px]">
              <div className="text-[18px] font-[600] leading-[25px] tracking-[0.18px] capitalize">
                Account Holder
              </div>
              <input
                className="px-[30px] py-[15px] rounded-full"
                placeholder="Enter Account Holder"
              />
            </div>
            <div className="w-1/2 space-y-[15px]">
              <div className="text-[18px] font-[600] leading-[25px] tracking-[0.18px] capitalize">
                Account Type
              </div>
              <input
                className="px-[30px] py-[15px] rounded-full"
                placeholder="Select Account Type"
              ></input>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 space-y-[15px]">
              <div className="text-[18px] font-[600] leading-[25px] tracking-[0.18px] capitalize">
                Routing Number
              </div>
              <input
                className="px-[30px] py-[15px] rounded-full"
                placeholder="Enter Routing Number"
              />
            </div>
            <div className="w-1/2 space-y-[15px]">
              <div className="text-[18px] font-[600] leading-[25px] tracking-[0.18px] capitalize">
                Account Number
              </div>
              <input
                className="px-[30px] py-[15px] rounded-full"
                placeholder="Select Account Number"
              ></input>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-[10px] text-[#8B939A]">
            <FontAwesomeIcon icon={faLock} />
            <div>Your payment information is stored securely</div>
          </div>
          <div className="flex flex-row space-x-3">
            <Button
              nonce
              onResize={test}
              onResizeCapture
              onClick={onSubmit}
              className="rounded-full capitalize bg-[#0071BC] px-[30px] py-[15px] text-white text-[20px] leading-[25px] font-[600] tracking-[0.2px]"
            >
              Save
            </Button>
            <Button
              nonce
              variant="text"
              onResize={test}
              onResizeCapture
              onClick={() => setModalStt(0)}
              className="text-[20px] leading-[25px] font-[600] tracking-[0.2px] capitalize"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const SuccessModal = () => {
    return (
      <div className="flex flex-col items-center bg-white rounded-[20px] w-[497px] py-[40px]">
        <div className="mb-[28px]">
          <Image src={SuccessImg} alt="successImg" />
        </div>
        <div className="capitalize text-[25px] text-[#050931] font-[500] leading-[35px] tracking-[0.5px]">
          Added Successfull
        </div>
        <div className="text-[#8B939A] text-[16px] font-[400] leading-[30px] tracking-[0.16px] mb-[25px]">
          Payment method added successfully
        </div>
        <div>
          <Button
            nonce
            onResize={test}
            onResizeCapture
            className="capitalize bg-[#0071BC] rounded-full px-[30px] py-[15px] text-[20px] text-white font-semibold leading-[25px] tracking-[0.2px]"
            onClick={() => {onClose(); setModalStt(0);} }
          >
            Ok
          </Button>
        </div>
      </div>
    );
  };

  switch (ModalStt) {
    case 0:
      return <SelPaymentMethod />;
    case 1:
      return <SetBankAccountModal />;
    default:
      return <SuccessModal />;
  }
};
