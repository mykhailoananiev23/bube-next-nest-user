import { ReactElement } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";

const stcData = [
  {
    date: "14 Aug, 2022",
    for: "Withdrawal Completed Successfully",
    amount: "$7.91",
  },
  {
    date: "12 Aug, 2022",
    for: "Withdrawal Initiated",
    amount: "-$7.91",
  },
  {
    date: "10 Aug, 2022",
    for: "Fund Cleared (View Order)",
    amount: "$7.90",
  },
  {
    date: "02 July, 2022",
    for: "Tax Collected/deducted at source (View order)",
    amount: "-$7.91",
  },
];

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
        <div className="container mx-auto">
          <table className="min-w-full divide divide-gray-300">
            <thead className="bg-[#f4f5f9]">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 border-r-2 border-[#eaeaeb] pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 border-r-2 border-[#eaeaeb] text-left text-sm font-semibold text-gray-900"
                >
                  For
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 border-r-2 border-[#eaeaeb] text-left text-sm font-semibold text-gray-900"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {stcData.map((ele: any, idx: number) => (
                <tr key={idx}>
                  <td className="whitespace-nowrap border-r-2 border-[#eaeaeb] px-3 py-4 text-sm text-[#91989f]">
                    {ele.date}
                  </td>
                  <td className="whitespace-nowrap border-r-2 border-[#eaeaeb] px-3 py-4 text-sm text-[#91989f]">
                    {ele.for}
                  </td>
                  <td className="whitespace-nowrap border-r-2 border-[#eaeaeb] px-3 py-4 text-sm text-[#91989f]">
                    {ele.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

earnings.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default earnings;
