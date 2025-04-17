import { CartListProps } from "@/lib/interface";
import { useCart } from "../../lib/context/cart-context";
import { CartItems } from "./cart-item";

export const CartList = ({ updateQuantity, removeFromCart }: CartListProps) => {
  const { cart } = useCart();

  return (
    <div
      className="flex flex-col gap-3 lg:max-h-[570px] max-h-[420px] overflow-y-auto pr-3"
      style={{
        scrollbarColor: "#78716C #F3F4F6",
      }}
    >
      {cart.map((item) => (
        <CartItems
          key={item.id}
          product={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};
