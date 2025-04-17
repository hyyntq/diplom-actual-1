"use client";

import React from "react";
import { useFavorite } from "@/lib/context/favorite-context";
import ProductCard from "../product/product-card";

// Мок продуктов (замени на реальные данные, если есть)

export default function Favorites() {
  const { favorites } = useFavorite();

  // Имитация загрузки (можно убрать, если не нужно)

  return (
    <div className="container mx-auto py-11 flex flex-col gap-8">
      <span className="font-bold text-3xl text-center">FAVORITE PRODUCTS</span>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites
            .map((favorite, index) => (
              <div key={index}>
                <ProductCard product={favorite} />
              </div>
            ))
            .reverse()}
        </div>
      ) : (
        <p className="bg-stone-800 p-8 text-zinc-300 text-4xl text-center rounded-full font-bold">
          You have no favorite products yet.
        </p>
      )}
    </div>
  );
}
