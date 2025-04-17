"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const crumbs = [
    { name: "Home", href: "/" },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      };
    }),
  ];

  return (
    <div className="flex flex-wrap gap-3 text-stone-700 text-xl font-semibold py-11 ">
      {crumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex gap-3">
          {index < crumbs.length - 1 ? (
            <>
              <Link
                href={crumb.href}
                className="hover:text-stone-800 transition"
              >
                {crumb.name}
              </Link>
              <span className="">{">"}</span>
            </>
          ) : (
            <span className="text-stone-800">{crumb.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
