"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ProductProps } from "@/lib/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCheck,
  faMobile,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/lib/context/cart-context";
import ProductCard from "./product-card";
import { useFavorite } from "@/lib/context/favorite-context";

interface ProductPageClientProps {
  product: ProductProps ;
  recommendedProducts: ProductProps[];
}

export default function ProductPageClient({
  product,
  recommendedProducts,
}: ProductPageClientProps) {

  const { addToCart } = useCart();
  const {addToFavorites, isFavorite, removeFromFavorites} = useFavorite()

  const favoriteStatus = typeof isFavorite === "function" ? isFavorite(product.id) : false;

    const toggleFavorite = useCallback(() => {
      if (favoriteStatus) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }, [favoriteStatus, product, addToFavorites, removeFromFavorites]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
        <p className="text-gray-600">
          The product you are looking for does not exist. Please check the URL
          or try another product.
        </p>
      </div>
    );
  }

  const colors = [
    { name: "Space Black", hex: "#1C2526" },
    { name: "Purple", hex: "#A020F0" },
    { name: "Gold", hex: "#F4C430" },
    { name: "Deep Purple", hex: "#4B0082" },
  ];

  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage, setSelectedImage] = useState<string>(
    product.thumbnail || ""
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedColor, setSelectedColor] = useState<string>(colors[1].name);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedStorage, setSelectedStorage] = useState<string>("128GB");

  const specs = [
    { label: "Screen Size", value: '6.7"', icon: faMobile },
    { label: "CPU", value: "Apple A16 Bionic", icon: faMobile },
    { label: "Number of Cores", value: "6", icon: faMobile },
    { label: "Camera", value: "48MP + 12MP + 12MP", icon: faMobile },
    { label: "Battery", value: "4323 mAh", icon: faMobile },
    { label: "Memory", value: selectedStorage, icon: faMobile },
  ];

  const advantages = [
    { label: "Free Delivery", value: "1-2 day", icon: faCar },
    { label: "In Stock", value: "Today", icon: faStore },
    { label: "Guaranteed", value: "1 year", icon: faCheck },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  

  return (
    <div className="flex flex-col gap-1">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.title}`}
                    width={80}
                    height={80}
                    className={`object-cover cursor-pointer rounded border ${
                      selectedImage === image
                        ? "border-gray-800"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
              <div className="flex-1">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 gap-4 flex flex-col">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-5xl">{product.title}</h1>
              <p className="text-3xl font-semibold mb-4">${product.price}</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <h3 className="text-lg font-medium mb-2">Select Color:</h3>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color.name
                          ? "border-gray-800"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-4">
                  {storageOptions.map((storage) => (
                    <button
                      key={storage}
                      className={`w-26 py-4  rounded-xl font-medium cursor-pointer ${
                        selectedStorage === storage
                          ? "bg-stone-800 text-gray-200 "
                          : "border text-stone-800 border-stone-800"
                      }`}
                      onClick={() => setSelectedStorage(storage)}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full grid grid-cols-3 gap-10">
                {specs.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={spec.icon} className="text-2xl" />
                      <div className="flex flex-col leading-none gap-1">
                        <div className="font-medium">{spec.label}</div>
                        <div className="">{spec.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>{product.description}</div>
            </div>

            <div className="flex gap-4 my-8">
              
              <button
                onClick={() => toggleFavorite()}
                className="flex-1 py-5  text-stone-800 rounded-xl font-semibold cursor-pointer border border-stone-800 "
              >
                {favoriteStatus ? (
                  <span>Delete to Wishlist</span>
                ) : (
                  <span>Add to Wishlist</span>
                )}
              </button>
              <button
                className="flex-1 py-5 bg-stone-800 text-gray-200 rounded-xl font-semibold cursor-pointer"
                onClick={() => addToCart(product)}
              >
                Add to Card
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
              {advantages.map((items, index) => (
                <div
                  key={index}
                  className="flex px-3 py-3  gap-7 items-center bg-stone-800 text-gray-200 w-full rounded-xl justify-center"
                >
                  <FontAwesomeIcon
                    icon={items.icon}
                    className="text-3xl flex items-center justify-center"
                  />
                  <div className="flex flex-col">
                    <h1 className="opacity-80">{items.label}</h1>
                    <p>{items.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="gap-8 flex flex-col">
          <div>
            <p className="text-stone-800 px-3 text-lg">{product.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium  ">Specifications</h3>
            <div className="text-stone-800 flex flex-col gap-6 px-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex justify-between text-xl">
                  <h1 className="py-2 font-medium">{spec.label}</h1>
                  <p className="py-2">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-22">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-12">
            <div className="flex">
              <div className="flex flex-col items-center justify-center md:w-1/3">
                <span className="text-3xl font-bold">{product.rating}</span>
                <span className="ml-2 text-gray-600">
                  ({product.reviews.length} reviews)
                </span>
                <span className="ml-2 text-yellow-500">
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </span>
              </div>

              <div className="flex-1">
                {ratingDistribution.map((rating) => (
                  <div
                    key={rating.stars}
                    className="flex items-center gap-2 mb-2"
                  >
                    <span className="w-8">{rating.stars} ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-orange-400 rounded"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-gray-600">
                      {rating.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 py-6">Leave Comment</div>
          </div>

          <div>
            {product.reviews.map((review, index) => (
              <div key={index} className="flex py-6 px-4 ">
                <div className="flex gap-5 w-full">
                  <div className="w-12 h-12 rounded-full bg-purple-600"></div>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium text-xl">
                          {review.user}
                        </span>
                        <span className="text-yellow-500 text-xl">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>

                      <span className="text-gray-500 text-sm">
                        {review.date}
                      </span>
                    </div>

                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((recommended, index) => (
            <ProductCard product={recommended} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
