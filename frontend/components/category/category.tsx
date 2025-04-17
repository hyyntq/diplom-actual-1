import { category } from "@/data/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Category = () => {
  const categories = category;
  return (
    <div>
      <div className="grid  lg:grid-cols-3 grid-cols-2 md:grid-cols-3 text-stone-800 md:gap-12 gap-4 ">
        {categories.map((category) => (
          <div
            className=" py-6  rounded-xl hover:bg-stone-800 hover:text-gray-200 transition duration-300 cursor-pointer"
            key={category.name}
          >
            <Link
              href={`/category/${category.name}`}
              className="flex flex-col gap-1 justify-center items-center "
            >
              <FontAwesomeIcon icon={category.icon} className="text-4xl" />
              <h1 className="first-letter:uppercase font-medium">
                {category.name}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
