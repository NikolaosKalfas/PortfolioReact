import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "./ProductCard";
import { ProductCardDataType } from "./ProductCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type ProductsSliderDataType = {
  data: {
    title: string;
    sliderProductCard: ProductCardDataType[];
  };
};

const ProductsSlider = (data: ProductsSliderDataType) => {
  const cards = data.data.sliderProductCard;
  return (
    <section className="page-container">
      {data.data.title && <SectionTitle title={data.data.title} />}
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        modules={[Scrollbar]}
        className="mySwiper"
        scrollbar={{ draggable: true }}
        speed={500}
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
    </section>
  );
};

export default ProductsSlider;
