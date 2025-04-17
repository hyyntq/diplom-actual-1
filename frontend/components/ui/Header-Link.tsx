"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const HeaderLink = () => {

  const pathName = usePathname();
  return (
    <nav className="hidden xl:flex items-center justify-center gap-5 flex-nowrap text-lg font-medium ">
      <Link
        href="/"
        className={`header-link ${pathName === "/" ? "header-active" : ""}`}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`header-link ${
          pathName === "/about" ? "header-active" : ""
        }`}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={`header-link ${
          pathName === "/contact" ? "header-active" : ""
        }`}
      >
        Contact
      </Link>
      <Link
        href="/blog"
        className={`header-link ${pathName === "/blog" ? "header-active" : ""}`}
      >
        Blog
      </Link>
      
    </nav>
  );
}

export default HeaderLink