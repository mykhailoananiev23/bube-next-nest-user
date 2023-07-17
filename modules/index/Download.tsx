import Image from "next/image";
import advert from "../../public/images/advert.png";
import appStore from "../../public/images/app_store.png";
import playStore from "../../public/images/play_store.png";

export const Download = () => (
    <div className="bg-[#D1E8F5]">
        <div className="bg-[#0071BC] h-[37.5rem] max-lg:h-fit">
          <div className="container px-2 mx-auto">
            <div className="lg:flex w-[90%] xl:w-[80%] mx-auto">
              <div className="lg:flex-auto lg:w-1/2 w-[80%] mx-auto xl:px-[4rem] lg:pt-[10.5rem] pt-6 max-lg:py-[40px] max-lg:w-full">
                <div className="xl:px-[4%] text-white">
                  <p className="text-[1.1rem] lg:mb-2 max-lg:text-center">Travel with us</p>
                  <h4 className="leading-tight xl:text-[3.5rem] lg:text-[3rem] text-[2.6rem] font-medium tracking-wide max-[639px]:text-[30px] max-[639px]:text-center max-lg:text-center">
                    The fast, affordable way to ride.
                  </h4>
                  <p className="text-[1.1rem] lg:mt-4 mt-2 max-lg:text-center">Download our app</p>
                  <div className="mt-3">
                    <div className="flex w-[16rem] max-lg:mx-auto">
                      <a href="#" className="w-[50%]">
                        <Image
                          src={appStore}
                          alt="App Store"
                          className="w-[100%] h-auto"
                        />
                      </a>
                      <a href="#" className="w-[50%] ml-5">
                        <Image
                          src={playStore}
                          alt="Play Store"
                          className="w-[100%] h-auto"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:flex-auto lg:w-1/2 w-[80%] xl:px-[4rem] mx-auto max-lg:hidden">
                <div className="lg:w-[30rem] w-[20rem] h-auto lg:mt-[9rem] mt-6 absolute">
                  <Image src={advert} alt="Advert" className="w-[20rem]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:py-[5rem] pb-4 pt-6">
          <div className="container px-4 mx-auto">
            <div className="lg:flex w-[100%] xl:w-[100%] mx-auto py-2">
              <div className="lg:flex-auto lg:w-2/3 w-[100%] text-[#050931] pb-4">
                <p className="lg:text-[1.5rem] text-[1rem] font-thin mb-2 max-lg:text-center">
                  Become A Driver
                </p> 
                <p className="lg:text-[3.45rem] text-[2rem] font-thin mb-2  max-lg:text-center">
                  <span className="font-light max-[639px]:text-[30px] md:text-[40px]">Earn Extra Money </span>
                  <span className="font-medium max-[639px]:text-[30px] md:text-[40px]">With Driving</span>
                </p>
                <p className="lg:text-[25px] text-[1.2rem] font-thin max-lg:text-center max-[639px]:text-[15px]">
                  Set Your Own Schedule, Be Your Own Boss.
                </p>
              </div>
              <div className="lg:flex-auto lg:w-1/3 w-[100%] lg:my-auto lg:text-right max-lg:justify-center max-lg:flex">
                <button className="bg-[#0071BC] text-white text-md lg:px-12 px-8 py-3 rounded-3xl">
                  Sign Up For Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
)