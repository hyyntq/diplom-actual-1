import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex-grow grid place-items-center text-stone-800">
      <div className="flex gap-4 flex-col items-center">
        <h2 className="text-2xl font-bold">Ой! Что-то пошло не так</h2>
        <h3 className="text-2xl font-semibold">
          Error 404, Похоже, такой страницы не существует
        </h3>
        <div className="flex gap-2">
          <Link className="text-primary underline" href="/">
            вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
