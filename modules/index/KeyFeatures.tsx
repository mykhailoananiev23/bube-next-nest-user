import Image from "next/image";
import fingP2 from "../../public/images/fing_p2.png";
import searchIcon from "../../public/images/search_icon.png";
import verified from "../../public/images/verified.png";

const KeyFeature = ({img, title, desc}:any) => (
  <div className="w-full text-center">
    <div className="bg-[#EDFAFE] w-[10rem] h-[10rem] m-auto text-center relative rounded-3xl rotate-45">
      <div className="w-[40%] m-0 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <Image src={img} alt="illustration" />
      </div>
    </div>
    <div className="h-[13rem] relative mt-4 px-8">
      <p className="text-[#050931] text-[1.3rem] pt-6 mb-2 font-medium">
        {title}
      </p>
      <p className="text-[#8B939A] text-[1rem]">
        {desc}
      </p>
    </div>
  </div>
)

export const KeyFeatures = () => {
    return (
        <div className="bg-white">
        <div className="container py-20 mx-auto">
          <p className="text-[#050931] text-[1.1rem] font-thin text-center">
            Key Features
          </p>
          <p className="text-[#050931] text-[2.8rem] font-thin text-center mb-10 max-[639px]:text-[30px]">
            Modern Way <span className="font-medium">Of Hiring</span>
          </p>
          <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-12 lg:grid lg:grid-cols-3 w-[80%]">
            <KeyFeature 
              img={fingP2}
              title="Easy To Use"
              desc="There are many variations of passages of Lorem Ipsum available"
            />
            <KeyFeature 
              img={searchIcon}
              title="Market Place Matching"
              desc="There are many variations of passages of Lorem Ipsum available"
            />
            <KeyFeature 
              img={verified}
              title="Verified Artisans"
              desc="There are many variations of passages of Lorem Ipsum available"
            />
          </div>
        </div>
      </div>
    )
}