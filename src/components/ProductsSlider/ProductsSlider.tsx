import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductsSlider = (data: any) => {
  const cards = data.data.sliderProductCard;
  return (
    <div className="page-container">
      <SectionTitle title={data.data.title} />
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        modules={[Scrollbar]}
        className="mySwiper"
        scrollbar={{ draggable: true }}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {cards &&
          cards.map((card: any) => (
            <SwiperSlide className="">
              <ProductCard data={card} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
