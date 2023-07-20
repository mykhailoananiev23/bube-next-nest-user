import { BlogSectionWithCategory } from "../../modules/blogs/BlogSectionWithCategory";
import { BlogPost } from "../../modules/blogs/BlogPost";
import { BlogPostInterface } from "../../interface";
import { NextPageWithLayout } from "../_app";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { ReactElement, useState } from "react";
import ApiService from "../../services/ApiService";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

const dummyBlogs = [
  {
    title:
      "Freelancers: how to raise your rates and ask for more money from clients",
    desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other. According to ...",
    blogtag:[{name: "freelancer tips",}]
  },
  {
    title:
      "Freelancers: how to raise your rates and ask for more money from clients",
    desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other. According to ...",
    blogtag:[{name: "freelancer tips",}]
  },
  {
    title:
      "Freelancers: how to raise your rates and ask for more money from clients",
    desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other. According to ...",
    blogtag:[{name: "freelancer tips",}]
  },
];

const Blog: NextPageWithLayout = () => {
  const router = useRouter();

  function formattedDate(date: string) {
    const format = new Date(date).getDate() + " " + new Date(date).toLocaleString('default', { month: 'long' }) + " " + new Date(date).getFullYear()
    return format;        
}

  const getData = async () => {
    const res = await ApiService.getData({
      url: `blogs/${router.query.id}`,
    });
    return res;
  };
  const { error, data } = useQuery(
    ["blog-fetch", router.query.id],
    () => getData(),
    {
      staleTime: 5000,
      enabled: !!router.query.id,
    }
  );
  return (
    <>
      {/* Dummy Blog */}
      <BlogPost
        blog={
          {
            title:data?.title,
            date: formattedDate(data?.createdAt),
            author: 'BuBe Team',
            // category: data?.blogtag[0].name,
            content:data?.description,
          }
        }
      />

      {/*<BlogSectionWithCategory category="Related Posts" blogs={dummyBlogs} />*/}
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Blog;
