import { socialLinks } from "@/lib/constants";
import { Button } from "../ui/button";
import Link from "next/link";

const SocialList = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.label}
              asChild
              variant="ctaLink"
              size="icon"
              className="h-11 w-11 backdrop-blur-sm"
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="ease-custom transition-colors duration-700"
              >
                <Icon className="h-5 w-5" />
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialList;
