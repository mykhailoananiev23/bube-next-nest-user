import { useEffect, useState } from "react";
import { categoriesMain } from "../../hooks/data";
import ApiService from "../../services/ApiService";
import { Category } from "../../types/category";
import Link from "next/link";

export const CategoriesMenu = () => {
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await ApiService.getData({ url: `categories/fetch` });
      setCategories(response.data);
      setSubcategories(response.data[0].subCategories);
    }
    fetchCategories();
  }, []);

  const handleCategoryHover = (categoryId: number) => {
    setSubcategories(categories[categoryId].subCategories);
  };

  const [SubMenu, setSubMenu] = useState(false);

  const handler = (e: any) => {
    if (e.target.id === "subCategoryMenu") setSubMenu(false);
  };

  return (
    <>
      <nav className="bg-white overflow-x-auto horizontal-scroll px-4 border-t-[1px] z-[2] border-neutral-300">
        <ul className="mx-auto gap-12 flex  w-full min-w-[80rem] max-w-7xl lg:max-w-[95rem] py-4 px-8">
          {categories.map((category: Category, idx: number) => (
            <div
              className="min-w-fit h-full p-2 relative"
              key={idx}
              onClick={() => {
                setSubMenu(true);
                handleCategoryHover(idx);
              }}
            >
              <li className="font-semibold text-neutral-600 cursor-pointer hover:text-black text-sm">
                {category.name}
              </li>
            </div>
          ))}
        </ul>
      </nav>
      {SubMenu && (
        <div
          className="fixed h-full-screen w-full z-[1] top-0"
          id="subCategoryMenu"
          onClick={(e: any) => handler(e)}
        >
          <div className="z-[2] top-[165px] w-full absolute bg-white grid grid-cols-1 text-center sm:text-left md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
            {subcategories.map((ele: any, idx) => (
              <div
              key={idx}
                className="p-2"
                onClick={() => {
                  setSubMenu(false);
                }}
              >
                {ele.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <nav className="bg-white overflow-x-auto horizontal-scroll px-4 border-t-[1px] border-neutral-300">
        <ul className="mx-auto gap-12 flex w-full min-w-[80rem] max-w-7xl lg:max-w-[95rem] py-4 px-8">
          {subcategories.length > 0 &&
            subcategories.map((subCategory: any) => (
              <div
                key={subCategory.id}
                className="min-w-fit h-full p-2 relative"
              >
                <li className="font-semibold text-neutral-600 cursor-pointer hover:text-black text-sm">
                  {subCategory.name}
                </li>
              </div>
            ))}
        </ul>
      </nav> */}
    </>
  );
};
