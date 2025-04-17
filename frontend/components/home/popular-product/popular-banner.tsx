import { banner } from "@/data/banner";
import ProductBanner from "./popular-card";
import PopularCar from "@/components/ui/PopularCarousel";

export default function PopularProducts() {
  const banners = banner;

  return (
    <div className="container mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Popular Products</h2>
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {banners.map((banner, index) => (
          <ProductBanner
            key={index}
            img={banner.img}
            title={banner.title}
            description={banner.description}
            bgColor={banner.bgColor}
          />
        ))}
      </div>
      <div className="md:hidden sm:block flex items-center justify-center ">
        <PopularCar />
      </div>
    </div>
  );
}
