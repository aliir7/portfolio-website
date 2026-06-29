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

type WorkCardProps = {
  project: Project;
};

const WorkCard = ({ project }: WorkCardProps) => {
  return (
    <Card className="group/card gap-0 overflow-hidden pt-0">
      {/* Image-first مطابق داکیومنت shadcn 2026 */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/public/assets/img/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>

      <CardHeader className="mt-6 space-y-1.5">
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        <CardAction className="">
          <Badge
            variant="outline"
            className="bg-primary px-3 py-2 text-zinc-100 capitalize"
          >
            {project.category}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-2 pb-6">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="py-1 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-3 border-none">
        {project.repoUrl && (
          <Button variant="ctaLink" asChild>
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <RiGithubLine className="size-4" />
              ریپازیتوری
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="ctaLink">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <RiExternalLinkLine className="size-4" />
              مشاهده پروژه
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkCard;
