"use client";

import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { category } from "@/data/category";

const SubNav = () => {
  const pathName = usePathname();
  const categories = category
  return (
    <div className="bg-stone-800 w-full p-4 hidden lg:flex">
      <div className="flex container mx-auto justify-between text-zinc-200">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.name}`}
            className={`subnav-link ${
              pathName === `/category/${category.name}`
                ? "subnav-link-active"
                : ""
            } `}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={category.icon} />
              <h1 className="first-letter:uppercase">{category.name}</h1>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubNav;
