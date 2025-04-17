"use client"
import { ProductProps } from "@/lib/interface";
import React, { useEffect, useState } from "react";

interface FiltersProps {
  products: ProductProps[];
  onFilterChange: (filteredProducts: ProductProps[]) => void;
  setFilters: () => void
}

const Filters = ({ products, onFilterChange, setFilters }: FiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(true);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(true);

  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));
    
  const allBrands = Array.from(new Set(products.map((product) => product.brand)))
  
  const brandCounts = allBrands.reduce((acc, brand) => {
    acc[brand] = products.filter((product) => product.brand === brand).length;
    return acc;
  }, {} as Record<string, number>);


  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  useEffect(() => {
    let filtered = products;

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((products) =>
        selectedBrands.includes(products.brand)
      );
    }

    onFilterChange(filtered);
  }, [priceRange, selectedBrands, products, onFilterChange]);



  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = Number(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;

    if (index === 0 && newValue > priceRange[1]) {
      newRange[1] = newValue;
    } else if (index === 1 && newValue < priceRange[0]) {
      newRange[0] = newValue;
    }

    setPriceRange(newRange);
  };



  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilter = () => {
    setSelectedBrands([])
    setBrandSearch("")
    setPriceRange([minPrice, maxPrice])
  }

  return (
    <div className="flex flex-col gap-5 sticky md:top-[25%] md:self-start">
    
      <div className="  rounded-xl  flex flex-col gap-5">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex justify-between items-center w-full text-lg font-semibold  cursor-pointer"
        >
          <span className="text-2xl font-medium">Price</span>
          <span>{isPriceOpen ? "▲" : "▼"}</span>
        </button>
        {isPriceOpen && (
          <div className="flex flex-col  gap-5 ">
            <div className="flex flex-col gap-3">
              <label className="font-medium text-lg ">From</label>
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full p-2 border rounded"
                  min={minPrice}
                  max={maxPrice}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-medium text-lg">To</label>
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full p-2 border rounded"
                  min={minPrice}
                  max={maxPrice}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer "
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className=" ">
        <button
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className="flex justify-between items-center w-full text-lg font-semibold mb-2 cursor-pointer"
        >
          <span className="text-2xl font-medium">Brand</span>
          <span>{isBrandOpen ? "▲" : "▼"}</span>
        </button>
        {isBrandOpen && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="max-h-40 overflow-y-auto px-1">
              {filteredBrands.map((brand) => (
                <div key={brand} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="mr-2"
                  />
                  <span>
                    {brand} ({brandCounts[brand]})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full gap-8">
        <button
          onClick={() => resetFilter()}
          className=" cursor-pointer px-4 py-4 border-2 border-stone-800 rounded-full text-stone-800 text-xl font-medium uppercase hover:bg-stone-800 hover:text-gray-200 transition duration-300 w-full"
        >
          Reset
        </button>
        <button className=" md:hidden cursor-pointer px-4 py-4 border-2 bg-stone-800 rounded-full text-gray-200 text-xl font-medium uppercase hover:bg-stone-800 hover:text-gray-200 transition duration-300 w-full"
          onClick={() => setFilters()}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;
