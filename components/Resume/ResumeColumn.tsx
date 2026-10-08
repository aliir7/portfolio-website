import { ResumeItemType } from "@/types";
import ResumeItem from "./ResumeItem";
import { toLocaleDigits, useLocale } from "@/lib/i18n";

type Props = {
  title: string;
  items: ResumeItemType[];
};

const ResumeColumn = ({ title, items }: Props) => {
  const locale = useLocale();
  return (
    <div className="bg-card/80 border-border/60 dark:hover:border-primary hover:border-card-foreground hover:shadow-4px rounded-3xl border p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 sm:p-8">
      <div className="border-border/60 mb-8 flex items-center justify-between gap-4 border-b pb-5">
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
          <span className="bg-primary mt-3 block h-1 w-12 rounded-full" />
        </div>
        <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full text-sm font-bold">
          {toLocaleDigits(items.length, locale)}
        </span>
      </div>
      <div className="space-y-8">
        {items.map((item) => (
          <ResumeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ResumeColumn;
