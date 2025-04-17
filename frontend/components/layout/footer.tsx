import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-zinc-300 flex flex-col gap-6 ">
      <div className="py-26 flex flex-col gap-12 md:gap-5 container mx-auto  items-center text-center md:text-start md:items-start">
        <div className="md:grid md:grid-cols-2 gap-10 flex flex-col">
          <div className="flex gap-6 flex-col items-center md:items-start">
            <Image
              src="/img/Logo-white.svg"
              alt="Logo"
              width={128}
              height={128}
            />
            <p className="">
              We are a residential interior design firm located in Portland. Our
              <br />
              boutique-studio offers more than
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <h3 className="text-lg font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Bonus program
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Gift cards
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Credit and payment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Service contracts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Non-cash account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Payment
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Assistance to the buyer
              </h3>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Find an order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Exchange and return of goods
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Guarantee
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Frequently asked questions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of use of the site
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex gap-9">
          <Link href="/">
            <Image
              src="/img/Twitter.svg"
              alt="twitter"
              width={32}
              height={32}
            />
          </Link>
          <Link href="/">
            <Image
              src="/img/facebook.svg"
              alt="twitter"
              width={32}
              height={32}
            />
          </Link>
          <Link href="/">
            <Image src="/img/TikTok.svg" alt="twitter" width={32} height={32} />
          </Link>
          <Link href="/">
            <Image
              src="/img/Instagram.svg"
              alt="twitter"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
