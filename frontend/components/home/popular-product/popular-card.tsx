import { ProductBannerProps } from "@/lib/interface";
import Image from "next/image";

export default function ProductBanner({
  img,
  title,
  description,
  bgColor,
}: ProductBannerProps) {
  return (
    <div className={`${bgColor} p-6 flex items-center flex-col gap-4 rounded-xl `}>
      <div className="h-72 relative flex-shrink-0 w-full">
        <Image src={img} alt={title} fill className="object-contain" priority />
      </div>

      <div className=" flex flex-col justify-center gap-4 items-center text-center md:items-start md:text-start">
        <h1
          className={`text-xl font-bold ${
            bgColor === "bg-stone-800" ? "text-gray-200" : "text-stone-800"
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-sm ${
            bgColor === "bg-stone-800" ? "text-gray-200" : "text-stone-800"
          }`}
        >
          {description}
        </p>
        <div>
          <button
            className={`uppercase border-2  cursor-pointer px-14 py-4 rounded-xl  transition-all duration-400 font-bold tracking-wider text-nowrap ${
              bgColor === "bg-stone-800"
                ? "text-gray-200 border-gray-200 hover:bg-gray-200  hover:text-stone-800"
                : "text-stone-800 border-stone-800 hover:bg-stone-800  hover:text-gray-200"
            } `}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
