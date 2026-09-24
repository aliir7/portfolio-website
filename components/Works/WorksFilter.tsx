"use client";

import { useWorksFilterStore } from "@/lib/store/useWorksFilterStore";
import { FilterCategory } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

import { useDictionary, useLocale } from "@/lib/i18n";

const WorksFilter = () => {
  const { category, setCategory } = useWorksFilterStore();
  const dictionary = useDictionary();
  const locale = useLocale();
  const filters: { label: string; value: FilterCategory }[] = [
    { label: dictionary.common.all, value: "all" },
    { label: dictionary.common.frontend, value: "frontend" },
    { label: dictionary.common.fullstack, value: "fullstack" },
    { label: dictionary.common.dashboard, value: "dashboard" },
  ];

  return (
    <Tabs
      value={category}
      dir={locale === "fa" ? "rtl" : "ltr"}
      onValueChange={(value) => setCategory(value as FilterCategory)}
      className="mt-8 flex w-full items-center justify-center"
    >
      <TabsList className="flex h-auto md:flex-wrap flex-nowrap items-center justify-center gap-0.5 bg-transparent md:gap-2">
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground rounded-full md:px-6 px-3 py-4 transition-all"
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default WorksFilter;
