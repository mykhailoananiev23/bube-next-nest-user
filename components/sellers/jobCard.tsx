import { HeartIcon, ListBulletIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { TimeAgo } from "../timeago";

export default function JobCard({
  id,
  category,
  title,
  description,
  price,
  jobLevel,
  jobType,
  createdAt,
  expectedDeliveryTime,
  data
}: any) {
  const [height, setHeight] = useState("auto");
  console.log(data)
  function handleChange(event: any) {
    setHeight(`${event.target.scrollHeight}px`);
  }
  return (
    <div key={id} className="bg-white px-8 py-8 drop-shadow-sm rounded-lg my-8">
      <div className="justify-between">
        <div className="flex justify-between items-center">
          <h1 className="text-[#050931] text-xl font-medium">
            {" "}
            <TimeAgo datetime={createdAt} />
          </h1>
          <div className="flex items-center">
            {/* <div className="rounded-full bg-[#EFEFEF] p-2 mr-4">
              <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="rounded-full bg-[#EFEFEF] p-2">
              <HeartIcon className="h-5 w-5" aria-hidden="true" />
            </div> */}
          </div>
        </div>
        <div className="flex text-[#8B939A] mt-3">
          <div className="border-r-2 pr-3">{`Expert - ${jobLevel}`}</div>
          <div className="ml-3">{` Job Type - ${jobType}`}</div>
        </div>
        <hr className="my-5" />
        <div className="flex">
          <textarea
            className="text-lg leading-7 w-full my-1 break-words "
            style={{ height }}
            onInput={handleChange}
            value={description}
          ></textarea>
        </div>
        <hr className="my-5" />
        <h2 className="text-xl">
          <span className="text-[#8B939A]">Budget : </span>
          <span className="text-darkText font-medium">{price}</span>
        </h2>
        <hr className="my-5" />
        <h2 className="text-xl pb-5 font-medium text-darkText">
          Skills And Expertise
        </h2>
        <div className="mt-5">
          {data?.skill?.map((skill: { id: number; name: string }) => (
            <div
              key={skill.id}
              className="inline-block bg-gray-200 text-black font-bold px-2 py-1 rounded-full mr-2 mb-2"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
