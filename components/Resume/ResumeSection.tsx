import { resumeData } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Shape from "../ui/shape";

const ResumeSection = () => {
  return (
    <section id="resume" className="container-custom relative py-16">
      {/* Decorative Shape */}
      <Shape containerClassName="left-0 top-20 h-1/2 hidden md:block" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            رزومه من
          </h2>
          <p className="text-primary mt-4">
            مروری بر مسیر آموزشی، تجربیات کاری و مهارت‌های فنی من در دنیای توسعه
            نرم‌افزار.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {resumeData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-card hover:border-primary/50 rounded-xl border px-6 transition-colors"
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ResumeSection;
