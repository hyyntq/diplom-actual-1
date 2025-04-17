"use client"
import React, { useEffect, useState } from "react";
import { getProductApi } from "@/services/product";
import ProductCard from "@/components/product/product-card";
import { ProductProps, ProductSectionProps } from "@/lib/interface";


const ProductSection = ({ initialCategory = "smartphones" }: ProductSectionProps) => {
  const [activeTab, setActiveTab] = useState<string>("new-arrival");
  const [products, setProducts] = useState<ProductProps[]>([]);

  const tabs = [
    { name: "New Arrival", id: "new-arrival", category: "smartphones" },
    { name: "Bestseller", id: "bestseller", category: "laptops" },
    { name: "Featured", id: "featured", category: "tablets" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const selectedTab = tabs.find((tab) => tab.id === activeTab);
      const category = selectedTab ? selectedTab.category : initialCategory;
      const fetchedProducts = await getProductApi(8, category); // Лимит 3 продукта
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, [activeTab, initialCategory]);

  return (
    <>
      <div className="container mx-auto py-14 flex flex-col gap-5">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-lg font-medium ${
                activeTab === tab.id
                  ? "active-product after:block after:h-[2px] after:translate-y-0.5 after:w-full after:bg-slate-800  hover:after:scale-x-100 font-medium"
                  : "passive-product opacity-60 font-medium hover:opacity-100 transition-all"
              } pb-2`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto container gap-4  rounded-xl`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductSection;
