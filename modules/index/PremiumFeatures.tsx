import Image from "next/image";
import boost from "../../public/images/boost.png";
import bitcoin from "../../public/images/bitcoin.png";
import gmailPic from "../../public/images/gmail_pic.png";
import tickPic from "../../public/images/tick_pic.png";

export const PremiumFeatures = () => {
  return (
    <div className="bg-[#F6F7FB]">
      <div className="container px-2 py-20 mx-auto">
        <div className="lg:flex items-center">
          <div className="lg:flex-auto lg:w-1/2 w-[80%] mx-auto max-[639px]:m-0 max-lg:text-center max-[639px]:w-full">
            <div className="lg:pl-[7%]">
              <h4 className="leading-tight text-[#050931] lg:text-[3.2rem] text-[2.4rem] max-[639px]:text-[30px] md:text-[40px] ">
                <span className="font-thin">Boost your account</span>
                <br />
                <span className="font-medium">With Premium Features</span>
              </h4>
              <div className="text-[#8B939A] text-[1.1rem] my-[5%] mr-[10%] max-lg:mx-0">
                <p className="pb-4">
                  Making this the first true generator on the Internet. It uses
                  a dictionary of over 200 Latin words, combined with a handful
                  of model sentence structures, to generate Lorem Ipsum which
                  looks reasonable lorem ipsum.
                </p>
                <p>
                  Making this the first true generator on the Internet. It uses
                  a dictionary of over 200 Latin words, combined with a handful
                  of model sentence structures, to generate Lorem Ipsum which
                  looks reasonable. The generated Lorem Ipsum is therefore
                  always free from repetition, injected humour, or
                  non-characteristic words etc.which do not look even slightly
                  believable. If you are going to use a passage of Lorem Ipsum,
                  you need to be sure there is not anything embarrassing hidden
                  in the middle of text.
                </p>
              </div>
              <button className="bg-[#0071BC] text-white text-md px-10 py-3 rounded-3xl">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:flex-auto lg:w-1/2 w-full pt-10 lg:pt-0 relative">
            <div className="w-full h-auto">
              <Image src={boost} alt="Boost" />
              <div className="bg-[#ffffff82] rounded-2xl w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] absolute shadow-md border border-solid border-[#fff] top-0 right-0">
                <div className="w-[50%] h-auto object-center mx-auto mt-2 lg:mt-4 rounded-full">
                  <Image src={bitcoin} alt="Bitcoin" className="rounded-full" />
                </div>
                <div>
                  <p className="text-center text-black font-medium text-[0.6rem] lg:text-sm mt-2">
                    Cryptocurrency
                  </p>
                </div>
              </div>
              <div className="bg-[#ffffffb5] h-[3rem] w-[12rem] lg:h-[5rem] lg:w-[18rem] absolute rounded-2xl bottom-[20px] left-0 shadow-md">
                <div className="w-[12%] mt-2 lg:mt-3 ml-4 absolute">
                  <Image src={gmailPic} alt="Gmail" />
                </div>
                <div className="w-[10%] mt-2 lg:mt-3 mr-2 right-0 absolute">
                  <Image src={tickPic} alt="Tik Tok" />
                </div>
                <p className="text-[#0071BC] font-medium text-md relative z-10 lg:mt-3 lg:ml-16 mt-1 ml-12">
                  Congrats!
                </p>
                <p className="text-[#4F516A] text-[0.6rem] lg:text-sm lg:mt-1 lg:ml-16 mt-0 ml-12 relative z-10">
                  You are on top search
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
