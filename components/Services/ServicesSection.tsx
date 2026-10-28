"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ServiceCard from "./ServiceCard";
import Shape from "../ui/shape";
import RevealSection from "../ui/reveal-section";
import { useContent } from "@/lib/content";
import { useDictionary, useLocale } from "@/lib/i18n";

export const ServicesSection = () => {
  const { services } = useContent();
  const dictionary = useDictionary();
  const locale = useLocale();
  return (
    <RevealSection
      id="services"
      delay={0.1}
      className="container mx-auto px-6 py-24 lg:py-32"
    >
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          {dictionary.services.title}
        </h2>
        <p className="text-primary mt-3 text-lg font-semibold">
          {dictionary.services.subtitle}
        </p>
      </div>

      <div className="services-swiper-wrap relative">
        <Swiper
          key={locale}
          modules={[Pagination, Autoplay]}
          dir={locale === "fa" ? "rtl" : "ltr"}
          className="w-full overflow-hidden"
          spaceBetween={30}
          slidesPerView={1}
          watchOverflow
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
            <SwiperSlide key={service.id} className="h-auto">
              <ServiceCard {...service} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 👇 این کاملاً خارج از خود swiper است */}
        <div className="services-pagination slider-pagination mt-8 flex justify-center" />

        {/* right Deco, the same as in the Hero section; its height follows this slider block */}
        <div className="hidden md:block">
          <Shape
            width={226}
            className="absolute -bottom-51.5 -left-11.5 h-56.5 max-w-56.5"
            containerClassName="-right-18"
          />
        </div>
      </div>
    </RevealSection>
  );
};
