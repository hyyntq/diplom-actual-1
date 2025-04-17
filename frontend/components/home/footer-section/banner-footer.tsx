import Image from "next/image";
import React from "react";

const FooterBanner = () => {
  return (
    <div className="p-20 bg-gradient-to-br from-stone-300 to-stone-500 relative overflow-hidden">
      <div className="relative flex flex-col gap-8 justify-center items-center z-50">
        <div className="text-stone-800 flex flex-col justify-center items-center gap-4 text-center">
          <h1 className="lg:text-9xl text-6xl font-light text-center text-nowrap">
            Big Summer <span className="font-bold">Sale</span>
          </h1>
          <span className="lg:text-2xl text-xl">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </span>
        </div>
        <button className="uppercase border-2 border-stone-800 cursor-pointer px-14 py-4 rounded-xl text-stone-800 hover:bg-stone-800  hover:text-slate-200 transition-all duration-400 font-bold tracking-wider">
          shop now
        </button>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/img/footer/ipad-1.svg"
          alt="ipad"
          width={350}
          height={200}
          priority
          className="absolute lg:left-8 z-1 left-[-14rem] top-[-8rem] lg:w-[250px] lg:top-0"
        />
        <Image
          src="/img/footer/ipad-2.svg"
          alt="ipad"
          width={400}
          height={250}
          priority
          className="absolute lg:bottom-2 lg:left-[-80px] bottom-[-8rem] left-[-14rem]"
        />
        <Image
          src="/img/footer/element.svg"
          alt="elem"
          width={500}
          height={250}
          priority
          className="absolute lg:top-[-80px] top-[-8rem] md:left-[200px] left[-6rem] rotate-45 lg:rotate-0 lg:w-[400px]"
        />
        <Image
          src="/img/footer/iphone.svg"
          alt="iphone"
          width={400}
          height={350}
          priority
          className="absolute lg:top-[-20px] lg:right-[-120px]  top-[-11rem] rotate-[-35deg] lg:rotate-0 lg:w-[300px] right-[-13rem]"
        />
        <Image
          src="/img/footer/apple-watch.svg"
          alt="apple watch"
          width={500}
          height={300}
          className="absolute lg:right-0 lg:bottom-[-100px] right-[-14rem] sm:w-[500px] bottom-[-14rem]"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
