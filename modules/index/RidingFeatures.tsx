import Image from "next/image";
import yellowCar from "../../public/images/yellow_car.png";
import priceTag from "../../public/images/price_tag.png";
import fingP from "../../public/images/fing_p.png";

const RidingFeature = ({img, alt, title, desc}:any) => (
    <div className="w-full text-center">
        <div className="bg-white w-[10rem] h-[10rem] m-auto text-center relative rounded-3xl">
            <div className="w-[40%] m-0 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Image src={img} alt={alt} />
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

export const RidingFeatures = () => {
    return (
        <div className="bg-[#F8F8F8]">
            <div className="container py-20 mx-auto">
                <p className="text-[#050931] text-[2.8rem] font-thin text-center mb-10 max-[639px]:text-[30px] md:text-[40px]">
                    Our <span className="font-medium">Riding Features</span>
                </p>
                <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-12 lg:grid lg:grid-cols-3 w-[80%]">
                    <RidingFeature
                        img={yellowCar}
                        alt="Yellow Car"
                        title="Get A Ride"
                        desc="There are many variations of passages of Lorem Ipsum available"
                    />
                    <RidingFeature
                        img={priceTag}
                        alt="Price Tag"
                        title="The Best Price"
                        desc="There are many variations of passages of Lorem Ipsum available"
                    />
                    <RidingFeature
                        img={fingP}
                        alt="Hand"
                        title="Easy To Use"
                        desc="There are many variations of passages of Lorem Ipsum available"
                    />
                </div>
            </div>
        </div>
    )
}