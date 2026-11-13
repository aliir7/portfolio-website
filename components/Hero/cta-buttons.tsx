import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CTAButtonsProps {
  resumeUrl?: string;
  skillsUrl?: string;
  resumeText?: string;
  skillsText?: string;
}

export const CTAButtons = ({
  resumeUrl = "#",
  skillsUrl = "#",
  resumeText = "رزومه من",
  skillsText = "مهارت های من",
}: CTAButtonsProps) => {
  return (
    <div className="mt-8 flex flex-row-reverse items-center justify-end gap-6">
      {/* دکمه اصلی - رزومه */}
      <Button
        variant="cta"
        size="lg"
        asChild
        className="ease-custom px-6 py-2 transition-colors duration-700"
      >
        <Link href={resumeUrl}>{resumeText}</Link>
      </Button>

      {/* دکمه متنی - مهارت‌ها */}
      <Button variant="ctaLink" className="text-base" asChild>
        <Link href={skillsUrl}>{skillsText}</Link>
      </Button>
    </div>
  );
};
