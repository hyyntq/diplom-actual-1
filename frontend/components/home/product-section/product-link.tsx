
"use client";
import Link from "next/link";
import React from "react";

const ProductLink = () => {
  return (
    <div className="flex gap-8">
      <Link
        href="/products?tab=new-arrivals"
        className="active-product after:block after:h-[2px] after:translate-y-0.5 after:w-full after:bg-slate-800  hover:after:scale-x-100 font-medium"
      >
        <span>New Arrivals</span>
      </Link>
      <Link
        href="/products?tab=bestseller"
        className="passive-product opacity-60 font-medium hover:opacity-100 transition-all"
      >
        <span>Bestseller</span>
      </Link>
      <Link
        href="/products?tab=featured-products"
        className="opacity-60 font-medium hover:opacity-100 transition-all"
      >
        <span>Featured Products</span>
      </Link>
    </div>
  );
};

export default ProductLink;
