import { PencilIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import JobSkills from "../../components/skills";

export const RequestCard = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-3xl drop-shadow-sm my-8 text-[#8B939A] max-w-5xl">
      <div className="justify-between">
        <div className="flex justify-between ">
          <h2 className="text-[#050931] text-2xl font-medium">{data.title}</h2>
          <PencilIcon className="h-5 w-5" aria-hidden="true" />
        </div>

        <hr className="my-5" />
        <p className="mb-5 overflow-hidden  leading-7 h-20">
          {data.description}
        </p>

        <JobSkills data={data.skill} />
        <hr className="my-5" />

        <h2 className="text-[#050931] text-xl font-medium">
          {`$ ${data.price}`}
        </h2>
      </div>

      <div className="w-full pt-4">
        <Link href={{pathname: '/buyers/request', query: {id: data.id}}}>
            <button className="w-full min-h-[50px] rounded-full bg-blue-500 text-white font-bold hover:border-blue-500 hover:border-2 hover:bg-[#e6e6e6] hover:text-[#3482f8] hover:shadow-inner shadow-lg shadow-blue-500/50">Manage Requests</button>
        </Link>
      </div>
    </div>
  );
};
