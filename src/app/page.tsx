import { PageHeader } from "@/components/sections/page-header";
import { Intro } from "@/components/sections/intro";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { RecentBlogs } from "@/components/sections/recent-blogs";
import { GithubContributions, GitmapSkeleton } from "@/components/github-contributions";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-12 md:pt-24 pb-10 px-3 md:px-0">
      <div className="max-w-2xl w-full flex flex-col">
        <PageHeader />
        <Intro />
        <About />
        <Suspense fallback={<GitmapSkeleton className="mt-7 mb-8" />}>
          <GithubContributions />
        </Suspense>
        <Projects />
        <RecentBlogs />
      </div>
    </main>
  );
}
