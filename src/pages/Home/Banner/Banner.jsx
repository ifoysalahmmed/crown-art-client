import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import slider01 from "../../../assets/slider/slider01.jpg";
import slider02 from "../../../assets/slider/slider02.jpg";
import slider03 from "../../../assets/slider/slider03.jpg";
import slider04 from "../../../assets/slider/slider04.jpg";
import slider05 from "../../../assets/slider/slider05.jpg";

const Banner = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slider01} alt="" className="max-h-[100vh] w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider02} alt="" className="max-h-[100vh] w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider03} alt="" className="max-h-[100vh] w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider04} alt="" className="max-h-[100vh] w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider05} alt="" className="max-h-[100vh] w-full" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
