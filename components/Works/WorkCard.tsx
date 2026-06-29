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

type WorkCardProps = {
  project: Project;
};

const WorkCard = ({ project }: WorkCardProps) => {
  return (
    <Card className="group/card gap-0 overflow-hidden pt-0">
      {/* Image-first مطابق داکیومنت shadcn 2026 */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/assets/img/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary" className="capitalize">
            {project.category}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-3">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            <RiExternalLinkLine className="size-4" />
            Live Demo
          </Link>
        )}
        {project.repoUrl && (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            <RiGithubLine className="size-4" />
            Repository
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkCard;
