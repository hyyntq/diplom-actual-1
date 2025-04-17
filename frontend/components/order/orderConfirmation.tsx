import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'

const OrderConfirmation = () => {
  return (
    <div className="flex items-center justify-center my-auto min-h-[80vh]">
      <div className="bg-stone-300 flex flex-col items-center  justify-center py-18 px-20 rounded-xl gap-10 ">
        <div className="flex gap-8 items-center">
          <FontAwesomeIcon icon={faCheck} className="text-9xl text-green-800" />
          <h1 className="font-bold text-stone-800 text-8xl">Successfully</h1>
        </div>

        <div className="flex justify-between gap-6">
          <Link href="/">
            <button className="px-21 py-6 border border-stone-400 rounded-xl text-stone-800 font-semibold cursor-pointer hover:bg-stone-800 hover:text-gray-200 transition duration-300 text-2xl">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation