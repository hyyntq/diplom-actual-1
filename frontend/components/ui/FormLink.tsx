'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const FormLink = () => {

  const pathName = usePathname()

  return (
    <div className="flex gap-6 uppercase justify-center items-center">
      <Link
        href="/login"
        className={`${pathName === "/login" ? "active-form" : "passive-form"}`}
      >
        <h1 className="text-3xl font-bold">Sign In</h1>
      </Link>
      <Link
        href="/register"
        className={`${
          pathName === "/register" ? "active-form" : "passive-form"
        }`}
      >
        <h1 className="text-3xl font-bold">Sign Up</h1>
      </Link>
    </div>
  );
}

export default FormLink