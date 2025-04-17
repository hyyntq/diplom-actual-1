"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { banner } from "@/data/banner";
import ProductBanner from "../home/popular-product/popular-card";

const banners = banner;

const PopularCarousel = () => {
  return (
    <div className="container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="popular-products-swiper"
      >
        {banners.map((product) => (
          <SwiperSlide key={product.title}>
            <ProductBanner
              img={product.img}
              title={product.title}
              description={product.description}
              bgColor={product.bgColor}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCarousel;
