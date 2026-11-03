export type SiteConfig = {
  name: string;
  domain: string;
  title: string;
  description: string;
  origin: string;
  jobTitle: string;
  company: {
    name: string;
    url: string;
  };
  keywords: string[];
  socials: {
    github: string;
    x: string;
    xHandle: string;
    linkedin: string;
    buymeacoffee: string;
  };
};
export type GithubContributionsResponse = {
  total: Record<string, number>
  contributions: {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
  }[]
}

export type GitmapData = {
  contributions: {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
  }[]
  availableYears: number[]
}

export type GitmapViewState = {
  from: Date
  to: Date
  selectedYear: number | null
}
