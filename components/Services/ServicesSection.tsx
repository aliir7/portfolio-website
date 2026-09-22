"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { services } from "@/lib/constants";
import ServiceCard from "./ServiceCard";
import Shape from "../ui/shape";
import RevealSection from "../ui/reveal-section";

export const ServicesSection = () => {
  return (
    <RevealSection
      id="services"
      delay={0.1}
      className="container mx-auto px-6 py-24 lg:py-32"
    >
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          خدمات من
        </h2>
        <p className="text-primary mt-3 text-lg font-semibold">
          راهکارهای تخصصی برای رشد کسب‌وکار شما
        </p>
      </div>

      <div className="services-swiper-wrap relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{
            clickable: true,
            el: ".services-pagination", // 👈 pagination بیرون swiper
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <ServiceCard {...service} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 👇 این کاملاً خارج از خود swiper است */}
        <div className="services-pagination mt-8 flex justify-center" />
        {/* shape */}
        <Shape containerClassName="-left-18" />
      </div>
    </RevealSection>
  );
};
