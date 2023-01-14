import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import SectionTitle from "../SectionTitle/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import { TestimonialCardDataType } from "./TestimonialCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type TestimonialSliderDataType = {
  data: {
    title: string;
    testimonialCard: TestimonialCardDataType[];
  };
};

const TestimonialsSlider = (data: TestimonialSliderDataType) => {
  const cards = data.data.testimonialCard;
  return (
    <section className="page-container bg-secondary-color">
      {data.data.title && <SectionTitle title={data.data.title} secondary />}
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ dynamicBullets: true }}
        className="mySwiper"
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={900}
      >
        {cards &&
          cards.map((card: any) => (
            <SwiperSlide className="">
              <TestimonialCard data={card} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsSlider;
