import { Intro } from "@/components/sections/intro";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { RecentBlogs } from "@/components/sections/recent-blogs";
import { GithubContributions, GitmapSkeleton } from "@/components/github-contributions";
import { Suspense } from "react";
import { siteConfig } from "@/config/site.config";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.origin,
  jobTitle: siteConfig.jobTitle,
  worksFor: {
    "@type": "Organization",
    name: siteConfig.company.name,
    url: siteConfig.company.url,
  },
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.x,
    siteConfig.socials.linkedin,
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Intro />
      <About />
      <Suspense fallback={<GitmapSkeleton className="mt-7 mb-12" />}>
        <GithubContributions />
      </Suspense>
      <Experience />
      <Projects />
      <RecentBlogs />
    </>
  );
}
