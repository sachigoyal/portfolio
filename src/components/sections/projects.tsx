"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "#site/content";
import { FeaturedProjectCard } from "./featured-project-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

type SortType = "latest" | "featured";
const LIMIT = 6;

export function Projects() {
  const [sort, setSort] = useState<SortType>("featured");

  const sortedProjects = useMemo(() => {
    const featuredProjects = projects.filter((p) => p.featured > 0).sort((a, b) => a.featured - b.featured).slice(0, LIMIT);

    if (sort === "latest") {
      return [...projects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, LIMIT)
    }
    return featuredProjects;
  }, [sort]);

  return (
    <div className="text-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">{sort === "featured" ? "Featured projects" : "Latest projects"}</p>
        <div className="flex items-center gap-0.5 p-0.5 bg-muted rounded-md relative">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSort("featured")}
            className={cn(
              "h-6 px-2 py-0.5 text-xs rounded font-normal relative z-10 hover:bg-transparent",
              sort === "featured"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {sort === "featured" && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 bg-background shadow-sm rounded-[5.5px]"
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              />
            )}
            <span className="relative z-10">Featured</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSort("latest")}
            className={cn(
              "h-6 px-2 py-0.5 text-xs rounded font-normal relative z-10 hover:bg-transparent",
              sort === "latest"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {sort === "latest" && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 bg-background shadow-sm rounded-[5.5px]"
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              />
            )}
            <span className="relative z-10">Latest</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2 -mx-2">
        <MotionConfig transition={{ duration: 0.3, type: "spring", bounce: 0 }}>
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project) => (
              <FeaturedProjectCard key={project.slugAsParams} {...project} />
            ))}
          </AnimatePresence>
        </MotionConfig>
      </div>
      <div className="flex justify-end mt-3 -mr-2">
        <Link
          href="/projects"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition-colors"
        >
          See more
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
