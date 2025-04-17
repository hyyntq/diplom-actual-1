import React from "react";
import { getProductApi } from "@/services/product";
import ProductCard from "@/components/product/product-card";
import { ProductProps } from "@/lib/interface";

const Discount = async () => {
  const products: ProductProps[] = await getProductApi(4);
  return (
    <div className="py-20 container mx-auto flex flex-col gap-8">
      <span className="font-bold text-2xl">Discount up to -50%</span>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto container gap-4  rounded-xl`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Discount;
