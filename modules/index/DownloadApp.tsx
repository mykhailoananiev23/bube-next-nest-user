import Image from "next/image";
import appStore from "../../public/images/app_store.png";
import playStore from "../../public/images/play_store.png";


export const DownloadApp = () => {
    return (
        <div className="bg-white py-[2%]">
            <div className="bg-[#D1E8F5] container px-4 py-20 mx-auto rounded-3xl">
            <div className="text-center lg:px-4 px-6">
                <p className="text-[#050931] text-[0.9rem] lg:mt-[6rem] mt-3 mb-3">
                Become an artisan
                </p>
                <p className="text-[#050931] lg:text-[2.9rem] text-[1.8rem] lg:mb-3 mb-2">
                <span className="font-thin">Get started with BuBe,</span>
                <span className="font-medium">Download App</span>
                </p>
                <p className="text-[#050931] lg:text-[1.5rem] text-[1.2rem] font-light">
                The latest news to drive business strategy
                </p>
            </div>
            <div className="lg:mt-12 lg:mb-[8rem] mt-4 mb-12">
                <div className="flex mx-auto w-[15rem]">
                <a href="#" className="w-[50%]">
                    <Image
                    src={appStore}
                    alt="app store"
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
    )
}