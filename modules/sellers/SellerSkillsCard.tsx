import { XMarkIcon } from "@heroicons/react/20/solid";

export const SellerSkillsCard = ({ skills }: any) => {
  return (
    <div className=" bg-white sm:pl-0 py-8 mt-8  max-w-2xl w-full rounded-lg drop-shadow-md">
      <h1 className="text-darkText text-2xl mx-8 font-semibold">Skills</h1>
      <hr className="my-8" />
      <div className="flex gap-2">
        {skills.map(({ id, title }: any) => (
          <div
            key={id}
            className="rounded-full bg-[#EFEFEF] flex-col my-3 text-base mx-4"
          >
            <span> {title}</span>
            <button>
              <XMarkIcon className="h-6 w-7 ml-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
