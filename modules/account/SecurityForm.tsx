export default function SecurityForm() {
  return (
    <section className="w-full max-w-sm bg-white rounded-lg sm:max-w-md md:w-[66%] md:max-w-none">
      <h2 className="capitalize text-2xl p-6 font-bold border-b-[1px] border-gray-200">
        Change password
      </h2>
      <form className="p-6 flex flex-col gap-6 border-b-[1px] border-gray-200">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">Current Password</label>
          <input
            className="bg-neutral-100 py-4 px-6 rounded-full outline-primary"
            type="password"
            placeholder="Enter Your Current Password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">New Password</label>
          <input
            className="bg-neutral-100 py-4 px-6 rounded-full outline-primary"
            type="password"
            placeholder="Enter Your New Password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">Confirm Password</label>
          <input
            className="bg-neutral-100 py-4 px-6 rounded-full outline-primary"
            type="password"
            placeholder="Enter Your Confirm Password"
          />
        </div>
        <p className="text-neutral-500">
          8 character or longer. Combine upper and lowercase letters and
          numbers.
        </p>
        <button className="py-2 px-8 font-bold text-lg text-white bg-primary rounded-full lg:h-max lg:mt-auto w-max ml-auto">
          Save Changes
        </button>
      </form>
      <div className="p-6 flex flex-col gap-6 lg:flex-row">
        <h3 className="font-bold text-lg capitalize lg:w-[33%]">
          Phone Verification
        </h3>
        <div className="flex flex-col gap-2 md:flex-row lg:w-[66%]">
          <p className="text-neutral-500">
            Your phone is verified. Click edit to change your phone
            number.
          </p>
          <button className="py-2 px-8 font-bold text-lg text-white bg-primary rounded-full lg:h-max lg:mt-auto w-max ml-auto">
            Edit
          </button>
        </div>
      </div>
    </section>
  );
}
