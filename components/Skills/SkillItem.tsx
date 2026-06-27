import { skillsData } from "@/lib/constants";
import { Slider } from "../ui/slider";

type Props = {
  name?: string;
  value?: number;
  description?: string;
};

const SkillItem = ({ name, value, description }: Props) => {
  return (
    <div className="container grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {skillsData.map((skill, index) => (
        <div key={index} className="p-4">
          {/* Skills Header */}
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <span className="font-semibold text-zinc-800">
              {skill.value}
              <span className="text-primary ml-1">%</span>
            </span>
          </div>

          {/* Progress Bar from Shadcn */}
          {/* <Progress
            value={skill.value}
            className="mb-3 **:data-[slot=progress-indicator]:transition-all **:data-[slot=progress-indicator]:duration-500 **:data-[slot=progress-indicator]:ease-out"
          /> */}

          <div className="relative mb-3">
            <Slider
              value={[skill.value]}
              max={100}
              step={1}
              disabled
              dir="rtl"
              className="pointer-events-none"
            />
          </div>

          {/* Description */}
          <p className="skills-description text-sm text-zinc-700">
            {skill.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SkillItem;
