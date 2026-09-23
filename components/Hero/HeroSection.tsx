"use client";

import Link from "next/link";
import SocialList from "./SocialList";
import Image from "next/image";
import { CTAButtons } from "./CTAButtons";
import Shape from "../ui/shape";
import RevealSection from "../ui/reveal-section";
import { useDictionary, useLocale } from "@/lib/i18n";

const HeroSection = () => {
  const { hero } = useDictionary();
  const locale = useLocale();
  return (
    <RevealSection
      id="hero"
      delay={0}
      className="section-gradient home-section relative flex min-h-screen items-center overflow-hidden pt-24 pb-12"
    >
      <div className="home-container relative z-10 mx-auto px-6 lg:pr-24 lg:pl-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* ستون راست: محتوای متنی */}
          <div className="z-10 flex flex-col space-y-6">
            <h3 className="text-xl font-medium tracking-wide md:text-2xl">
              {hero.greeting}{" "}
              <span className="text-primary font-semibold">{hero.welcome} </span>
              {hero.welcomeEnd}
            </h3>

            {/* افکت متن توخالی یکپارچه با کلاس سفارشی */}
            <h1 className="stroke-custom text-7xl font-bold tracking-tighter md:text-8xl lg:text-[100px]">
              {hero.name}
            </h1>

            <h2 className="text-2xl font-bold md:text-3xl">
              {hero.role}
            </h2>

            <p className="max-w-lg text-lg text-gray-600 dark:text-gray-400">
              {hero.bio}
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-5">
              <SocialList />
            </div>

            {/* دکمه‌های اقدام (Call to Actions) */}
            <div className="flex items-center">
              <CTAButtons
                resumeUrl="#resume"
                skillsUrl="#skills"
                resumeText={hero.resume}
                skillsText={hero.skills}
              />
            </div>
          </div>

          {/* ستون چپ: تصویر و گرافیک */}
          <div className="relative mt-16 flex justify-center lg:mt-0">
            {/* شیپ ۱ - بالا راست */}
            <Image
              src="/assets/img/shape-1.png"
              alt="Decoration Shape 1"
              width={160}
              height={160}
              className="absolute -top-10 right-0 z-0 opacity-80 dark:invert md:top-10"
            />

            {/* شیپ ۲ - پایین چپ */}
            <Image
              src="/assets/img/shape-2.png"
              alt="Decoration Shape 2"
              width={160}
              height={160}
              className="absolute -bottom-10 -left-2 z-0 opacity-80 dark:invert md:left-10"
            />

            {/* کانتینر ماسک‌کننده (دایره سبز رنگ با overflow-hidden) */}
            <div className="bg-primary relative z-10 flex h-85 w-85 items-end justify-center overflow-hidden rounded-full md:h-120 md:w-120">
              <Image
                src="/assets/img/user_img.png"
                alt={hero.imageAlt}
                width={500}
                height={500}
                className="object-cover pt-6 drop-shadow-2xl"
                priority
              />
            </div>

            {/* نشان‌های شناور (Badges) */}
            <div className="border-card-foreground shadow-card-foreground absolute top-1/7 -right-2 z-20 flex cursor-default items-center gap-3 rounded-full border-2 bg-card px-5 py-3 shadow-[4px_4px_0px] transition-transform hover:-translate-y-1 md:top-1/4 md:right-2">
              <span className="text-card-foreground text-xl font-black lg:text-3xl">
                {locale === "fa" ? "۱۲+" : "12+"}
              </span>
              <span className="text-primary text-sm leading-tight font-bold lg:text-xs">
                {hero.years}
                <br />
                {hero.experience}
              </span>
            </div>

            <div className="border-card-foreground shadow-card-foreground absolute bottom-12 -left-1 z-20 flex cursor-default items-center gap-3 rounded-full border-2 bg-card px-5 py-3 shadow-[4px_4px_0px] transition-transform hover:-translate-y-1 md:left-10">
              <span className="text-card-foreground text-xl font-black lg:text-3xl">
                {locale === "fa" ? "۳۳۰" : "330"}
              </span>
              <span className="text-primary text-xs leading-tight font-bold">
                {hero.projects}
                <br />
                {hero.successful}
              </span>
            </div>
          </div>
        </div>
        {/* right Deco */}
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

export default HeroSection;
