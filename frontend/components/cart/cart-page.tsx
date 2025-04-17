"use client";

import Link from "next/link";
import { useCart } from "../../lib/context/cart-context";
import { CartList } from "./cart-list";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  const tax = 15.0;
  const shipping = 49.84;
  const subtotal = getTotal();
  const total = subtotal + tax + shipping;

  const formatPrice = (value: number) => value.toFixed(2);

  // Форматируем значения
  const formattedSubtotal = formatPrice(subtotal);
  const formattedTax = formatPrice(tax);
  const formattedShipping = formatPrice(shipping);
  const formattedTotal = formatPrice(total);

  return (
    <div className="flex flex-col lg:flex-row py-18 gap-12 px-4">
      <div className="flex flex-col w-full gap-10">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            <CartList
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full px-8 py-14 gap-10">
        <h1 className="font-bold text-2xl">Order Summary</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="code">Discount code / Promo code</label>
            <div className="flex gap-3">
              <input
                id="code"
                type="text"
                placeholder="Code"
                className="p-3 grow outline outline-stone-400 rounded focus:bg-stone-400 transition duration-300"
              />
              <button className="bg-stone-800 text-gray-200 rounded px-3 font-medium cursor-pointer hover:opacity-85 transition duration-300">
                Apply
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="bonus" className="">
              Your bonus card number
            </label>
            <div className="flex gap-3">
              <input
                id="bonus"
                type="text"
                placeholder="EnterCard"
                className="p-3 grow outline outline-stone-400 rounded focus:bg-stone-400 transition duration-300 "
              />
              <button className="bg-stone-800 text-gray-200 rounded px-3 font-medium cursor-pointer hover:opacity-85 transition duration-300">
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 ">
          <div className="flex flex-col gap-6 ">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Subtotal</h1>
              <p className="text-xl font-bold">${formattedSubtotal}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Estimated Tax</h1>
                <p className="text-lg">${formattedTax}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Estimated shipping & Handling</h1>
                <p className="text-lg">${formattedShipping}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Total</h1>
              <p className="text-xl font-bold">${formattedTotal}</p>
            </div>
          </div>
        </div>
        <Link
          href="/checkout/address"
          className="py-4 text-center rounded bg-stone-800 text-gray-200 cursor-pointer text-xl hover:opacity-85 transition duration-300"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
