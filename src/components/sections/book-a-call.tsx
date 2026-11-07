"use client";

import { CalendarDays } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function BookACall() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="https://cal.com/sachi-goyal/15min"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a meeting (opens in a new tab)"
          className="flex size-7.5 items-center justify-center rounded-md hover:bg-secondary hover:text-primary focus-visible:bg-secondary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors duration-150"
        >
          <span className="relative shrink-0">
            <CalendarDays className="size-4" strokeWidth={1} />
            <span aria-hidden className="absolute -top-0.5 -right-0.5 flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-cyan-600 opacity-75 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan-600" />
            </span>
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={6}>Book a meeting</TooltipContent>
    </Tooltip>
  );
}
