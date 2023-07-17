import Image from "next/image";
import Link from "next/link";

import client from "../../public/images/tty.png";
import { useEffect, useState } from "react";
import {User} from "../../types/user";

export default function HeroSection({ user }: any ) {

  return (
    <div className="bg-[#DCF0FB]">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 lg:py-10 md:py-5 p-2">
        {/* <div className="md:flex"> */}
          {/* <div className="md:flex-auto flex md:w-2/3 py-8 md:pt-0 items-center"> */}
          <div className="">
            <div className="text-[#050931] my-6 md:my-12">
              <div>
                <div className="font-extrabold text-[2.5rem] lg:text-[4rem] leading-10 capitalize">
                {user}
                </div>
                <br />
                <div className="leading-none text-[1.8rem] lg:text-[2rem] font-normal my-4">
                  {`Here's What you Need To Build Your Website`}
                </div>
              </div>
              <div className="flex">
                <div className="text-lg font-medium my-5 bg-[#C8E5F5] rounded-3xl py-2 px-3">
                  Get Offers From Sellers For Your Project
                </div>
              </div>
              <div>
                <Link href={"/buyers/my-requests"}>
                  <button className="bg-primary text-md font-medium rounded-full px-7 m-2 py-3 text-white ">
                    Post A Request
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="hidden md:flex md:flex-auto md:w-1/3 relative"> */}
          <div className="flex justify-center items-center">
            {/* <div className="mt-7 ml-auto flex items-bottom"> */}
            <div className="w-10/12 md:w-full lg:w-9/12">
              <Image src={client} alt="Home Pic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
