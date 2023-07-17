import { ReactElement, useEffect, useState } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { BlogSectionWithCategory } from "../../modules/blogs/BlogSectionWithCategory";
import { Hero } from "../../modules/blogs/Hero";
import { NextPageWithLayout } from "../_app";
import { Blog } from "../../types/blogs";
import ApiService from "../../services/ApiService";

const Blogs: NextPageWithLayout = () => {
  const [blogs, setBlog] = useState<Blog[]>([]);
  const [blogCategoryData, setblogCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
    fetchBlogsCategory();
  }, []);

  const fetchBlogs = async () => {
    try {
      const url: string = `blogs?perpage=3&sort=desc`;
      const response = await ApiService.getData({ url });
      setBlog(response.data as Blog[]);
      setIsLoading(false);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBlogsCategory = async () => {
    try {
      const url: string = `blogcategory/blogdata/fetch`;
      const response = await ApiService.getData({ url });
      setblogCategoryData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Hero />
      <div>
        <BlogSectionWithCategory category={{ id: 1, name: "" }} blogs={blogs} />
        {blogCategoryData?.map((item: any) => (
          <BlogSectionWithCategory
            key={item.id}
            category={item}
            blogs={item.blogs.slice(0, 3)}
          />
        ))}
      </div>
    </>
  );
};

Blogs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Blogs;
