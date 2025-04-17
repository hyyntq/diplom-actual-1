"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartContextType, CartItem, ProductProps } from "@/lib/interface";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useUser } from "./user-context";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (user?.ok) {
      const storedCart = localStorage.getItem(`cart`);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    } else {
      setCart([]); 
    }
  }, [user?.ok]);

  useEffect(() => {
    if (user?.ok) {
      localStorage.setItem(`cart`, JSON.stringify(cart));
    }
  }, [user?.ok, cart]);


  useEffect(() => {
    const handleLogout = () => {
      if (!user?.ok) {
        setCart([]);
        localStorage.removeItem(`cart`);
      }
    };
    handleLogout();
  }, [user?.ok]);

  const addToCart = (product: ProductProps) => {
    if (!user) {
      return toast(`Please Register`, {
        action: {
          label: "reg",
          onClick: () => console.log("ok"),
        },
      });
    }
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast(`${product.title} added to card`, {
      action: {
        label: "Cart",
        onClick: () => redirect("/cart"),
      },
    });
  };

  const clearCart = () => {
    setCart([]);
    if (user?.ok) {
      localStorage.removeItem(`cart_${user.id}`);
    }
    toast("Cart cleared successfully!");
  };

  const removeFromCart = (product: ProductProps) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));

    toast(`${product.title} remove card`, {
      action: {
        label: "Ok",
        onClick: () => console.log("undo"),
      },
    });
  };

  const updateQuantity = (product: ProductProps, quantity: number) => {
    if (quantity < 1) return removeFromCart(product);
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        setCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
