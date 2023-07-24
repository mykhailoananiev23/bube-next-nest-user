import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
// import logo from "../../public/logo.svg";
import { useRouter } from "next/router";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
const pOne = require("../../public/images/p-1.png");
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import UserDropDownComponent from "../../modules/others/dropdown";
import { InboxDropDown } from "./sub/Inbox";
import { Notification } from "./sub/Notification";
import { AccountJobSearch } from "./AccountJobSearch";

interface State {
  isDropdown: boolean;
  isMenu: boolean;
}

interface Action {
  type: string;
}

export const AccountHeader = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        showSidebar &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showSidebar]);

  const menuitems = [
    {
      title: " Browse Gig",
      url: "/buyers",
    },
    {
      title: "Find Jobs",
      url: "/sellers/jobs",
      submenu: [
        {
          title: "Find Jobs",
          url: "/sellers/jobs",
        },
        {
          title: "Saved Jobs",
          url: "#",
        },
        {
          title: "Proposals",
          url: "/sellers/proposals",
        },
        {
          title: "Profile",
          url: "/sellers/profile",
        },
      ],
    },
    {
      title: "My Jobs",
      url: "#",
    },
    {
      title: "My Request",
      url: "/buyers/my-requests",
    },
    {
      title: "My Gigs",
      url: "/sellers/my-gigs",
    },
  ];

  return (
    <div className="header-2">
      <nav className="bg-[#FFFFFF] shadow-sm">
        <div className="px-4 mx-auto xl:flex xl:items-center py-2 xl:py-4">
          <div className="flex justify-between items-center">
            <Link href={session && session ? "/buyers" : "/"}>
              <div className="w-[10rem]">
                LOGO
                {/* <Image src={logo} alt="logo" /> */}
              </div>
            </Link>
            <div className="relative w-full px-2">
              <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                <MagnifyingGlassIcon width={20} className="text-neutral-600" />
              </div>
              <AccountJobSearch />
            </div>

            {((router.pathname.startsWith("/inbox") && router.query.c) ||
              router.pathname.startsWith("/buyers")) && (
              <Link href={`/sellers/jobs`}>
                <a className="xl:hidden px-2 py-1 xl:px-5 xl:mx-2 max-sm:my-2 text-primary text-center border-2 border-solid border-primary focus:outline-none bg-white rounded-full hover:bg-gray-100 font-semibold text-[16px]">
                  S
                </a>
              </Link>
            )}
            {(router.pathname.startsWith("/sellers") ||
              (router.pathname.startsWith("/inbox") && !router.query.c) ||
              router.pathname.startsWith("/account")) && (
              <Link href={`/buyers`}>
                <a className="xl:hidden p-2 py-1 xl:px-5 xl:mx-2 max-sm:my-2 text-primary text-center border-2 border-solid border-primary focus:outline-none bg-white rounded-full hover:bg-gray-100 font-semibold text-[16px]">
                  B
                </a>
              </Link>
            )}
            <div className="xl:hidden flex gap-2">
              <div className="w-10 h-10 xl:hidden">
                <div className="w-[40px] h-[40px]">
                  <Image src={pOne} className="rounded-full" />
                </div>
              </div>
              <UserDropDownComponent />
            </div>
            {showSidebar ? (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="xl:hidden z-50 cursor-pointer right-10 top-6 border border-solid border-[#363636] rounded-2xl opacity-50 hover:opacity-75 px-3 py-1"
                id="navbar-toggle"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            ) : (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="xl:hidden z-30 cursor-pointer right-10 top-6 border border-solid border-[#363636] rounded-2xl opacity-50 hover:opacity-75 px-3 py-1"
                id="navbar-toggle"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </div>
          <div
            ref={ref}
            className={`xl:hidden wrapper top-0 right-0 min-w-[300px] bg-[#DCF0FB] p-10 fixed h-full z-40 flex flex-col ease-in-out duration-300 ${
              showSidebar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {menuitems.map((item, index) => (
              <div
                className="text-center p-2 lg:px-4 md:mx-2 text-[#363636] rounded"
                key={index}
              >
                {!item.submenu && (
                  <Link href={item.url}>
                    <a
                      className={`${
                        router.pathname === item.url
                          ? "text-[#1e50d7] underline underline-offset-4"
                          : " "
                      }`}
                      onClick={() => {
                        setShowSidebar(false);
                      }}
                    >
                      {item.title}
                    </a>
                  </Link>
                )}
                <div>
                  {item.submenu &&
                    item.submenu.map((ele, idx) => {
                      return (
                        <div
                          className="text-center p-2 lg:px-4 md:mx-2 text-[#363636] rounded"
                          key={idx}
                        >
                          <Link href={ele.url}>
                            <a
                              className={`${
                                router.pathname === ele.url
                                  ? "text-[#1e50d7] underline underline-offset-4"
                                  : " "
                              }`}
                              onClick={() => {
                                router.push(ele.url);
                                setShowSidebar(false);
                              }}
                            >
                              {ele.title}
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
            <div className="text-center p-2 lg:px-4 md:mx-2 text-[#363636] rounded">
              <Link href={"/inbox"}>
                <a
                  className={`${
                    router.pathname === "/inbox"
                      ? "text-[#1e50d7] underline underline-offset-4"
                      : " "
                  }`}
                  onClick={() => {
                    setShowSidebar(false);
                  }}
                >
                  Inbox
                </a>
              </Link>
            </div>
          </div>
          <div
            className={`hidden xl:flex flex-col xl:flex-row xl:ml-auto mt-3 xl:mt-0 text-[0.8rem] xl:text-[0.9rem]"
            id="navbar-collapse`}
          >
            <div className="flex gap-4">
              <div className="flex items-center gap-8">
                {menuitems.map((item, index) => (
                  <div key={index} className="group">
                    <Link href={item.url} key={item.title}>
                      <span
                        className={`flex font-medium rounded cursor-pointer hover:underline text-base ${
                          router.pathname == item.url
                            ? "text-[#1e50d7] underline underline-offset-4 decoration-2"
                            : "text-[#363636]"
                        }`}
                      >
                        {item.title}{" "}
                        {item.submenu && (
                          <ChevronDownIcon
                            className="ml-1 group-hover:rotate-180 group-hover:ml-1"
                            width={20}
                          />
                        )}
                      </span>
                    </Link>
                    {item.submenu && (
                      <div
                        className={`z-10 hidden group-hover:block font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 border border-[##0000001a] absolute`}
                      >
                        {item.submenu.map((subitem) => (
                          <Link href={subitem.url} key={subitem.title}>
                            <ul
                              className="py-1 text-sm text-gray-700"
                              aria-labelledby="dropdownLargeButton"
                            >
                              <li
                                className={`font-medium rounded cursor-pointer hover:underline text-base block px-4 py-2 hover:bg-gray-100 ${
                                  router.pathname == subitem.url
                                    ? "text-[#1e50d7] underline underline-offset-4 decoration-2"
                                    : "text-[#363636]"
                                }`}
                              >
                                {subitem.title}
                              </li>
                            </ul>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="group">
                  <Notification />
                </div>
              </div>
              <div>
                <InboxDropDown />
              </div>
            </div>

            {((router.pathname.startsWith("/inbox") && router.query.c) ||
              router.pathname.startsWith("/buyers")) && (
              <Link href={`/sellers/jobs`}>
                <a className="p-2 xl:px-5 xl:mx-2 max-sm:my-2 text-primary text-center border-2 border-solid border-primary focus:outline-none bg-white rounded-full hover:bg-gray-100 font-semibold text-[16px]">
                  Switch to Seller
                </a>
              </Link>
            )}
            {(router.pathname.startsWith("/sellers") ||
              (router.pathname.startsWith("/inbox") && !router.query.c) ||
              router.pathname.startsWith("/account")) && (
              <Link href={`/buyers`}>
                <a className="p-2 xl:px-5 xl:mx-2 max-sm:my-2 text-primary text-center border-2 border-solid border-primary focus:outline-none bg-white rounded-full hover:bg-gray-100 font-semibold text-[16px]">
                  Switch to Buyer
                </a>
              </Link>
            )}
            <div className="flex flex-row gap-2">
              <div className="w-[40px] h-[40px]">
                <Image src={pOne} className="rounded-full" />
              </div>
              <UserDropDownComponent />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
