"use client";

import { useWorksFilterStore } from "@/lib/store/useWorksFilterStore";
import { Project } from "@/types";
import WorkCard from "./WorkCard";

type Props = {
  projects: Project[];
};

const WorksGrid = ({ projects }: Props) => {
  const { category } = useWorksFilterStore();

  const filtered =
    category === "all"
      ? projects
      : projects.filter((p) => p.category === category);

  if (filtered.length === 0) {
    return (
      <p className="text-muted-foreground mt-16 text-center">
        موردی در این دسته‌بندی یافت نشد.
      </p>
    );
  }
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((project) => (
        <WorkCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default WorksGrid;
