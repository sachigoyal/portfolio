"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function Experience() {
  return (
    <div className="text-sm">
      <p className="font-semibold text-lg">Experience</p>
      <AccordionPrimitive.Root
        type="single"
        collapsible
        className="flex flex-col mt-2 -mx-2"
      >
        {experiences.map((exp) => (
          <AccordionPrimitive.Item
            key={`${exp.company}-${exp.role}`}
            value={`${exp.company}-${exp.role}`}
            className="group/item rounded-lg transition-colors hover:bg-muted/50 data-[state=open]:bg-muted/50"
          >
            <AccordionPrimitive.Header className="relative">
              <AccordionPrimitive.Trigger
                aria-label={`${exp.role} at ${exp.company}, ${exp.duration}`}
                className="absolute inset-0 rounded-lg outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/50"
              />
              <div className="pointer-events-none flex items-center justify-between gap-2 p-2">
                <div className="flex items-center gap-3 min-w-0 w-full">
                  <img
                    src={exp.logo}
                    alt=""
                    className="size-10 rounded-md shrink-0 bg-muted object-cover"
                  />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="font-medium text-sm truncate">
                      {exp.role}
                    </span>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto relative z-10 inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-2 transition-colors"
                    >
                      {exp.company}
                      <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                  {exp.duration}
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]/item:rotate-180" />
                </span>
              </div>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="pb-3 pr-2 pl-[60px]">
                <ul className="list-disc space-y-1.5 pl-4 text-muted-foreground marker:text-muted-foreground/60">
                  {exp.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  );
}

const experiences = [
  {
    role: "Software Engineer",
    company: "Jamie",
    url: "https://www.meetjamie.ai/",
    logo: "https://www.google.com/s2/favicons?domain=meetjamie.ai&sz=128",
    duration: "Nov 2026 - Present",
    points: [
      "Working on the custom CMS.",
      "Building the marketing site and brand kit.",
      "Keeping new UI consistent with the design system.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Origin",
    url: "https://orgn.com/",
    logo: "https://www.google.com/s2/favicons?domain=orgn.com&sz=128",
    duration: "Mar 2026 - Oct 2026",
    points: [
      "Improved the UI and UX of existing products.",
      "Worked on web apps and a SolidJS desktop app.",
    ],
  },
];
