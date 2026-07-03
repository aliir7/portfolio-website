import { ResumeItemType } from "@/types";
import ResumeItem from "./ResumeItem";

interface ResumeColumnProps {
  title: string;
  items: ResumeItemType[];
}

const ResumeColumn = ({ title, items }: ResumeColumnProps) => {
  return (
    <div>
      {/* Column Heading */}
      <div className="mb-4">
        <h3 className="text-center text-2xl font-semibold">{title}</h3>
        <span className="border-border mt-2 block h-px w-full border-b-2" />
      </div>

      {/* Timeline Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <ResumeItem
            key={item.id}
            item={item}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeColumn;
