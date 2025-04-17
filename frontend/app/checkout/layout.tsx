"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    { name: "Address", href: "/checkout/address" },
    { name: "Shipping", href: "/checkout/shipping" },
    { name: "Payment", href: "/checkout/payment" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col container mx-auto py-10 px-4 gap-20">
      {/* Навигация по шагам */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <Link
            key={step.name}
            href={step.href}
            className={`text-lg font-semibold ${
              pathname === step.href ? "text-stone-800" : "text-gray-400"
            }`}
          >
            Step {index + 1}: {step.name}
          </Link>
        ))}
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
