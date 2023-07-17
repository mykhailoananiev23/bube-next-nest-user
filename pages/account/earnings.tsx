import { ReactElement } from "react";
import {AccountLayout} from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";

const earnings: NextPageWithLayout = () => {
  return (
    <div className="bg-bgcolor   h-full-screen text-[#8B939A]">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="bg-white drop-shadow-sm px-4 py-12 rounded-lg">
                <p className="leading-relaxed">Net Income</p>
                <h2 className="title-font font-medium text-3xl text-darkText">
                  $280
                </h2>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="bg-white drop-shadow-sm px-4 py-12 rounded-lg">
                <p className="leading-relaxed">Withdrawn</p>
                <h2 className="title-font font-medium text-3xl text-darkText">
                  $150
                </h2>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="bg-white px-4 py-12 drop-shadow-sm rounded-lg">
                <p className="leading-relaxed">Available For Withdrawal</p>
                <h2 className="title-font font-medium text-3xl text-darkText">
                  $30
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

earnings.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default earnings;
