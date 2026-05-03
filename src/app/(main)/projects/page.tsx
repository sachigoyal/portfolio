import { projects } from "#site/content";
import { ProjectsList } from "@/components/sections/projects-list";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Projects - ${siteConfig.name}`,
  description: "Projects I've built.",
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: "Projects I've built.",
    url: `${siteConfig.origin}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <div className="absolute h-full w-10 -left-12 top-8">
        <Link href="/" className="sticky top-4">
          <ArrowLeft className="size-4" />
        </Link>
      </div>

      <ProjectsList projects={projects} />
    </div>
  );
}
