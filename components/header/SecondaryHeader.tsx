import Image from "next/image";
import Link from "next/link";
// import Logo from "../../public/images/logo.svg";

export const SecondaryHeader = () => {
  return (
    <div className="header-2">
      <nav className="bg-[#FFFFFF] py-2 md:py-4">
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
          </div>
          <div
            className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 text-[0.8rem] lg:text-[0.9rem]"
            id="navbar-collapse"
          ></div>
        </div>
      </nav>
    </div>
  );
}
