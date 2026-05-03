import { Intro } from "@/components/sections/intro";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { RecentBlogs } from "@/components/sections/recent-blogs";
import { GithubContributions, GitmapSkeleton } from "@/components/github-contributions";
import { Suspense } from "react";
import { BookACall } from "@/components/sections/book-a-call";

export default function Home() {
  return (
    <>
      <Intro />
      <About />
      <BookACall />
      <Suspense fallback={<GitmapSkeleton className="mt-7 mb-8" />}>
        <GithubContributions />
      </Suspense>
      <Experience />
      <Projects />
      <RecentBlogs />
    </>
  );
}
