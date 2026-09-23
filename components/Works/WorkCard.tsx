"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types";
import { RiExternalLinkLine, RiGithubLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDictionary, useLocale } from "@/lib/i18n";

type WorkCardProps = {
  project: Project;
};

const WorkCard = ({ project }: WorkCardProps) => {
  const dictionary = useDictionary();
  const locale = useLocale();
  return (
    <Card className="group/card border-border/60 relative overflow-hidden pt-0 [--card-spacing:--spacing(3)] transition-all duration-300 hover:-translate-y-1 hover:border-card-foreground hover:shadow-4px md:[--card-spacing:--spacing(4)]">
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/assets/img/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>

      {/* MAIN CONTENT WRAPPER – keep content above shape */}
      <div className="relative z-10">
        <CardHeader className="mt-4 space-y-1.5 md:mt-6">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>

          <CardAction>
            <Badge
              variant="outline"
              className="bg-primary px-3 py-2 text-zinc-100 capitalize"
            >
              {project.category}
            </Badge>
          </CardAction>
        </CardHeader>

        <CardContent className="pb-4 md:pb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="py-1 text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* FOOTER – anchor for shape */}
        <CardFooter className="relative z-10 gap-2 border-none bg-card p-3 md:gap-3 md:p-4">
          {project.repoUrl && (
            <Button variant="ctaLink" asChild>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
              >
                <RiGithubLine className="size-4" />
                {dictionary.common.repository}
              </Link>
            </Button>
          )}

          {project.liveUrl && (
            <Button variant="ctaLink" asChild>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
              >
                <RiExternalLinkLine className="size-4" />
                {dictionary.common.viewProject}
              </Link>
            </Button>
          )}

          {/* SHAPE 3 — stays in footer corner */}
          <Image
            src="/assets/img/shape-3.png"
            alt="Decoration Shape 3"
            width={120}
            height={120}
            className={
              locale === "fa"
                ? "pointer-events-none absolute -bottom-8 -left-4 z-0 opacity-80 dark:invert md:-bottom-12 md:left-2"
                : "pointer-events-none absolute -right-4 -bottom-8 z-0 opacity-80 dark:invert md:right-2 md:-bottom-12"
            }
          />
        </CardFooter>
      </div>
    </Card>
  );
};
export default WorkCard;
