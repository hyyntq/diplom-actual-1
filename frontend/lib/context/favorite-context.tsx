"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useUser } from "./user-context";
import { ProductProps } from "../interface";

interface FavoriteContextType {
  favorites: ProductProps[]; // Теперь храним полные объекты ProductProps
  addToFavorites: (product: ProductProps) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<ProductProps[]>([]);

  // Инициализация favorites из localStorage при входе пользователя
  useEffect(() => {
    if (user?.ok) {
      const storedFavorites = localStorage.getItem(`favorites`);
      let parsedFavorites: ProductProps[] = [];
      try {
        const data = storedFavorites ? JSON.parse(storedFavorites) : null;
        if (Array.isArray(data)) {
          parsedFavorites = data;
        }
      } catch (error) {
        console.warn(
          "Invalid favorites data in localStorage, resetting:",
          error
        );
      }
      setFavorites(parsedFavorites);
    } else {
      setFavorites([]); // Очистка избранного при отсутствии авторизации
    }
  }, [user?.ok]);
  // Сохранение favorites в localStorage при изменении
  useEffect(() => {
    if (user?.ok) {
      localStorage.setItem(`favorites`, JSON.stringify(favorites));
    }
  }, [favorites, user?.ok]);

  // Очистка favorites при логауте
  useEffect(() => {
    const handleLogout = () => {
      if (!user?.ok) {
        setFavorites([]);
        localStorage.removeItem(`favorites`);
      }
    };
    handleLogout();
  }, [user?.ok]);

  const addToFavorites = (product: ProductProps) => {
    if (!user) {
      toast("Please log in to add to favorites!", {
        action: {
          label: "Login",
          onClick: () => redirect("/login"),
        },
      });
      return;
    }
    setFavorites((prev) => [...prev, product]);
    toast("Added to favorites");
  };

  const removeFromFavorites = (productId: number) => {
    if (!user) {
      toast("Please log in to remove from favorites!", {
        action: {
          label: "Login",
          onClick: () => redirect("/login"),
        },
      });
      return;
    }
    setFavorites((prev) => prev.filter((product) => product.id !== productId));
    toast("Removed from favorites");
  };

  // Проверка, является ли продукт любимым
  const isFavorite = (productId: number) => {
    return favorites.some((product) => product.id === productId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorite must be used within a FavoriteProvider");
  return context;
};
