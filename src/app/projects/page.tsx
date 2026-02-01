import { projects } from "#site/content";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectsList } from "@/components/sections/projects-list";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name}`,
  description: "Projects I've built.",
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: "Projects I've built.",
    url: `${siteConfig.origin}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col items-center pt-12 md:pt-24 lg:pt-32 pb-10 px-3 md:px-0">
      <div className="relative max-w-2xl w-full flex flex-col">
        <PageHeader />

        <div className="absolute h-full w-10 -left-12 top-14">
          <Link href="/" className="sticky top-4">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <ProjectsList projects={projects} />
      </div>
    </main>
  );
}
