import { projects } from "@/lib/constants/index";
import WorksFilter from "./WorksFilter";
import WorksGrid from "./WorksGrid";
import Shape from "../ui/shape";

const WorksSection = () => {
  return (
    <section id="works" className="container-custom relative py-16">
      {/* ✅ Decorative Shape */}
      <Shape containerClassName="right-1 p top-55 h-2/3 hidden md:block" />

      {/* ✅ Content Wrapper */}
      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            نمونه‌کارهای من
          </h2>

          <p className="text-primary mt-4">
            مجموعه‌ای از پروژه‌هایی که تجربه من را در ساخت وب‌اپلیکیشن‌های مدرن،
            مقیاس‌پذیر و حرفه‌ای نشان می‌دهند.
          </p>
        </div>

        <WorksFilter />

        <div className="mt-10">
          <WorksGrid projects={projects} />
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
