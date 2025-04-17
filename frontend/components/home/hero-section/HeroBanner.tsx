import Image from "next/image";
import React from "react";

const HeroBanner = () => {
  return (
    <section className="md:relative  bg-stone-400 md:p-35 overflow-hidden pt-20">
      
      <div className="flex container mx-auto flex-col md:flex-row text-center md:text-start gap-12 md:gap-0">
        <div className="flex flex-col justify-center gap-6 z-1 md:jusify-start">
          <div className="flex flex-col gap-4">
            <p className="text-stone-800 text-2xl font-semibold">Pro.Beyond.</p>
            <h1 className="text-zinc-200 text-9xl font-extralight ">
              IPhone 14 <span className="font-bold">Pro</span>
            </h1>
          </div>
          <p className="font-semibold text-stone-800 text-xl">
            Created to change everything for the better. For everyone
          </p>
          <div>
            <button className="uppercase border-2 border-zinc-200 cursor-pointer px-14 py-4 rounded-xl text-zinc-200 hover:bg-zinc-200  hover:text-stone-800 transition-all duration-400 font-bold tracking-wider">
              Shop Now
            </button>
          </div>
        </div>

        <div className="md:absolute relative md:inset-0 overflow-hidden md:container mx-auto w-full">
          <Image
            src="/img/iphone.svg"
            alt="Iphone"
            width={400}
            height={600}
            className="md:absolute md:top-[70px]  md:right-0 mx-auto max-w-[300px] md:max-w-none relative bottom-[-40px] "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
