"use client";

import { ProductProps } from "@/lib/interface";
import {
  faHeartCirclePlus,
  faHeartCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { useFavorite } from "@/lib/context/favorite-context";

interface ProductCardProps {
  product: ProductProps;
  isInCartPage?: boolean;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();
  
  // Проверяем, является ли продукт любимым
  const favoriteStatus =
    typeof isFavorite === "function" ? isFavorite(product.id) : false;

  // Функция переключения статуса любимого продукта
  const toggleFavorite = useCallback(() => {
    if (!isFavorite) return; // Защита от undefined
    if (favoriteStatus) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }, [favoriteStatus, product, addToFavorites, removeFromFavorites, isFavorite]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="relative rounded-lg py-6 px-4 text-center  flex flex-col gap-4 bg-stone-300 ">
      <button
        className=" cursor-pointer ml-auto w-8 h-8"
        onClick={() => toggleFavorite()}
      >
        {favoriteStatus ? (
          <FontAwesomeIcon
            icon={faHeartCircleXmark}
            className="text-red-500 text-3xl"
          />
        ) : (
          <FontAwesomeIcon icon={faHeartCirclePlus} className="text-3xl" />
        )}
      </button>

      <Link
        href={`/category/${
          product.category
        }/${product.brand.toLowerCase()}/${generateSlug(product.title)}`}
      >
        <Image
          src={product.images[1]}
          alt={product.title}
          width={150}
          height={150}
          className="w-full h-56 object-contain mb-4 grow"
        />
      </Link>

      <div className="flex flex-col grow">
        <h3 className="text-lg font-medium text-stone-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-2xl font-bold text-stone-800 mb-4 ">
          {product.price} $
        </p>
      </div>

      <div className="flex items-center gap-2 justify-center mt-auto">
        {cartItem ? (
          <div className="px-14 py-4 flex gap-5 items-center ">
            <button
              onClick={() => updateQuantity(product, cartItem.quantity - 1)}
              className="px-3 py-1 border-2 text-stone-800 rounded cursor-pointer border-stone-800 hover:bg-stone-800 hover:text-gray-200 transition duration-300"
            >
              -
            </button>
            <span className="text-2xl font-semibold">{cartItem.quantity}</span>
            <button
              onClick={() => updateQuantity(product, cartItem.quantity + 1)}
              className="px-3 py-1  border-2 border-stone-800 text-stone-800 rounded cursor-pointer hover:bg-stone-800 hover:text-gray-200 transition duration-300"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              addToCart(product);
            }}
            className="btn-card"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
