"use client";

import { addressProps } from "@/lib/interface";
import { faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Address() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAddress, setEditingAddress] = useState<addressProps | null>(
    null
  );
  const [newAddress, setNewAddress] = useState({
    label: "",
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  // Начальное состояние пустое, данные будут загружены из localStorage
  const [addresses, setAddresses] = useState<addressProps[]>([]);

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      const parsedAddresses = JSON.parse(savedAddresses);
      setAddresses(parsedAddresses);
      // Если есть адреса, выбираем первый, если selectedAddress пустой
      if (parsedAddresses.length > 0 && !selectedAddress) {
        setSelectedAddress(parsedAddresses[0].id);
      }
    }
  }, []); // Пустой массив зависимостей — выполняется только при монтировании

  const handleAddNewAddress = () => {
    setIsEditMode(false);
    setNewAddress({ label: "", name: "", address: "", city: "", phone: "" });
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: addressProps) => {
    setIsEditMode(true);
    setEditingAddress(address);
    setNewAddress({
      label: address.label,
      name: address.name,
      address: address.address,
      city: address.city,
      phone: address.phone,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingAddress(null);
    setNewAddress({ label: "", name: "", address: "", city: "", phone: "" });
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.label ||
      !newAddress.name ||
      !newAddress.address ||
      !newAddress.city ||
      !newAddress.phone
    ) {
      alert("Please fill in all fields");
      return;
    }

    let updatedAddresses: addressProps[];
    if (isEditMode && editingAddress) {
      // Обновляем существующий адрес
      updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id ? { ...addr, ...newAddress } : addr
      );
    } else {
      // Добавляем новый адрес
      const newId =
        addresses.length > 0
          ? `address${
              Math.max(
                ...addresses.map((a) => parseInt(a.id.replace("address", "")))
              ) + 1
            }`
          : "address1";
      updatedAddresses = [
        ...addresses,
        {
          id: newId,
          label: newAddress.label,
          name: newAddress.name,
          address: newAddress.address,
          city: newAddress.city,
          phone: newAddress.phone,
        },
      ];
      // Если это первый добавленный адрес, выбираем его
      if (addresses.length === 0) {
        setSelectedAddress(newId);
      }
    }

    // Обновляем состояние и сохраняем в localStorage
    setAddresses(updatedAddresses);
    if (updatedAddresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    } else {
      localStorage.removeItem("addresses");
    }

    handleCloseModal();
  };

  const handleRemoveAddress = (id: string) => {
    const updatedAddresses = addresses.filter((address) => id !== address.id);
    setAddresses(updatedAddresses);
    if (selectedAddress === id) {
      setSelectedAddress(updatedAddresses[0]?.id || "");
    }

    // Сохраняем в localStorage
    if (updatedAddresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    } else {
      localStorage.removeItem("addresses");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-12">
      {addresses.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No addresses available. Please add a new address to continue.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex gap-3 p-4 border border-stone-400 rounded-lg bg-stone-400 items-center"
            >
              <input
                type="radio"
                name="address"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
                className=""
              />

              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="flex gap-2">
                    <span className="font-semibold">{address.name}</span>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                      {address.label}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{address.address}</p>
                <p className="text-gray-600">{address.city}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>

              <div className="flex gap-4 ml-auto">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="text-gray-600"
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="cursor-pointer text-2xl"
                  />
                </button>
                <button
                  onClick={() => handleRemoveAddress(address.id)}
                  className="text-gray-600"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="cursor-pointer text-3xl"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={handleAddNewAddress}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-stone-800 p-3 rounded-full text-gray-200"
          />
          <h1 className="text-xl font-medium">Add New Address</h1>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Address" : "Add New Address"}
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="label"
                  className="block text-sm font-medium text-gray-700"
                >
                  Label (e.g., Home, Office)
                </label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  value={newAddress.label}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-stone-400 rounded focus:outline-none focus:border-stone-800"
                  placeholder="Home"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-stone-400 rounded focus:outline-none focus:border-stone-800"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newAddress.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-stone-400 rounded focus:outline-none focus:border-stone-800"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-stone-400 rounded focus:outline-none focus:border-stone-800"
                  placeholder="New York"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-stone-400 rounded focus:outline-none focus:border-stone-800"
                  placeholder="(123) 456-7890"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveAddress}
                className="w-full py-2 bg-stone-800 text-gray-200 rounded font-semibold cursor-pointer"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex mt-6 ml-auto gap-6">
        <Link href="/cart">
          <button className="px-21 py-6 border border-stone-400 rounded text-stone-800 font-semibold cursor-pointer">
            Back
          </button>
        </Link>
        <Link href="/checkout/shipping">
          <button
            className="px-21 py-6 bg-stone-800 text-gray-200 rounded font-semibold cursor-pointer disabled:opacity-70 disabled:cursor-default"
            disabled={addresses.length === 0}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
