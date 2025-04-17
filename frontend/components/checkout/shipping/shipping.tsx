"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Shipping() {
  const [shippingMethod, setShippingMethod] = useState<string>("free");
  const [deliveryDate, setDeliveryDate] = useState<string>("");

  // Загрузка данных из localStorage после монтирования
  useEffect(() => {
    const savedMethod = localStorage.getItem("shippingMethod");
    const savedDate = localStorage.getItem("deliveryDate");
    if (savedMethod) setShippingMethod(savedMethod);
    if (savedDate) setDeliveryDate(savedDate);
  }, []);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("shippingMethod", shippingMethod);
    localStorage.setItem("deliveryDate", deliveryDate);
  }, [shippingMethod, deliveryDate]);

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingMethod(e.target.value);
    if (e.target.value !== "schedule") {
      setDeliveryDate(""); // Сбрасываем дату, если выбран не "Schedule"
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDate(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Shipment Method</h2>

      <div className="space-y-4">
        {/* Метод доставки: Free */}
        <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
          <input
            type="radio"
            name="shippingMethod"
            value="free"
            checked={shippingMethod === "free"}
            onChange={handleMethodChange}
            className="h-5 w-5"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Free - Regular shipment</span>
              <span className="text-gray-600">17 Oct 2023</span>
            </div>
          </div>
        </div>

        {/* Метод доставки: $50 */}
        <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
          <input
            type="radio"
            name="shippingMethod"
            value="express"
            checked={shippingMethod === "express"}
            onChange={handleMethodChange}
            className="h-5 w-5"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                $50 - Get your delivery as soon as possible
              </span>
              <span className="text-gray-600">1 Oct 2023</span>
            </div>
          </div>
        </div>

        {/* Метод доставки: Schedule */}
        <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
          <input
            type="radio"
            name="shippingMethod"
            value="schedule"
            checked={shippingMethod === "schedule"}
            onChange={handleMethodChange}
            className="h-5 w-5"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                Schedule - Pick a date when you want to get the delivery
              </span>
              <span className="text-gray-600">
                {deliveryDate
                  ? new Date(deliveryDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select Date"}
              </span>
            </div>
            {shippingMethod === "schedule" && (
              <input
                type="date"
                value={deliveryDate}
                onChange={handleDateChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-600"
                min={new Date().toISOString().split("T")[0]} // Минимальная дата — сегодня
              />
            )}
          </div>
        </div>
      </div>

      {/* Кнопки навигации */}
      <div className="flex mt-6 justify-end gap-6">
        <Link href="/checkout/shipping">
          <button className="px-21 py-6 border border-stone-400 rounded text-stone-800 font-semibold cursor-pointer">
            Back
          </button>
        </Link>
        <Link href="/checkout/payment">
          <button className="px-21 py-6 bg-stone-800 text-gray-200 rounded font-semibold cursor-pointer">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
