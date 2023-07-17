import leafPic from "../../public/images/leaf_pic.png";
import ringPic from "../../public/images/ring_pic.png";
import brushPic from "../../public/images/brush_pic.png";
import mesh from "../../public/images/mesh.png";
import markerPic from "../../public/images/marker_pic.png";
import bellPic from "../../public/images/bell_pic.png";
import chairPic from "../../public/images/chair_pic.png";
import Image from "next/image";

const CategoryCard = ({img, alt, title, desc}:any) => (
  <div className="bg-white lg:w-[22rem] w-[80%] h-[18rem] rounded-xl overflow-hidden mx-auto mb-10 lg:mb-0">
    <div className="w-[4rem] h-auto ml-[3rem] mt-[3rem]">
      <Image src={img} alt={alt} />
    </div>
    <p className="text-[#050931] pt-[1rem] px-[3rem] text-[1.2rem] font-medium">
      {title}
    </p>
    <p className="text-[#8B939A] pt-[2%] pl-[3rem] text-[1rem]">
      {desc}
    </p>
  </div>
)

export const Explore = () => (
    <div className="bg-[#F6F7FB]">
        <div className="container px-4 mx-auto">
          <div className="pt-[6rem] mb-12">
            <h4 className="leading-none text-center lg:text-left">
              <span className="font-thin lg:text-[2.5rem] text-[2rem] max-[639px]:text-[30px] md:text-[40px]">
                Explore
              </span>
              <br />
              <span className="font-medium lg:text-[3rem] text-[2.5rem] max-[639px]:text-[30px] md:text-[40px]">
                By Category
              </span>
            </h4>
          </div>
          <div className="lg:flex lg:flex-row pb-10 lg:gap-10">
            <CategoryCard
             img={leafPic}
             alt="Leaf Pic"
             title="Gardening"
             desc="There are many variations of passages"
            />
            <CategoryCard
             img={ringPic}
             alt="Ring Pic"
             title="Tailoring"
             desc="There are many variations of passages"
            />
            <CategoryCard
             img={brushPic}
             alt="Brush Pic"
             title="Painting"
             desc="There are many variations of passages"
            />
            <div className="w-[24rem] h-[18rem] overflow-hidden mx-auto flex items-center max-lg:hidden">
              <Image src={mesh} objectFit="contain" alt="Mesh" />
            </div>
          </div>
          <div className="lg:flex lg:flex-row pb-10 lg:gap-10">
            <div className="w-[24rem] h-[18rem] overflow-hidden mx-auto flex items-center max-lg:hidden">
              <Image src={mesh} objectFit="contain" alt="Mesh" />
            </div>
            <CategoryCard 
              img={markerPic}
              alt="Marker Pic"
              title="Graphics & Design"
              desc="There are many variations of passages"
            />
            <CategoryCard 
              img={bellPic}
              alt="Bell Pic"
              title="Digital Marketing"
              desc="There are many variations of passages"
            />
            <CategoryCard 
              img={chairPic}
              alt="Chair Pic"
              title="Furniture"
              desc="There are many variations of passages"
            />
          </div>
        </div>
      </div>
)