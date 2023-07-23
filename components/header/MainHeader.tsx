import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
// import Logo from "../../public/images/logo.svg";
import Link from "next/link";

export const MainHeader = () => {
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

  return (
    <div className="header-2">
      <nav className="bg-[#DCF0FB] py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
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
            {showSidebar ? (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden z-50 cursor-pointer right-10 top-6 border border-solid border-[#363636] rounded-2xl opacity-50 hover:opacity-75 px-3 py-1"
                id="navbar-toggle"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            ) : (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden z-30 cursor-pointer right-10 top-6 border border-solid border-[#363636] rounded-2xl opacity-50 hover:opacity-75 px-3 py-1"
                id="navbar-toggle"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </div>
          <div
            ref={ref}
            className={`md:hidden wrapper top-0 right-0 w-[70vw] bg-[#DCF0FB] p-10 fixed h-full z-40 flex flex-col ease-in-out duration-300 ${
              showSidebar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <a
              href="#"
              className="text-center p-2 lg:px-4 md:mx-2 text-[#1e50d7] underline underline-offset-4 decoration-2 font-medium"
            >
              Home
            </a>
            <a
              href={`/filter/freelancers`}
              className={`text-center p-2 lg:px-4 md:mx-2 text-[#363636] rounded`}
            >
              Find<span className="invisible">_</span>Talent
            </a>
            <a
              href={`/filter/jobs`}
              className="text-center p-2 lg:px-4 md:mx-2 text-[#363636] rounded"
            >
              Find<span className="invisible">_</span>Work
            </a>
            <a
              href="#"
              className="text-center p-2 lg:px-4 md:mx-2 text-[#363636] rounded"
            >
              Why
            </a>
            <a
              href="#"
              className="text-center p-2 lg:px-4 md:mx-2 mb-4 md:mb-0 text-[#363636] rounded"
            >
              Enterprise
            </a>
            <a
              href={`/account/login`}
              className="p-2 lg:px-8 md:mx-2 text-[#1e50d7] text-center border border-solid border-[#1e50d7] rounded-3xl"
            >
              Login
            </a>
            <a
              href={`/account/signup`}
              className="p-2 lg:px-8 md:mx-2 text-white text-center bg-[#1e50d7] rounded-3xl mt-3 md:mt-0"
            >
              Signup
            </a>
          </div>
          <div
            className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 text-[0.8rem] lg:text-[0.9rem]"
            id="navbar-collapse"
          >
            <Link href="/">
              <a
                className="p-2 lg:px-4 md:mx-2 text-[#1e50d7] underline underline-offset-4 decoration-2 font-medium"
              >
                Home
              </a>
            </Link>
            <a
              href={`/filter/freelancers`}
              className="p-2 lg:px-4 md:mx-2 text-[#363636] rounded"
            >
              Find<span className="invisible">_</span>Talent
            </a>
            <a
              href={`/filter/jobs`}
              className="p-2 lg:px-4 md:mx-2 text-[#363636] rounded"
            >
              Find<span className="invisible">_</span>Work
            </a>
            <a href="#" className="p-2 lg:px-4 md:mx-2 text-[#363636] rounded">
              Why
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 mb-4 md:mb-0 text-[#363636] rounded"
            >
              Enterprise
            </a>
            <a
              href={`/account/login`}
              className="p-2 lg:px-8 md:mx-2 text-[#1e50d7] text-center border border-solid border-[#1e50d7] rounded-3xl"
            >
              Login
            </a>
            <a
              href={`/account/signup`}
              className="p-2 lg:px-8 md:mx-2 text-white text-center bg-[#1e50d7] rounded-3xl mt-3 md:mt-0"
            >
              Signup
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
