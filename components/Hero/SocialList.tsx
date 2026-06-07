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
              variant="ghost"
              size="icon"
              className="border-border/60 bg-background/60 h-11 w-11 rounded-full border backdrop-blur-sm"
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialList;
