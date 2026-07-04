import { resumeData } from "@/lib/constants";
import ResumeColumn from "./ResumeColumn";

const educationItems = resumeData.filter(
  (item) => item.category === "education",
);
const experienceItems = resumeData.filter(
  (item) => item.category === "experience",
);
const ResumeSection = () => {
  return (
    <section id="resume" className="container-custom relative py-16">
      {/* Decorative Shape */}
      {/* <Shape containerClassName="left-0 top-20 hidden h-1/2 md:block" /> */}

      <div className="relative z-10 mx-auto">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            رزومه من
          </h2>

          <p className="text-primary mx-auto mt-4 max-w-2xl">
            مروری بر مسیر آموزشی، تجربیات کاری و مهارت‌های فنی من در دنیای توسعه
            نرم‌افزار.
          </p>
        </div>

        {/* Resume Columns */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ResumeColumn title="تحصیلات و دوره‌ها" items={educationItems} />

          <ResumeColumn title="سوابق شغلی" items={experienceItems} />
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
