import { ResumeItemType } from "@/types";
import ResumeItem from "./ResumeItem";

type Props = {
  title: string;
  items: ResumeItemType[];
};

const ResumeColumn = ({ title, items }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-center text-2xl font-semibold">{title}</h3>
        <span className="border-border mt-2 block h-px w-full border-b-2" />
      </div>
      <div className="gap-y-4">
        {items.map((item) => (
          <ResumeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ResumeColumn;
