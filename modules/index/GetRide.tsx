import Image from "next/image";
import getRide from "../../public/images/get_ride.png";

export const GetRide = () => {
    return (
        <div className="bg-[#FFF]">
            <div className="container px-4 py-20 mx-auto">
                <div className="lg:flex">
                <div className="lg:flex-auto lg:w-1/2 max-[639px]:w-full">
                    <div className="lg:w-full w-[20rem] mx-auto lg:mx-0 h-auto max-[639px]:w-full">
                        <Image src={getRide} alt="Get Ride" />
                    </div>
                </div>
                <div className="lg:flex-auto lg:w-1/2 w-[100%] lg:my-auto">
                    <div className="lg:px-[6.5%] px-4 text-center lg:text-left pt-10 lg:pt-0">
                    <h4 className="leading-none text-[#050931] tracking-widest lg:text-[3.4rem] text-[2.5rem] font-medium max-[639px]:text-[30px] md:text-[40px]">
                        Get A Ride In Minutes!
                    </h4>
                    <p className="text-[#8B939A] text-[1.1rem] mt-4 mb-10 max-[639px]:text-[15px] max-[639px]:text-center">
                        Pick your destination, request a ride, meet your driver, enjoy
                        the journey.
                    </p>
                    <button className="bg-[#0071BC] text-white text-md px-10 py-3 rounded-3xl">
                        Get Started
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}