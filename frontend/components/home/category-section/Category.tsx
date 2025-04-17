import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { category } from "@/data/category";

const Category = () => {
  const categories = category

  return (
    <div className="bg-gray-200 py-20">
      <div className="flex flex-col container mx-auto gap-8">
        <div className="flex">
          <Link href='/category'>
            <h1 className="text-3xl font-medium">Browse By Category</h1>
          </Link>
          <div className="flex gap-5 items-center ml-auto text-2xl">
            <Link href="/">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <Link href="/category">
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>

        <div className="grid  lg:grid-cols-6 grid-cols-2 md:grid-cols-3 text-stone-800 md:gap-12 gap-4 ">
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
    </div>
  );
};

export default Category;
