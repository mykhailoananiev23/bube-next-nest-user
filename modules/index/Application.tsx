import Image from "next/image";
import algo from "../../public/images/algo.png";

export const Application = () => {
  return (
    <div className="bg-[#FFF]">
      <div className="container px-4 py-20 mx-auto">
        <div className="lg:flex">
          <div className="lg:flex-auto lg:w-1/2 w-[80%] mx-auto lg:mx-0">
            <div className="w-full h-auto">
              <Image src={algo} alt="Algo" className="max-lg:w-full" />
            </div>
          </div>
          <div className="lg:flex-auto lg:w-1/2 lg:my-auto w-[80%] mx-auto lg:mx-0 pt-10 lg:pt-0">
            <div className="lg:px-[6.5%]">
              <h4 className="leading-none text-[#050931] tracking-[0rem] lg:text-[3.4rem] text-[2.5rem] max-[639px]:text-[30px] md:text-[40px] max-lg:text-center">
                <span className="font-thin">BuBe search algorithm chooses</span>
                <span className="font-medium"> from 5,000+ artisans.</span>
              </h4>
              <p className="text-[#8B939A] lg:text-[1.1rem] text-[1rem] lg:my-[5%] pt-5 lg:pt-0 max-lg:text-center">
                Making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.which do not look even slightly believable. If you are going
                to use a passage of Lorem Ipsum, you need to be sure there is
                not anything embarrassing hidden in the middle of text.
              </p>
              <div className="max-lg:justify-center max-lg:flex">
                <button className="bg-[#0071BC] text-white text-md px-10 py-3 rounded-3xl mt-6 lg:mt-0">
                  Submit An Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
