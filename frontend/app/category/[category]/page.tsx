"use client";
import { ProductProps } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import { getProductApi } from "@/services/product";
import Filters from "@/components/product/filters";
import ProductCard from "@/components/product/product-card";
import Pagination from "@/components/ui/Pagination";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const Iphone = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);


  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const products: ProductProps[] = await getProductApi(0, category as string);
      setLoading(false);
      setProducts(products);
    };
    getProducts();
  }, [category]);

  useEffect(() => {

    
    // Применение сортировки
    switch (sortBy) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    // Обновляем отфильтрованные продукты
    setFilteredProducts(filteredProducts);
  }, [sortBy, products, setFilteredProducts, filteredProducts]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFiltersOpen(false);
      }
    };
    if (isFiltersOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFiltersOpen]);



  useEffect(() => {
    if (isFiltersOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isFiltersOpen]);

  const ITEMS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  if (loading)
    return (
      <div className="text-center text-6xl text-stone-800 font-bold">
        Loading, please wait...
      </div>
    );
  return (
    <div className="flex flex-col md:flex-row gap-10 ">

      <div
        className={`${
          isFiltersOpen
            ? "fixed inset-0 z-50 bg-white flex flex-col p-3 gap-5 md:hidden"
            : "hidden"
        } md:w-full md:max-w-1/4`}
      >
        <div
          className="md:inset-0 absolute"
          onClick={() => setIsFiltersOpen(false)}
        >

        </div>
        <div className="flex flex-col p-3 gap-5">
          <div className="md:hidden flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="text-2xl"
            >
              ✕
            </button>
          </div>
          <Filters
            products={products}
            onFilterChange={setFilteredProducts}
            setFilters={() => setIsFiltersOpen(false)}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <Filters
          products={products}
          onFilterChange={setFilteredProducts}
          setFilters={() => setIsFiltersOpen(false)}
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-10">
          <div className="md:hidden mb-4 w-full ">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full py-3 px-2 text-stone-800 border border-stone-800 rounded font-semibold flex gap-3 items-center justify-between"
            >
              <p>Filters</p>
              <FontAwesomeIcon icon={faSliders} className="text-2xl" />
            </button>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center md:justify-between justify-end">
              <span className="md:block hidden">Selected products: </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded py-3 px-2 w-full md:w-[185px]"
              >
                <option value="default">By default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="">
          {filteredProducts.length <= 0 ? (
            <div className="flex items-center min-h-[70vh] justify-center">
              <span className="text-stone-800 text-9xl">Products None</span>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto container gap-4  rounded-xl`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-auto">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Iphone;
