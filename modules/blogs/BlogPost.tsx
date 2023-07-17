import { ArrowLongLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { BlogPostInterface } from "../../interface";

export const BlogPost = (props:any) => {
    const {blog} = props;
    const {category, title, author, date, content} = blog as BlogPostInterface;
    return (
        <div className="bg-[#F6F7FB]">
            <Link href="/blogs" className="cursor-pointer">
                <div className="flex text-center text-[#0071BC]  ml-20 text-2xl pt-4">
                    <ArrowLongLeftIcon
                    className="h-6 w-6 mt-1 mr-3 cursor-pointer"
                    aria-hidden="true"
                    />
                    <span className="cursor-pointer">Back</span>
                </div>
            </Link>
            <section className="mt-12 mx-auto px-4 w-6/12 text-center ">
                <div className="mt-12 grid-cols-1 gap-x-10 ">
                    <article
                        className=" mx-auto mt-4  rounded-md duration-300 hover:shadow-sm pb-12"
                        key={1}
                    >
                        <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                            <div className="rounded-full bg-[#0071bc26] flex-col my-3  text-base mx-auto">
                                <p className=" text-[#0071BC] uppercase mx-4 my-2">
                                    {/* {category} */}
                                </p>
                            </div>
                        </div>
                        <h3 className="text-4xl text-[#050931] font-bold capitalize mt-6 leading-16 tracking-wider">
                            {title}
                        </h3>
                        <div className="flex justify-center	text-[#363636] my-5">
                            <h5>{`By ${author}`}</h5>
                            <div className="border-l-2 border-l-[#363636] mx-2"></div>
                            <h5>{date}</h5>
                        </div>
                        <main className="text-justify" dangerouslySetInnerHTML={{__html: content}}>
                            {/* Convert Grey Matter for MD to HTML and insert Here */}
                        </main>
                    </article>
                </div>
            </section>
        </div>
    )
}