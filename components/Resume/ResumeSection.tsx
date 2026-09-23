import { resumeData } from "@/lib/constants";
import ResumeColumn from "./ResumeColumn";
import Shape from "../ui/shape";
import RevealSection from "../ui/reveal-section";

const educationItems = resumeData.filter(
  (item) => item.category === "education",
);
const experienceItems = resumeData.filter(
  (item) => item.category === "experience",
);
const ResumeSection = () => {
  return (
    <RevealSection
      id="resume"
      delay={0.4}
      className="section-gradient relative overflow-hidden py-20"
    >
      <div className="container-custom relative z-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            رزومه من
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl leading-8">
            مروری بر مسیر آموزشی، تجربیات کاری و مهارت‌های فنی من در دنیای توسعه
            نرم‌افزار.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ResumeColumn title="تحصیلات و دوره‌ها" items={educationItems} />
          <ResumeColumn title="سوابق شغلی" items={experienceItems} />
        </div>
      </div>
      <div className="hidden md:block">
        <Shape
          width={226}
          className="absolute -bottom-51.5 -left-11.5 h-56.5 max-w-56.5"
          containerClassName="-right-18"
        />
      </div>
    </RevealSection>
  );
};

export default ResumeSection;
