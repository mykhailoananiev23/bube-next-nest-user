import { PencilIcon } from "@heroicons/react/24/outline";

export const UserInfoCard = () => {
  return (
    <div className="m-8 md:ml-8 bg-white sm:pl-0 rounded-xl md:w-1/3 w-[90%] mx-auto h-full">
      <div className="bg-[#E4F4F1] mt-6 p-5 m-5 rounded-lg">
        <h2 className={"text-[#050931] text-l font-medium"}>
          Profile Completeness:
        </h2>

        <div className="">
          <div className="flex relative items-center pt-1 ">
            <div className="overflow-hidden h-1  text-xs flex rounded bg-white w-full">
              <div
                style={{ width: "80%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white  h-1 justify-center bg-[#55BC7E]"
              ></div>
            </div>
            <h3 className={"text-[#050931] text-l ml-2 font-medium"}>80%</h3>
          </div>
        </div>
      </div>
      <hr className="mx-5 my-8" />
      <div className="flex justify-between items-center mx-5 my-8">
        <h2 className="text-[#050931] text-xl font-semibold">My Categories</h2>
        <button>
          <PencilIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className={"mx-5 pb-8"}>
        {/* {user.categories.map((category) => (
          <li key={category} className="list-none m-2 font-medium text-primary">
            {category}
          </li>
        ))} */}
      </div>
    </div>
  );
};
