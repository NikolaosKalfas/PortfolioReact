import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import { renderRichText } from "gatsby-source-contentful/rich-text";

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
    note: {
      note: string;
    }
  };
};

const ProductsSlider = (data: ProductsSliderDataType) => {
  const cards = data.data.sliderProductCard;

  console.log(data.data)
  return (
    <section className="page-container bg-tertiary-color">
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
            <SwiperSlide className="" key={card.title}>
              <ProductCard data={card} />
            </SwiperSlide>
          ))}
      </Swiper>
      {data.data.note.note && (
        <div className="">
          <p className="text-lg font-semibold text-text-color-primary">{data.data.note.note}</p>
        </div>
      )}
    </section>
  );
};

export default ProductsSlider;
