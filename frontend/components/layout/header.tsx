"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderLink from "../ui/Header-Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "../ui/MobileMenu";
import { SearchForm } from "../ui/SearchBar";
import { logoutAction } from "@/data/auth-actions";
import { useUser } from "@/lib/context/user-context";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="bg-gray-200 ">
      <div className="py-4 flex xl:gap-11 gap-8 container mx-auto  justify-between px-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/Logo.svg"
            alt="Logo"
            width={128}
            height={128}
            className="object-contain max-w-none"
            priority
          />
        </Link>

        <div className="hidden md:flex">
          <SearchForm />
        </div>
        <HeaderLink />

        <div className="flex gap-4">
          <div className="hidden lg:flex items-center justify-center xl:gap-10 gap-5">
            <div className=" gap-5 hidden xl:flex">
              <Link href="/favorites" className="icon-header">
                <FontAwesomeIcon icon={faHeart} className="text-3xl" />
              </Link>
              <Link href="/cart" className="icon-header">
                <FontAwesomeIcon icon={faCartShopping} className="text-3xl" />
              </Link>
            </div>

            {!user?.ok && (
              <Link href="/login" className="auth-btn">
                <h1 className="uppercase">Sign in</h1>
              </Link>
            )}
            {user?.ok && (
              <div className="flex gap-3 items-center">
                {user.username}
                <form action={logoutAction}>
                  <button className="cursor-pointer bg-red-400 p-3 px-5 text-zinc-200 rounded-full">
                    Logout
                  </button>
                </form>
              </div>
            )}
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
