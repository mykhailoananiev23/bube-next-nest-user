import pOne from "../../public/images/p-1.png";
import blueDot from "../../public/images/blue_dot.png";
import ellipse1 from "../../public/images/ellipse1.png";
import pTwo from "../../public/images/p-2.png";
import pThree from "../../public/images/p-3.png";
import pFour from "../../public/images/p-4.png";
import pFive from "../../public/images/p-5.png";
import pSix from "../../public/images/p-6.png";
import pSeven from "../../public/images/p-7.png";
import pEight from "../../public/images/p-8.png";
import pNine from "../../public/images/p-9.png";
import pTen from "../../public/images/p-10.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const FreelancerCard = ({ image }: any) => (
  <div className="flex-auto w-[20%]">
    <div className="p-4 ">
      <Image src={image} alt="P" className="rounded-full" />
    </div>
  </div>
);

const FreelancerService = ({ title, desc }: any) => (
  <div>
    <div className="flex mx-[12%] mt-[5%]">
      <Image src={blueDot} alt="Dot" className="w-[0.6rem] h-auto my-auto" />
      <p className="text-[#050931] pl-[3%] text-[1rem] font-medium my-auto">
        {title}
      </p>
    </div>
    <div className="ml-[12%] mr-[45%] mt-[1%]">
      <p className="text-[#8B939A] pl-[3%] text-[0.8rem] font-thin">{desc}</p>
    </div>
  </div>
);

export const Freelancers = ({searchword, filterType}:any) => {
  const router = useRouter()

  const gotoFilterFreelancer = () => {
    router.push('filter/freelancers')
  }
  return (
    <div className="bg-[#FFF] pb-12">
      <div className="container px-4 pt-20 mx-auto">
        <div className="lg:flex">
          <div className="lg:flex-auto lg:w-1/2">
            <div className="w-[98%] mx-auto lg:mx-0 lg:w-[40rem] h-auto relative">
              <Image src={ellipse1} alt="Ecllipe" />
            </div>
            <div className="bg-white rounded-2xl w-[80%] mx-auto lg:mx-0 lg:w-[24rem] xl:w-[31rem] h-[24rem] lg:h-[20rem] xl:h-[24rem] lg:ml-14 xl:ml-20 mt-[-70vw] sm:mt-[-64vw] md:mt-[-34rem] lg:mt-[-25rem] xl:mt-[-31rem] relative z-10 shadow-md">
              <p className="text-[#8392A5] text-center text-xl xl:text-3xl font-light pt-8">
                50,000+ Talented Freelancers
              </p>
              <div className="flex mb-2 mt-20 md:mt-8 lg:mt-16">
                <FreelancerCard image={pOne} />
                <FreelancerCard image={pTwo} />
                <FreelancerCard image={pThree} />
                <FreelancerCard image={pFour} />
                <FreelancerCard image={pFive} />
              </div>
              <div className="flex">
                <div className="flex-auto w-[20%]"></div>
                <FreelancerCard image={pNine} />
                <FreelancerCard image={pEight} />
                <FreelancerCard image={pSeven} />
                <FreelancerCard image={pSix} />
              </div>
              <div className="bg-[#fff] rounded-xl w-[9rem] h-[13rem] xl:w-[11rem] lg:h-[12rem] lg:w-[9rem] xl:h-[15rem] relative z-20 shadow-md mt-[-6.5rem] xl:mt-[-8rem] ml-[-3rem] p-4 xl:p-8">
                <div className="w-[60%] xl:w-[70%] h-auto object-center mx-auto">
                  <Image src={pTen} alt="P" className="rounded-full" />
                </div>
                <div>
                  <p className="text-center text-black font-medium text-sm pt-4">
                    Alen Bouder
                  </p>
                  <p className="text-center text-[#8B939A] font-light text-sm">
                    Product Manager
                  </p>
                  <p className="text-center text-[#8B939A] font-light text-sm pt-2 xl:pt-4">
                    758 posts
                  </p>
                </div>
              </div>
              <form className="flex z-12 xl:mt-[-23.5rem] xl:ml-[21rem] lg:mt-[-19.5rem] lg:ml-[10.5rem] md:mt-[-24rem] md:ml-[23rem] sm:mt-[-23rem] sm:ml-[16rem] mt-[-19rem] ml-[2rem]">
                <input
                  type=""
                  name=""
                  placeholder="Job title or keywords"
                  className="bg-[#fff] rounded-xl md:w-[20rem] w-[15rem] h-[3.5rem] text-center text-[#8B939A] focus:outline-[#0071BC] shadow-md"
                />
                <button
                  type="submit"
                  className="bg-[#0071BC] text-white w-[3.5rem] h-[3.5rem] rounded-xl absolute ml-[13.5rem] mt-[-1rem]"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          </div>
          <div className="lg:flex-auto lg:w-1/2">
            <div className="lg:pt-12 pt-[6rem] ml-[12%]">
              <h4 className="leading-none">
                <span className="font-thin text-[2.5rem]">Find The</span>
                <br />
                <span className="font-medium text-[3rem]">Best Freelancer</span>
              </h4>
            </div>
            <FreelancerService
              title="The best for every budget"
              desc="Find high-quality services at every price point. No hourly rates, just project-based pricing."
            />
            <FreelancerService
              title="Quality work done quickly"
              desc="Find the right freelancer to begin working on your project within minutes."
            />
            <FreelancerService
              title="Protected payments, every time"
              desc="Always know what you will pay upfront. Your payment is not released until you approve the work."
            />
            <FreelancerService
              title="24/7 support"
              desc="Questions? Our round-the-clock support team is available to help anytime, anywhere."
            />
            <div className="mt-8 ml-[12%]">
              <button className="bg-[#0071BC] text-white text-md px-10 py-3 rounded-3xl" onClick={gotoFilterFreelancer}>
                Find Freelancer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
