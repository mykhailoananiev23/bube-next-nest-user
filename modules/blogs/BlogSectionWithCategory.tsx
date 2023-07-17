import { BlogCard } from "./BlogCard";
import testImg from "../../public/images/testimg.svg";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Blog } from "../../types/blogs";

interface BlogSectionWithCategorytype {
  blogs: Blog[];
  category: {
    id: number;
    name: string;
  };
}

export const BlogSectionWithCategory = ({
  blogs,
  category,
}: BlogSectionWithCategorytype) => {
  console.log(blogs, "blogs");
  console.log(category, "category");
  return (
    <section>
      <section className="mt-12 mx-auto cursor-pointer px-4 max-w-screen-xl  key={cat.id} lg:px-8 ">
        <Link
          href={{
            pathname: "/blogs/blog-category",
            query: { category: category?.id },
          }}
          className="flex"
        >
          <div className="flex items-center">
            <h1 className="capitalize text-5xl text-[#050931] flex">
              {category?.name}
            </h1>
            {category?.name ? (
              <ChevronRightIcon
                className="h-7 w-7 mt-4 ml-4"
                aria-hidden="true"
              />
            ) : null}
          </div>
        </Link>
      </section>
      <section className="mt-12 mx-auto px-4 max-w-screen-xl lg:px-8">
        <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog: any) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              img={testImg}
              alt="Blog Image"
            //   category={blog?.blogtag[0].name}
              title={blog.title}
              desc={blog.desc}
            />
          ))}
        </div>
      </section>
    </section>
  );
};
