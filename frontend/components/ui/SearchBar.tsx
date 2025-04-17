"use client";

import { searchAction} from "@/data/search-action";
import { ProductProps, SearchState } from "@/lib/interface";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const INITIAL_STATE: SearchState = {
  ZodError: null,
  results: [],
};

export function SearchForm() {
  const [state, action] = useActionState(searchAction, INITIAL_STATE);
  const [searchProduct, setSearchProduct] = useState<ProductProps[]>([]);

  useEffect(() => {
    setSearchProduct(state.results);
  }, [state]);

  

  return (
    <div className="">
      <form
        action={action}
        className="flex justify-center items-center w-full px-5 p-3 gap-3 bg-stone-800 rounded-3xl "
      >
        <div className=""></div>
        <label htmlFor="Search" className="cursor-pointer">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-2xl text-gray-200"
          />
        </label>
        <input
          type="text"
          name="query"
          placeholder="Поиск..."
          className="flex w-full flex-1 items-center  font-medium p-1 outline-none text-md bg-gray-200 rounded-3xl px-4"
        />
        {state.ZodError?.query &&
          toast(`${state.ZodError.query[0]}`, {
            action: {
              label: "ok",
              onClick: () => console.log("ok"),
            },
          })}
        <button className="bg-stone-400 text-white px-4 py-1 rounded-2xl cursor-pointer">
          search
        </button>
      </form>

      {searchProduct.length > 0 && (
        <div className="grid place-items-center">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setSearchProduct([])}
          ></div>
          <div
            className="fixed md:top-25 top-50 md:mx-auto md:left-[25%] md:w-full md:md:max-w-1/2  shadow-xl z-50 p-6 transition-all flex flex-col duration-300 rounded-2xl bg-gray-200"
            style={{
              scrollbarColor: "#78716C #F3F4F6",
            }}
          >
            <button
              className="block ml-auto absolute right-[-19px] top-[-19px]"
              onClick={() => setSearchProduct([])}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-2xl text-gray-200 bg-red-400 py-2 px-3 rounded-full"
              />
            </button>
            <div className="md:max-h-[740px] max-h-[580px] overflow-y-auto pr-3 ">
              {searchProduct.map((product: ProductProps) => (
                <div key={product.id} className="p-2 rounded">
                  <div className="p-4 flex items-center  bg-gray-200 rounded-xl p">
                    <div className="flex items-center gap-4 ">
                      <Link
                        href={`/category/${ 
                          product.category
                        }/${product.brand.toLowerCase()}/${generateSlug(
                          product.title
                        )}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
                        onClick={() => setSearchProduct([])}
                      >
                        <Image
                          src={
                            product.images[1]
                              ? product.images[1]
                              : product.images[0]
                          }
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between flex-1 gap-2">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold w-32 sm:w-40 truncate">
                          {product.title}
                        </h3>
                        <p className="text-stone-800 text-sm">#{product.sku}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-xl font-bold">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
