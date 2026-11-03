"use client";

import { getCalApi } from "@calcom/embed-react";
import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function BookACall() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="Book a call"
          data-cal-namespace="15min"
          data-cal-link="sachi-goyal/15min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          className="relative flex items-center justify-center size-7.5 hover:text-primary transition-colors p-1.5 hover:bg-secondary rounded-md duration-150 cursor-pointer"
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1} />
          <span aria-hidden className="absolute top-1 right-1 flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-cyan-600 opacity-75 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-cyan-600" />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={4}>Book a call</TooltipContent>
    </Tooltip>
  );
}
