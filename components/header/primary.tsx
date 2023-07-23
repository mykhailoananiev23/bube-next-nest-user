import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// import Logo from "../../assets/logo.svg";
import SearchBox from "../searchbox";

export default function PrimaryHeader() {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Find Jobs", path: "javascript:void(0)" },
    { title: "My Jobs", path: "javascript:void(0)" },
    { title: "My Gigs", path: "javascript:void(0)" },
    { title: "Inbox", path: "javascript:void(0)" },
  ];

  return (
    <div className="header-2">
      <nav className="bg-[#FFFFFF] py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <div className="flex">
              <Link href="/">
                <a className="w-[10rem]">
                  LOGO
                  {/* <Image
                    src={Logo}
                    className="w-3/4 h-auto object-center m-auto"
                    alt={"BuBe"}
                  /> */}
                </a>
              </Link>
              <SearchBox />
              <div className="md:hidden">
                <button
                  className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                  onClick={() => setState(!state)}
                >
                  {state ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className=" items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <a href={item.path}>{item.title}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
