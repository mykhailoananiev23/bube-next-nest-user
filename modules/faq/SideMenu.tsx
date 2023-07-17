import { useState } from "react";
import { MenuProp } from "../../interface";
import notify from "../../utils/toast";

export const SideMenu = ({onCategoryFilterChange, categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("general");

  const handleClick = (title: string) => {
    setActiveCategory(title);
    onCategoryFilterChange(title)
  };

  return (
    <div className="bg-white rounded-3xl h-max mx-auto w-full md:w-3/12 mt-12">
      {categories.map(({ id, title }: MenuProp) => (
        <div
          key={id}
          className={`border-b last:border-b-0 text-center ${
            activeCategory === title ?  "text-primary" : "text-[#8B939A]"
          }`}
          onClick={() => handleClick(title)}
        >
          <h1 className="p-4 font-black capitalize cursor-pointer">{title}</h1>
        </div>
      ))}
    </div>
  );
};
