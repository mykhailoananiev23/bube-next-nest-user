import React, { ReactElement, useEffect, useState } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { BlogSectionWithCategory } from "../../modules/blogs/BlogSectionWithCategory";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import MyPagination from "../../utils/pagination";
import { PAGE_CHANGED, initialState, reducer } from "../../utils/paginationHelper";

const BlogCategory: NextPageWithLayout = () => {
  const router = useRouter();
  const [blogCategoryData, setblogCategoryData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [{ queryPageIndex, queryPageSize }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  
  const getData = async (page: number ,fetchurl: string) => {
    const res = await ApiService.getData({
      url: fetchurl + `?category=${router.query.category}&page=${page}&perpage=6`,
    });
    return res;
  };
  const { error, data } = useQuery(
    ["blog-category-wise", router.query.category, queryPageIndex],
    () => getData(queryPageIndex,"blogs"),
    {
      enabled: !!router.query.category,
      keepPreviousData: false,
      onSuccess: (res) => setblogCategoryData(res.data),
    }
  );

  const handlePageChange = (page: any) => {
    console.log('change');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    dispatch({ type: PAGE_CHANGED, payload: page.selected + 1 });
  };

  return (
    <>
      <BlogSectionWithCategory
        key={blogCategoryData.id}
        category={blogCategoryData.blogcategory?.name}
        blogs={blogCategoryData}
      />
      <MyPagination
        pageCount={data?.last_page}
        handlePageChange={handlePageChange} />
    </>
  );
};

BlogCategory.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default BlogCategory;
