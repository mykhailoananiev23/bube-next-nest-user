import Image from "next/image";
// import Logo from "../../public/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {SecondaryFooter} from "./SecondaryFooter";
import Link from "next/link";

export const MainFooter = () => {
  return (
    <footer className="bg-white">
      <div className="container px-4 py-20 mx-auto sticky bottom-0">
        <div className="lg:flex">
          <div className="lg:flex-auto lg:w-[40%] lg:my-14  my-2 w-[80%]  mx-auto lg:mx-0">
            <div className="">
              <Link href="/" className="">
                <a>LOGO</a>
                {/* <>
                  <Image
                    src={Logo}
                    alt={"BuBe"}
                    width={175}
                  />
                </> */}
              </Link>

              <p className="text-[#8B939A] text-[0.8rem] capitalize">
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc
              </p>
            </div>
          </div>
          <div className="lg:flex-auto lg:w-[20%] lg:my-14 my-2 w-[80%] mx-auto lg:mx-0 lg:relative">
            <div className="lg:absolute lg:inset-y-0 lg:right-0">
              <p className="text-[#333333] text-[0.9rem] font-medium">
                Important Links
              </p>
              <Link href="/">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] lg:mt-8 mt-3">
                    Home
                  </p>
                </a>
              </Link>

              <Link href={`/sellers/jobs`}>
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">Find Work</p>
                </a>
              </Link>
              <Link href="#">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">Why</p>
                </a>
              </Link>
              <Link href="#">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">
                    Enterprise
                  </p>
                </a>
              </Link>

              <Link href={`/blogs`}>
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">Blog</p>
                </a>
              </Link>
            </div>
          </div>
          <div className="lg:flex-auto lg:w-[20%] lg:my-14 my-2  w-[80%] mx-auto lg:mx-0 lg:relative">
            <div className="lg:absolute lg:inset-y-0 lg:right-0">
              <p className="text-[#333333] text-[0.9rem] font-medium">
                Other Links
              </p>
              <Link href="#">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] lg:mt-8 mt-3">
                    How It Works
                  </p>
                </a>
              </Link>
              <Link href={`/faq`}>
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">FAQs</p>
                </a>
              </Link>
              <Link href="/contactus">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">
                    Contact Us
                  </p>
                </a>
              </Link>
              <Link href="#">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">
                    Terms and Conditions
                  </p>
                </a>
              </Link>
              <Link href="#">
                <a>
                  <p className="text-[#8B939A] text-[0.8rem] mt-2">
                    Privacy Policy
                  </p>
                </a>
              </Link>
            </div>
          </div>
          <div className="lg:flex-auto lg:w-[20%] lg:my-14 my-2  w-[80%] mx-auto lg:mx-0 lg:relative">
            <div className="lg:absolute lg:inset-y-0 lg:right-0">
              <p className="text-[#333333] text-[0.9rem] font-medium">
                Need Help?
              </p>
              <Link href="#">
                <p className="text-[#8B939A] text-[0.8rem] mt-2">
                  <i className="fa-regular fa-envelope text-[#0071BC] mr-2"></i>
                  www@example.com
                </p>
              </Link>
              <Link href="#">
                <p className="text-[#8B939A] text-[0.8rem] mt-2 mb-4">
                  <i className="fa-solid fa-phone-volume text-[#0071BC] mr-2"></i>
                  (123) 456-7890
                </p>
              </Link>
              <div className="border border-[#0000001a] border-t-2 border-l-0 border-r-0 border-b-0"></div>
              <p className="text-[#333333] text-[0.9rem] mt-4 font-medium">
                Follow Us On
              </p>
              <div className="flex mt-3 w-[10rem]">
                <div className="flex-auto w-[25%] text-[#0071BC] text-[0.8rem] text-center">
                  <Link href="#">
                    <FontAwesomeIcon
                      className="border border-solid border-[#0071BC] py-[0.5rem] px-[0.65rem] rounded-full"
                      icon={faFacebookF}
                    />
                  </Link>
                </div>
                <div className="flex-auto w-[25%] text-[#0071BC] text-[0.8rem] text-center">
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="fa-brands fa-twitter border border-solid border-[#0071BC] py-[0.5rem] px-[0.5rem] rounded-full"
                    />
                  </Link>
                </div>
                <div className="flex-auto w-[25%] text-[#0071BC] text-[0.8rem] text-center">
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="fa-brands fa-linkedin-in border border-solid border-[#0071BC] py-[0.5rem] px-[0.55rem] rounded-full"
                    />
                  </Link>
                </div>
                <div className="flex-auto w-[25%] text-[#0071BC] text-[0.8rem] text-center">
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="fa-brands fa-instagram border border-solid border-[#0071BC] py-[0.5rem] px-[0.55rem] rounded-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-[#0000001a] border-t-2 border-l-0 border-r-0 border-b-0 w-"></div>
      <SecondaryFooter />
    </footer>
  );
}
