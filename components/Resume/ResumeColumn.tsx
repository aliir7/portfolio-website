import { ResumeItemType } from "@/types";
import ResumeItem from "./ResumeItem";

type Props = {
  title: string;
  items: ResumeItemType[];
};

const ResumeColumn = ({ title, items }: Props) => {
  return (
    <div className="bg-card/80 rounded-3xl border border-border/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
          <span className="bg-primary mt-3 block h-1 w-12 rounded-full" />
        </div>
        <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full text-sm font-bold">
          {items.length.toLocaleString()}
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
