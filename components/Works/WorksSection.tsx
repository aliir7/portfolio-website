import { projects } from "@/lib/constants/index";
import WorksFilter from "./WorksFilter";
import WorksGrid from "./WorksGrid";

const WorksSection = () => {
  return (
    <section id="works" className="container-custom py-16">
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
    </section>
  );
};

export default WorksSection;
