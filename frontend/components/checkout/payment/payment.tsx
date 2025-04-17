
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { addressProps, ProductProps } from "@/lib/interface";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCart } from "@/lib/context/cart-context";

export default function Payment() {
  // Состояние для данных оплаты
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expDate: "",
    cvv: "",
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Состояние для данных из localStorage
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);
  const [address, setAddress] = useState<addressProps | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const {clearCart} = useCart()

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    // Загружаем товары
    const savedCartItems = localStorage.getItem("cart");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    // Загружаем адрес
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      const parsedAddresses = JSON.parse(savedAddresses);
      if (parsedAddresses.length > 0) {
        setAddress(parsedAddresses[0]); // Берём первый адрес
      }
    }

    // Загружаем метод доставки и дату
    const savedMethod = localStorage.getItem("shippingMethod");
    const savedDate = localStorage.getItem("deliveryDate");
    if (savedMethod) setShippingMethod(savedMethod);
    if (savedDate) setDeliveryDate(savedDate);

    // Загружаем данные оплаты
    const savedPaymentMethod = localStorage.getItem("paymentMethod");
    const savedCardDetails = localStorage.getItem("cardDetails");
    const savedSameAsBilling = localStorage.getItem("sameAsBilling");
    if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod);
    if (savedCardDetails) setCardDetails(JSON.parse(savedCardDetails));
    if (savedSameAsBilling) setSameAsBilling(JSON.parse(savedSameAsBilling));
  }, []);

  // Сохранение данных оплаты в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("paymentMethod", paymentMethod);
    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
    localStorage.setItem("sameAsBilling", JSON.stringify(sameAsBilling));
  }, [paymentMethod, cardDetails, sameAsBilling]);

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  // Обработка ввода номера карты (только цифры, формат групп по 4)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, ""); // Удаляем всё, кроме цифр
    if (cleaned.length > 16) return; // Ограничиваем до 16 цифр
    const groups = cleaned.match(/.{1,4}/g);
    const formatted = groups ? groups.join(" ") : cleaned;
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  // Обработка ввода имени держателя (только буквы и пробелы)
  const handleCardholderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^a-zA-Z\s]/g, ""); // Удаляем всё, кроме букв и пробелов
    setCardDetails({ ...cardDetails, cardholderName: cleaned });
  };

  // Обработка ввода даты истечения (формат MM/YY)
  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, ""); // Удаляем всё, кроме цифр
    if (cleaned.length > 4) return; // Ограничиваем до 4 цифр (MMYY)
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    setCardDetails({ ...cardDetails, expDate: formatted });
  };

  // Обработка ввода CVV (только цифры, максимум 3 цифры)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, ""); // Удаляем всё, кроме цифр
    if (cleaned.length > 3) return; // Ограничиваем до 3 цифр
    setCardDetails({ ...cardDetails, cvv: cleaned });
  };

  const handleSameAsBillingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSameAsBilling(e.target.checked);
  };

  const handlePay = () => {
    if (paymentMethod === "creditCard") {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardholderName ||
        !cardDetails.expDate ||
        !cardDetails.cvv
      ) {
        alert("Please fill in all card details");
        return;
      }
      // Дополнительная валидация
      const cleanedCardNumber = cardDetails.cardNumber.replace(/\s/g, "");
      if (cleanedCardNumber.length !== 16) {
        alert("Card number must be 16 digits");
        return;
      }
      if (cardDetails.cvv.length !== 3) {
        alert("CVV must be 3 digits");
        return;
      }
      const [month, year] = cardDetails.expDate.split("/");
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        alert("Invalid month in expiration date");
        return;
      }
      const currentYear = new Date().getFullYear() % 100; // Последние 2 цифры года
      if (parseInt(year) < currentYear) {
        alert("Card has expired");
        return;
      }
    }
    // Очищаем localStorage
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("deliveryDate");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("cardDetails");
    localStorage.removeItem("sameAsBilling");

    redirect("/order-confirmation");
  };

  // Рассчитываем итоговую стоимость
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const estimatedTax = 50; // Фиксированный налог
  const shippingCost =
    shippingMethod === "free" ? 0 : shippingMethod === "express" ? 50 : 10;
  const total = subtotal + estimatedTax + shippingCost;

  // Форматируем номер карты для отображения (группы по 4 цифры)
  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, ""); // Удаляем всё, кроме цифр
    const groups = cleaned.match(/.{1,4}/g); // Делим на группы по 4
    return groups ? groups.join(" ") : cleaned;
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Секция Summary (слева) */}
      <div className="flex-1 hidden md:flex md:flex-col">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        {/* Список товаров */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600">No items in cart.</p>
        ) : (
          <div className="space-y-4 max-h-[570px] overflow-y-auto pr-3">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="w-16 h-16 object-contain rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Адрес доставки */}
        <div className="mt-6">
          <p className="text-gray-600">
            {address
              ? `${address.address}, ${address.city}`
              : "No address selected"}
          </p>
        </div>

        {/* Метод доставки */}
        <div className="mt-2">
          <p className="text-gray-600">
            Shipment method:{" "}
            {shippingMethod === "free"
              ? "Free"
              : shippingMethod === "express"
              ? "$50"
              : "Schedule"}
            {shippingMethod === "schedule" && deliveryDate && (
              <span>
                {" "}
                (
                {new Date(deliveryDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                )
              </span>
            )}
          </p>
        </div>

        {/* Итоговая стоимость */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Tax</span>
            <span>${estimatedTax}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated shipping & Handling</span>
            <span>${shippingCost}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Секция Payment (справа) */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>

        {/* Выбор метода оплаты */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
              className="h-5 w-5"
            />
            <span>Credit Card</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
              className="h-5 w-5"
            />
            <span>PayPal</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="paypalCredit"
              checked={paymentMethod === "paypalCredit"}
              onChange={handlePaymentMethodChange}
              className="h-5 w-5"
            />
            <span>PayPal Credit</span>
          </label>
        </div>

        {/* Изображение карты и форма для данных карты (если выбран Credit Card) */}
        {paymentMethod === "creditCard" && (
          <div className="space-y-4">
            {/* Изображение карты */}
            <div className="relative w-full h-48 bg-gray-800 rounded-lg text-white p-4">
              {/* Чип карты */}
              <div className="absolute top-4 left-4 w-12 h-8 bg-gray-600 rounded"></div>
              {/* Номер карты */}
              <div className="absolute bottom-12 left-4 text-xl font-mono">
                {formatCardNumber(cardDetails.cardNumber) ||
                  "4085 9556 8475 9930"}
              </div>
              {/* Имя держателя */}
              <div className="absolute bottom-6 left-4 text-sm">
                {cardDetails.cardholderName || "Cardholder Name"}
              </div>
              {/* Дата истечения */}
              <div className="absolute bottom-6 right-4 text-sm">
                {cardDetails.expDate || "MM/YY"}
              </div>
              {/* Логотип (имитация) */}
              <div className="absolute top-4 right-4 w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-xs">MC</span>
              </div>
            </div>

            {/* Форма для ввода данных карты */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                  placeholder="4085 9556 8475 9930"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={cardDetails.cardholderName}
                  onChange={handleCardholderNameChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                  placeholder="Cardholder Name"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Exp Date
                  </label>
                  <input
                    type="text"
                    name="expDate"
                    value={cardDetails.expDate}
                    onChange={handleExpDateChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCvvChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Чекбокс "Same as billing address" */}
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={handleSameAsBillingChange}
              className="h-5 w-5"
            />
            <span>Same as billing address</span>
          </label>
        </div>

        {/* Кнопки навигации */}
        <div className="flex justify-between mt-6">
          <Link href="/checkout/shipping-method">
            <button className="px-6 py-2 border border-gray-300 rounded text-gray-800 font-semibold">
              Back
            </button>
          </Link>
          <button
            onClick={handlePay}
            className="px-6 py-2 bg-gray-800 text-white rounded font-semibold"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
