"use client";

import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useDictionary, useLocale } from "@/lib/i18n";

type Props = {
  title: string;
  subtitle: string;
  description: string;
};

const ServiceCard = ({ title, subtitle, description }: Props) => {
  const dictionary = useDictionary();
  const locale = useLocale();
  return (
    <div className="group bg-card border-border/50 relative flex min-h-88 flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 md:h-105 md:p-10">
      <div>
        <h3 className="text-muted-foreground text-xl font-semibold">{title}</h3>

        <h4 className="mt-6 text-xl leading-tight font-bold">{subtitle}</h4>

        <p className="text-muted-foreground mt-6 leading-8">{description}</p>
      </div>

      <div className="group-hover:text-primary mt-auto flex items-center gap-2 pt-10 font-semibold group-hover:cursor-pointer">
        <Button variant="ctaLink" className="text-lg hover:cursor-pointer" asChild>
          <Link href="#contact">{dictionary.common.more}</Link>
        </Button>
        {locale === "fa" ? (
          <RiArrowLeftLine
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        ) : (
          <RiArrowRightLine
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </div>

      <div className="">
        <Image
          src="/assets/img/shape-3.png"
          alt="Decoration Shape 3"
          width={120}
          height={120}
          className={
            locale === "fa"
              ? "absolute -bottom-10 -left-5 z-0 opacity-80 dark:invert md:left-2"
              : "absolute -right-5 -bottom-10 z-0 opacity-80 dark:invert md:right-2"
          }
        />
      </div>
    </div>
  );
};

export default ServiceCard;
