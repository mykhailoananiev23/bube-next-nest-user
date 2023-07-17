import { useState } from "react";
import { PaymentModal } from "../../components/account/PaymentModal";
import Modal from "../../components/modal/Modal";
import { EllipseHorizontal } from "./Icons";

export default function PaymentMethodsForm() {
  const [PaymentModalStt, setPaymentModalStt] = useState(false);

  const onClosePaymentModal = () => {
    setPaymentModalStt(false)
  }
  return (
    <section className="w-full max-w-sm bg-white rounded-lg sm:max-w-md md:w-[66%] md:max-w-none">
      <h2 className="capitalize text-2xl p-6 font-bold border-b-[1px] border-gray-200">
        Billing & Payments
      </h2>
      <section className="p-6 flex flex-col gap-6 border-b-[1px] border-gray-200 sm:flex-row">
        <div>
          <h5 className="font-semibold text-lg capitalize mb-1">Billing due</h5>
          <p className="text-neutral-500">Your balance due is $0.00</p>
        </div>
        <button className="text-lg bg-[#B9BDC6] text-white px-8 py-2 w-max h-max rounded-full font-bold ml-auto">
          Pay Now
        </button>
      </section>
      <section className="p-6 flex flex-col gap-6 border-b-[1px] border-gray-200">
        <div className="w-full flex flex-col gap-4 sm:flex-row">
          <h3 className="capitalize text-xl font-bold">Billing Methods</h3>
          <button className="py-2 px-8 font-bold text-lg text-white bg-primary rounded-full ml-auto" onClick={() =>setPaymentModalStt(true)}>
            Add Method
          </button>
        </div>
        <div className="flex w-full justify-between">
          <div>
            <h5 className="font-bold">Primary</h5>
            <p className="text-neutral-600">Visa ending in 1234</p>
          </div>
          <div className="flex items-end">
            <EllipseHorizontal />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>
            <h5 className="font-bold">Additional</h5>
            <p className="text-neutral-600">Bank account ending in 1234</p>
          </div>
          <div className="flex items-end">
            <EllipseHorizontal />
          </div>
        </div>
      </section>
      <Modal visible={PaymentModalStt} onClose={onClosePaymentModal}>
        <PaymentModal onClose={onClosePaymentModal} />
      </Modal>
    </section>
  );
}
