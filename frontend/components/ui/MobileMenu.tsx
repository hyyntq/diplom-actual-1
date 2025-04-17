"use client";

import { category } from "@/data/category";
import {
  faAddressBook,
  faArrowDown,
  faBars,
  faCartShopping,
  faHeart,
  faHome,
  faInfoCircle,
  faNewspaper,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SearchForm } from "./SearchBar";
import { useUser } from "@/lib/context/user-context";
import { logoutAction } from "@/data/auth-actions";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { user } = useUser();

  const categories = category;

  return (
    <div className="flex items-center xl:hidden ">
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10">
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} className="text-3xl" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        )}
      </button>
      {isOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black w-full h-full opacity-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-full md:max-w-1/2 max-w-[100%] shadow-xl z-50 p-6 transition-all flex flex-col duration-300 rounded-l-2xl bg-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setIsOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4 grow">
              <div className="flex flex-col grow gap-4">
                <div className="block md:hidden">
                  <SearchForm />
                </div>
                <Link
                  href="/"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>Home</h1>
                  <FontAwesomeIcon icon={faHome} className="text-xl" />
                </Link>
                <div
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="text-lg  flex  flex-col transition duration-300"
                >
                  <div className="mobile-menu-link">
                    Category
                    <FontAwesomeIcon icon={faArrowDown} className="text-xl" />
                  </div>
                  {isCategoryOpen && (
                    <nav className="px-4 py-3 flex flex-col gap-3 transition duration-300">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={`category/${category.name}`}
                          className="text-md hover:underline"
                          onClick={() => {
                            setIsCategoryOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>
                <Link
                  href="/about"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>About</h1>
                  <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
                </Link>
                <Link
                  href="/contact"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>Contact</h1>
                  <FontAwesomeIcon icon={faAddressBook} className="xl" />
                </Link>
                <Link
                  href="/blog"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>Blog</h1>
                  <FontAwesomeIcon icon={faNewspaper} className="text-xl" />
                </Link>
                <Link
                  href="/favorites"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>Favorite</h1>
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
                <Link
                  href="/cart"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>Cart</h1>
                  <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                </Link>
                <Link
                  href="/account"
                  className="mobile-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <h1>Account</h1>
                  <FontAwesomeIcon icon={faUser} className="text-2xl" />
                </Link>
                {/* <Link href="/account">
                  {user?.data && (
                    <div className="flex gap-3 items-center">
                      {user.data.username}
                      <form action={logoutButton}>
                        <button className="cursor-pointer bg-red-400 p-3 px-5 text-zinc-200 rounded-full">
                          Logout
                        </button>
                      </form>
                    </div>
                  )}
                </Link> */}
              </div>
              
                {!user?.ok && (
                  <div className="flex items-center justify-center text-center gap-3">
                    <Link
                      href="/login"
                      className="auth-btn"
                      onClick={() => setIsOpen(false)}
                    >
                      <h1 className="uppercase">Sign in</h1>
                    </Link>
                    <Link
                      href="/login"
                      className="auth-btn"
                      onClick={() => setIsOpen(false)}
                    >
                      <h1 className="uppercase">Register</h1>
                    </Link>
                  </div>
                )}

                {user?.ok && (
                  <div className="flex gap-3 justify-between items-center">
                    {user.username}
                    <form action={logoutAction}>
                      <button className="cursor-pointer bg-red-400 p-3 px-5 text-zinc-200 rounded-full">
                        Logout
                      </button>
                    </form>
                  </div>
                )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
