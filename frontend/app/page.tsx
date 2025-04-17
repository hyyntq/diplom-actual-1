import FooterBanner from "@/components/home/footer-section/banner-footer";
import Category from "@/components/home/category-section/Category";
import Discount from "@/components/home/discount-section/discount";
import HeroBanner from "@/components/home/hero-section/HeroBanner";
import PopularProducts from "@/components/home/popular-product/popular-banner";
import ProductSection from "@/components/home/product-section/product-section";
import PromoGrid from "@/components/home/promo-section/promo-grid";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <PromoGrid />
      <Category />
      <ProductSection />
      <PopularProducts />
      <Discount />
      <FooterBanner />
    </>
  );
}
