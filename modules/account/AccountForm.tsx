import { useSession } from "next-auth/react";
import { ArrowDown, QuestionMark } from "./Icons";

export default function AccountForm() {
  const { data: session } = useSession();
  return (
    <section className="w-full max-w-sm bg-white rounded-lg sm:max-w-md md:w-[66%] md:max-w-none">
      <h2 className="capitalize text-2xl p-6 font-bold border-b-[1px] border-gray-200">
        Need to update your profile{" "}
        <a href="sellers/profile" className="text-primary cursor-pointer">go to my profile</a>
      </h2>
      <form className="p-6 flex flex-col gap-6 border-b-[1px] border-gray-200 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">Full Name</label>
          <input
            className="bg-neutral-100 py-4 px-6 rounded-full outline-blue-500"
            type="text"
            placeholder={session?.user?.name ? session?.user?.name : 'Enter Name'}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">Email</label>
          <input
            className="bg-neutral-100 py-4 px-6 rounded-full outline-blue-500"
            type="email"
            placeholder={session?.user?.email ? session?.user?.email : 'Enter Email'}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">
            Online Status{" "}
            <span className="inline-flex w-3 h-3 bg-green-600 rounded-full ml-1"></span>
          </label>
          <p className="text-neutral-500">
            When online, your gigs are visible under the search filter
          </p>
          <select className="appearance-none bg-neutral-100 py-4 px-6 rounded-full outline-primary">
            <option selected>Go Online For</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button className="py-3 px-8 font-bold text-lg text-white bg-primary rounded-full lg:h-max lg:mt-auto">
            Save Changes
          </button>
        </div>
      </form>
      <div className="p-6 flex flex-col gap-4 border-b-[1px] border-gray-200 xl:flex-row">
        <h3 className="font-bold text-lg uppercase xl:w-full">Current Plan</h3>
        <div className="flex flex-col w-full justify-between gap-2 md:flex-row">
          <div>
            <h5 className="font-semibold text-lg flex items-center gap-2">
              Basic Plan <QuestionMark />{" "}
            </h5>
            <p className="text-2xl font-semibold">
              $200/ <span className="text-neutral-500">year</span>
            </p>
          </div>
          <button className="border-2 text-lg border-primary text-primary px-8 py-2 h-max my-auto w-max rounded-full font-bold ml-auto">
            Upgrade Plan
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-6 border-b-[1px] border-gray-200">
        <section className="flex flex-col gap-4 xl:flex-row">
          <h3 className="font-bold text-lg uppercase xl:w-full">
            Account Deactivation
          </h3>
          <div className="xl:w-full">
            <h4 className="font-semibold text-lg capitalize mb-1">
              What happens when you deactiate your account
            </h4>
            <p className="text-neutral-500">
              Your profile and gigs wouldn't be shown on fiverr anmore.{" "}
              <QuestionMark />
            </p>
            <p className="text-neutral-500">
              Active Orders will be cancelled. <QuestionMark />
            </p>
            <p className="text-neutral-500">
              You wouldn't be able to re-actiate your gigs.
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-4 lg:flex-row">
          <h3 className="font-bold text-lg capitalize lg:w-full">
            I am leaving because
          </h3>
          <div className="flex flex-col gap-4 md:flex-row lg:w-full lg:flex-col">
            <select className="appearance-none bg-neutral-100 py-4 px-6 rounded-full outline-blue-500 md:w-full">
              <option selected>Choose a reason</option>
            </select>
            <div className="ml-auto lg:w-full lg:flex lg:justify-end">
              <button className="text-lg bg-[#B9BDC6] text-white px-8 py-2 w-max rounded-full font-bold md:w-60">
                Deactivate Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
