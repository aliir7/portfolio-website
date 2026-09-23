"use client";

import { Link } from "@/i18n/navigation";
import { RiArrowUpLine, RiHeart3Fill } from "@remixicon/react";
import { useDictionary } from "@/lib/i18n";

const Footer = () => {
  const dictionary = useDictionary();
  return (
    <footer className="bg-background relative border-t border-border/60">
      <div className="container-custom py-7">
        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {dictionary.footer.rights}
          </p>
          <p className="text-muted-foreground flex items-center gap-1.5">
            {dictionary.footer.madeWith}
            <RiHeart3Fill className="text-primary size-4" aria-hidden="true" />
            {dictionary.footer.by}
          </p>
          <Link
            href="/#home"
            aria-label={dictionary.footer.backToTop}
            title={dictionary.footer.backToTop}
            className="bg-primary text-primary-foreground absolute end-5 top-0 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background shadow-lg transition-transform hover:-translate-y-[60%] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <RiArrowUpLine className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
