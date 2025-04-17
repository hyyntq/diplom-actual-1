import Image from "next/image";
import React from "react";

const PromoGrid = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <div className="grid md:grid-cols-2 md:grid-rows-2 ">
        <div className="md:relative md:col-span-2 bg-stone-300 md:grid overflow-hidden flex flex-col items-center justify-center py-10 px-4 md:p-0 gap-6 md:gap-0">
          <Image
            src="/img/playstation.svg"
            alt="playstation"
            width={500}
            height={350}
            priority
            className="md:absolute md:left-[-150px] max-w-50 md:max-w-none"
          />

          <div className="md:z-1 md:py-28 flex flex-col items-center  md:ml-25 justify-center">
            <div className="md:max-w-96 flex flex-col gap-4 justify-center items-center text-center">
              <h2 className="text-5xl font-medium text-stone-800">
                Playstation 5
              </h2>
              <p className="text-sm text-stone-800 text-wrap opacity-80">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>
        </div>

        <div className="md:relative bg-stone-300 flex flex-col md:flex-row items-center justify-end overflow-hidden py-10 px-4 md:p-0 gap-6 md:gap-0">
          <div className="md:absolute md:inset-0 flex  items-center justify-center">
            <Image
              src="/img/headphones.svg"
              alt="headphones"
              width={300}
              height={300}
              priority
              className="md:absolute md:left-[-170] max-w-50 md:max-w-none "
            />
          </div>

          <div className="md:z-1 flex flex-col  text-wrap md:max-w-52 gap-2 items-center justify-center text-center md:items-start md:text-start">
            <h2 className="text-3xl">
              Apple AirPods <span className="font-bold">Max</span>
            </h2>
            <p className="opacity-80">
              Computational audio. Listen, its powerful
            </p>
          </div>
        </div>

        <div className="md:relative bg-stone-400 flex flex-col md:flex-row overflow-hidden items-center justify-center py-10 px-4 md:p-0 gap-6 md:gap-0">
          <div className="md:absolute inset-0 flex items-center">
            <Image
              src="/img/VR.svg"
              alt="vr"
              width={300}
              height={200}
              priority
              className="md:absolute md:left-[-150px] max-w-50 md:max-w-none"
            />
          </div>

          <div className="md:z-1 flex flex-col justify-center items-center md:ml-30 text-stone-200 md:items-start md:max-w-56">
            <h2 className="text-3xl font-light text-wrap text-start">
              Apple Vision <span className="font-bold">Pro</span>
            </h2>
            <p className="md:max-w-40 opacity-80">
              An immersive way to experience entertainment
            </p>
          </div>
        </div>
      </div>

      <section className="relative flex items-center bg-stone-300 py-50 px-14 overflow-hidden">
        <div className="z-1 flex-1 max-w-md flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-7xl font-light text-nowrap">
              Macbook <span className="font-bold text-black">Air</span>
            </h2>
            <p className="text-stone-800 opacity-80">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
          </div>

          <div>
            <button className="btn-card">
              Shop Now
            </button>
          </div>
        </div>

        <Image
          src="/img/macbook-pro.svg"
          alt="MacBook Air"
          width={650}
          height={450}
          className="absolute right-[-400px] "
        />
      </section>
    </div>
  );
};

export default PromoGrid;
