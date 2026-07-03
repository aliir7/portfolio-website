import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResumeItemType } from "@/types/index";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";

interface ResumeItemProps {
  item: ResumeItemType;
  isFirst: boolean;
  isLast: boolean;
}

const ResumeItem = ({ item, isFirst, isLast }: ResumeItemProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={item.id} className="border-none">
        <AccordionTrigger className="group block w-full p-0 hover:no-underline">
          <div className="w-full">
            {/* Organization */}
            <p className="text-primary text-sm font-medium">
              {item.organization}
            </p>

            {/* Title & Date */}
            <div className="mt-2 flex items-center justify-between gap-4">
              <h4 className="text-lg font-semibold">{item.title}</h4>

              <span className="text-muted-foreground shrink-0 text-sm">
                {item.date}
              </span>
            </div>

            {/* Timeline */}
            {/* Timeline */}
            <div className="relative mt-8">
              {/* Vertical line */}
              {!isFirst && (
                <div className="bg-border absolute -top-8 right-5 h-8 w-px" />
              )}

              {/* Horizontal line */}
              <div className="border-border h-px w-full border-b" />

              {/* Circle */}
              <div className="border-border bg-background group-hover:border-primary group-data-[state=open]:border-primary absolute top-1/2 -right-5 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300">
                <RiAddLine className="size-6 group-data-[state=open]:hidden" />

                <RiSubtractLine className="hidden size-6 group-data-[state=open]:block" />
              </div>

              {/* Vertical line to next item */}
              {!isLast && (
                <div className="bg-border absolute top-1/2 right-5 h-8 w-px translate-y-5" />
              )}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pt-8">
          <p className="text-muted-foreground leading-8">{item.content}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ResumeItem;
