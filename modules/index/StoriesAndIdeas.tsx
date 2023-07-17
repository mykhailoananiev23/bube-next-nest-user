import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react";
import sImage1 from "../../public/images/s_image1.png";
import sImage2 from "../../public/images/s_image2.png";
import sImage3 from "../../public/images/s_image3.png";
import ApiService from "../../services/ApiService";
import { Blog } from "../../types/blogs";

const Story = ({img, alt, date, title, desc}:any) => (
    <div className="w-full rounded">
        <Image src={img} alt={alt} />
        <p className="text-[#8B939A] text-[1.2rem] font-light py-4">
            <FontAwesomeIcon
            icon={faCalendarDays}
            className="fa-solid fa-calendar-days mr-4"
            />
            {date}
        </p>
        <p className="text-[#050931] text-[1.3rem] font-medium leading-tight">
            {title}
        </p>
        <p className="text-[#8B939A] text-[0.9rem] font-light py-2">
            {desc}
        </p>
    </div>
)

export const StoriesAndIdeas = () => {
    const [blogs, setBlog] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchBlogs();
    }, []);
  
    const fetchBlogs = async () => {
        try {
        const url: string = `blogs?perpage=3`;
        const response = await ApiService.getData({ url });
        setBlog(response.data as Blog[]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    function formattedDate(date: string) {
        const format = new Date(date).getDate() + " " + new Date(date).toLocaleString('default', { month: 'long' }) + " " + new Date(date).getFullYear()
        return format;        
    }

    return (
        <div className="bg-[#FFF]">
            <div className="container py-20 mx-auto">
            <p className="text-[#050931] text-[2.8rem] font-thin text-center mb-10 max-[639px]:text-[30px] md:text-[40px]">
                Stories & <span className="font-medium">ideas</span>
            </p>
            <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-12 lg:grid lg:grid-cols-3 w-[80%]">
                    {blogs.map((blog) =>
                    (
                        <Story
                        key={blog.id}
                        img={sImage1}
                        alt="image"
                        title = {blog.title}
                        date= {formattedDate(blog.createdAt)}
                        desc={blog.description.split('.')[0] + '.'}
                    />
                    )  
                )}
                {/* <Story 
                    img={sImage2}
                    alt="image"
                    date="07 Aug 2021"
                    title="10 tips how to price your services and win customers!"
                    desc="The following tips will detail how to meet your business goals in pricing services and what factors.."
                />
                <Story 
                    img={sImage3}
                    alt="image"
                    date="14 april 2022"
                    title="10 tips how to price your services and win customers!"
                    desc="The following tips will detail how to meet your business goals in pricing services and what factors.."
                /> */}
            </div>
            </div>
        </div>
    )
}