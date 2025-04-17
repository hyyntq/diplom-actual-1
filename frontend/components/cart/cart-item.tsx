import Image from "next/image";
import { ProductCardProps } from "@/lib/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export const CartItems = ({
  product,
  updateQuantity,
  removeFromCart,
}: ProductCardProps) => {
  return (
    <div className="p-4 flex items-center  bg-stone-300 rounded-xl 6">
      <div className="flex items-center gap-4 ">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
          <Image
            src={product.images[1] ? product.images[1] : product.images[0]}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between flex-1 gap-2">

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold w-32 sm:w-40 truncate">
            {product.title}
          </h3>
          <p className="text-stone-800 text-sm">#{product.sku}</p>
        </div>

        <div className="flex justify-between gap-10">
          <div className="flex items-center gap-2 sm:justify-center w-32">
            <button
              onClick={() => updateQuantity?.(product, product.quantity - 1)}
              className="w-8 h-8 outline outline-stone-800 text-stone-800 rounded-xl cursor-pointer hover:bg-stone-800 hover:text-gray-200 transition duration-300 text-xl flex items-center justify-center"
            >
              -
            </button>
            <span className="text-xl w-6 text-center">{product.quantity}</span>
            <button
              onClick={() => updateQuantity?.(product, product.quantity + 1)}
              className="w-8 h-8 outline outline-stone-800 text-stone-800 rounded-xl cursor-pointer hover:bg-stone-800 hover:text-gray-200 transition duration-300 text-xl flex items-center justify-center"
            >
              +
            </button>
          </div>
          <div className="flex gap-10 items-center">
            <p className="text-xl font-bold w-16">${product.price}</p>
            <button
              onClick={() => removeFromCart?.(product)}
              className="w-9 h-9 bg-stone-800 text-gray-200 cursor-pointer rounded-xl flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faXmark} className="w-9 h-9" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
