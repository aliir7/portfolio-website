"use client";

import { useWorksFilterStore } from "@/lib/store/useWorksFilterStore";
import { FilterCategory } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const filters: { label: string; value: FilterCategory }[] = [
  { label: "همه پروژه‌ها", value: "all" },
  { label: "فرانت‌اند", value: "frontend" },
  { label: "فول‌استک", value: "fullstack" },
  { label: "داشبورد", value: "dashboard" },
];

const WorksFilter = () => {
  const { category, setCategory } = useWorksFilterStore();

  return (
    <Tabs
      value={category}
      dir="rtl"
      onValueChange={(value) => setCategory(value as FilterCategory)}
      className="mt-8 flex w-full items-center justify-center"
    >
      <TabsList className="flex h-auto flex-wrap items-center justify-center gap-2 bg-transparent">
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-4 transition-all"
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default WorksFilter;
