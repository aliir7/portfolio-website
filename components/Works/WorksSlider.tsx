"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useLocale } from "@/lib/i18n";
import Shape from "../ui/shape";
import type { Project } from "@/types";
import WorkCard from "./WorkCard";

/** Recent projects as a slider: 1 card on phones, 2 from `md`, 3 from `xl`. Pauses while hovered. */
export default function WorksSlider({ projects }: { projects: Project[] }) {
  const locale = useLocale();

  return (
    <div className="relative mt-12">
      {/* right Deco, the same as in the Hero section; its height follows this slider block */}
      <div className="hidden md:block">
        <Shape
          width={226}
          className="absolute -bottom-51.5 -left-11.5 h-56.5 max-w-56.5"
          containerClassName="-right-18"
        />
      </div>
      <Swiper
        key={locale}
        modules={[Pagination, Autoplay]}
        dir={locale === "fa" ? "rtl" : "ltr"}
        className="w-full overflow-hidden px-1 pt-1 pb-1"
        spaceBetween={24}
        slidesPerView={1}
        watchOverflow
        grabCursor
        autoplay={{
          delay: 6000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, el: ".works-pagination" }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="h-auto">
            {/* Equal-height cards inside the stretched slide */}
            <div className="h-full *:h-full">
              <WorkCard project={project} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="works-pagination slider-pagination mt-8 flex justify-center" />
    </div>
  );
}
