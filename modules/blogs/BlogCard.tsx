import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import blogImg from '../../public/images/blogs/blog (1).png'

export const BlogCard = ({id, img, alt, category, title, desc}:any) => {
    return (
        <article className="max-w-md mx-auto mt-4   rounded-md duration-300 hover:shadow-sm">
            <Image
                src={blogImg}
                loading="lazy"
                alt={alt}
                className="w-full h-auto"
            />
            <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="rounded-full bg-[#0071bc26] flex-col my-3  text-base">
                    <p className=" text-[#0071BC] uppercase mx-4 my-2">
                        {/* {category} */}
                    </p>
                </div>
            </div>
            <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-[#050931]">
                    {title}
                </h3>
                <p className="text-[#8B939A] text-sm mt-1 mb-6  overflow-hidden  leading-7 h-20">
                    {desc}
                </p>
                <Link href={{ pathname: "/blogs/blog", query: { id }}} className="flex text-center text-[#0071BC]">
                    <div className="flex items-center">
                        <span className="cursor-pointer">More Info</span>
                        <ArrowLongRightIcon
                            className="h-6 w-6 mt-1 ml-4 inline cursor-pointer"
                            aria-hidden="true"
                        />
                    </div>
                </Link>
            </div>
        </article>
    )
}