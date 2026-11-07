import { Intro } from "@/components/sections/intro";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { RecentBlogs } from "@/components/sections/recent-blogs";
import { GithubContributions } from "@/components/github-contributions";
import { siteConfig } from "@/config/site.config";

// Cache the complete server-rendered homepage for one day.
export const revalidate = 86400;

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
      <GithubContributions />
      <Experience />
      <Projects />
      <RecentBlogs />
    </>
  );
}
